const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const express = require('express')
const app = express()
const port = 3000
var mysql = require('mysql');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'rikard',
    password: 'arsenalfc',
    port: '3306',
    database: 'batti'
})

app.get('/', async (req, res) => {
    const vouchers = await sqlQuery('SELECT * FROM vouchers');
    res.status(200).send({
        vouchers
    }) 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// fetchSites('https://www.boozt.com');
// fetchSites('https://www.zalando.se/kvinna-home/');
// fetchSites('https://stayhard.com');

async function fetchSites (url) {
    
    await axios.get(url).then(async res => {
        let data = scrapeVoucher(res.data);
    
        const query = {
            text: 'UPDATE vouchers SET code = ?, amount = ? WHERE company = ?',
            values: [data.code, data.amount, 'zalando']
        };
        
        console.log(data);
        // await sqlQuery(query.text, query.values);
    }).catch(err => console.log('failed'));
}

function scrapeVoucher(html_data) {
    console.log('halå?')
    const $ = cheerio.load(html_data)
    let tags = ['div','h3','p > strong','h2','h1']
    let res = {
        code: '',
        amount: '',
    };
    for (var i = 0; i < tags.length; i++){
        $(tags[i]).each((idx, ref) => {
            const elem = $(ref);
            let str = elem.text().trim()
            str = str.replace(/['"]+/g, '');
            let match = str.match(/[a-zA-Z]+[0-9]+/);
            if (match) {
                var percentage = str.match(/(\d+)/);
                res.code = match[0]
                res.amount = percentage[0] + '%'
                return;
            }
        });
    }

    return res;
}

async function sqlQuery(sql, args) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          return reject(err);
        }
        connection.query(sql, args, function(err, result) {
          connection.release();
          if (err) {
            return reject(err);
          }
          return resolve(result);
        });
      });
    });
  }




