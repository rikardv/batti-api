const axios = require('axios');
var mysql = require('mysql');

const sites = [
  {
    url: 'https://rabattkod.gp.se/nly-man',
    id: 1,
  },
  {
    url: 'https://rabattkod.gp.se/zalando',
    id: 2,
  },
  {
    url: 'https://rabattkod.gp.se/boozt',
    id: 3,
  },
  {
    url: 'https://rabattkod.gp.se/stayhard',
    id: 4,
  },
];

var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '8889',
  database: 'batti',
});

async function sqlQuery(sql, args) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        return reject(err);
      }
      connection.query(sql, args, function (err, result) {
        connection.release();
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  });
}

let selectedSite = sites[1].id;

//here we make our timeout synchronous using Promises
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getVouchersInfos() {
  const existing = await sqlQuery(
    'SELECT DISTINCT voucher_id FROM voucher_queue WHERE retailer_id = ?',
    selectedSite
  );
  const values = existing.map((val) => val.voucher_id);

  for (var i = 0; i < values.length; i++) {
    console.log(`Fetching json with id ${values[i]}`);
    await axios
      .get(
        `https://rabattkod.gp.se/api/voucher/country/se/client/6598f8de42724d6ab2a0486fc3637422/id/${values[i]}`
      )
      .then((res) => {
        postVoucherInfos(res.data, selectedSite, values[i]);
      });
    console.log('Waiting 10s for next request');
    await sleep(10000);
  }

  console.log('Completed!');
}

async function postVoucherInfos(json, retailer_id, voucher_id) {
  const existing_info_vouchers = await sqlQuery(
    'SELECT voucher_id FROM voucher_info'
  );
  const exisiting_info_vouchers_ids = existing_info_vouchers.map(
    (val) => val.voucher_id
  );

  if (!exisiting_info_vouchers_ids.includes(voucher_id)) {
    const query = {
      text: 'INSERT INTO `voucher_info` (`description`, `code`, `expires`, `retailer_id`, `voucher_id`) VALUES (?, ?, ?, ?, ?)',
      values: [json.title, json.code, json.end_time, retailer_id, voucher_id],
    };
    // Post to voucher info table
    await sqlQuery(query.text, query.values).catch((err) => console.log(err));
  }
  // Delete from queue
  await sqlQuery('DELETE FROM voucher_queue WHERE voucher_id = ?', [
    voucher_id,
  ]);
}

getVouchersInfos();
