// sengaaBackEnd/RDS-deals-proposed-post.fn
const AWS = require('aws-sdk');
var mysql = require('mysql');

exports.fn = (event, context, callback) => {
  var connection = mysql.createConnection({
    host     : 'mysql-sengaa-aws.cugdacsemmim.us-east-1.rds.amazonaws.com',
    user     : 'sengaa18',
    password : 'aagnes18',
    database : 'mysqlSengaaAws'
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to database!');
    var sql = "insert into mysqlSengaaAws.sengaa_proposedDeal(proposedDeal_title, proposedDeal_description, proposedDeal_url, proposedDeal_picture, partner_id, proposedDeal_startDate, proposedDeal_endDate)" +
    "values (" + "'" + event.proposedDeal_title + "', " + "'" + event.proposedDeal_description + "', " + "'" + event.proposedDeal_url + "', " + "'" + event.proposedDeal_picture + "', " + event.partner_id + ", " + event.proposedDeal_startDate + ", " + event.proposedDeal_endDate + ")";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });
  });
}
