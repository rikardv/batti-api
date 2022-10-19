const axios = require('axios');
const cheerio = require('cheerio');
var mysql = require('mysql');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'rikard',
    password: 'arsenalfc',
    port: '3306',
    database: 'batti'
})

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

axios.get('https://rabattkod.gp.se/zalando', config).then((res) => postVouchersIds(res.data, 1));


async function postVouchersIds(html, company_id) {

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

for(var i = 0; i < arr.length; i++) {
	const query = {
		text: 'INSERT INTO voucher_queue (voucher_id, retailer_id) VALUES (?, ?)',
		values: [voucher_id, company_id],
	}
	
	await sqlQuery(query.text, query.values).then((res) => {
		console.log(`Added ${voucher_id} to database`)
	}).catch((err) => console.log(err));
}

console.log('Completed!');

}




