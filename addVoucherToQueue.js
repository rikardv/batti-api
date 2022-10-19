const axios = require('axios');
const cheerio = require('cheerio');
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

// Make request look like from browser


const config = {
  headers: {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'sv-SE,sv;q=0.9',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.1 Safari/605.1.15',
  },
};

/**
 * Zalando - 1
 * Boozt - 2
 *
 */

fetchSites();

async function fetchSites() {

	for(var i = 0; i < sites.length; i++) {
		console.log(`Fetching ids from ${sites[i].url}`);
		await axios
		.get(sites[i].url, config)
		.then((res) => postVouchersIds(res.data, sites[i].id));

		console.log('Waiting 10s for next request...');
		// add a slight delay
		await sleep(10000);

	}

	console.log('Success!!')
}

//here we make our timeout synchronous using Promises
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

async function postVouchersIds(html, retailer_id) {
  /**
   * Get all the voucher ids from gp
   */
  const $ = cheerio.load(html);
  const el = $('div[data-testid="active-vouchers-main-1"]');
  let arr = [];
  $('div', el).each(function () {
    if ($(this).attr('data-id')) {
      arr.push($(this).attr('data-id'));
    }
  });

  /**
   * Add ids to vouche_queue mysql table
   */

   const existing_queue_vouchers = await sqlQuery('SELECT DISTINCT voucher_id FROM voucher_queue');
   const existing_info_vouchers = await sqlQuery('SELECT voucher_id FROM voucher_info');
   const existing_queue_vouchers_ids = existing_queue_vouchers.map((val) => val.voucher_id);
   const exisiting_info_vouchers_ids = existing_info_vouchers.map((val) => val.voucher_id);

  for (var i = 0; i < arr.length; i++) {

	if (!existing_queue_vouchers_ids.includes(arr[i]) && !exisiting_info_vouchers_ids.includes(arr[i])) {
		const query = {
			text: 'INSERT INTO voucher_queue (voucher_id, retailer_id) VALUES (?, ?)',
			values: [arr[i], retailer_id],
		  };
	  
		  await sqlQuery(query.text, query.values)
			.then((res) => {
			  console.log(`Added ${arr[i]} to database`);
			})
			.catch((err) => console.log(err));
	}

  else {
    console.log('Entry already exists - skipping insert..');
  }
  }

  console.log('Completed!');
}
