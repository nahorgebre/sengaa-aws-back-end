// sengaaBackEnd/RDS-deals-post.fn
const AWS = require('aws-sdk');
var mysql = require('mysql');

exports.fn = (event, context, callback) => {
  var connection = mysql.createConnection({
    host: 'mysql-sengaa-aws.cugdacsemmim.us-east-1.rds.amazonaws.com',
    user: 'sengaa18',
    password: 'aagnes18',
    database: 'mysqlSengaaAws'
  });

  connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to database!');
    var sql = "insert into mysqlSengaaAws.sengaa_deal(deal_title, deal_description, deal_url, deal_picture, partner_id, deal_startDate, deal_endDate)" +
      "values (" + "'" + event.deal_title + "', " + "'" + event.deal_description + "', " + "'" + event.deal_url + "', " + "'" + event.deal_picture + "', " + event.partner_id + ", " + event.deal_startDate + ", " + event.deal_endDate + ")";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });
  });
}
