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

    var deal_title = "'" + event.deal_title + "'";
    var deal_description = "'" + event.deal_description + "'";
    var deal_url = "'" + event.deal_url  + "'";
    var deal_picture = "'" + event.deal_picture  + "'";
    var partner_id = event.partner_id;
    var deal_startDate = "'" + event.deal_startDate  + "'";
    var deal_endDate = "'" + event.deal_endDate + "'";

    var attributes = "deal_title, deal_description, deal_url, deal_picture, partner_id, deal_startDate, deal_endDate";
    var attributeValues = deal_title + ", " + deal_description + ", " + deal_url + ", " + deal_picture + ", " + partner_id + ", " + deal_startDate + ", " + deal_endDate;

    var sql = "insert into mysqlSengaaAws.sengaa_deal(" + attributes + ") values (" + attributeValues + ")";

    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });
  });
}
