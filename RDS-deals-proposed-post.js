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
                                         proposedDeal_title
    var proposedDeal_title = "'" + event.proposedDeal_title + "'";
    var proposedDeal_description = "'" + event.proposedDeal_description + "'";
    var proposedDeal_url = "'" + event.proposedDeal_url  + "'";
    var proposedDeal_picture = "'" + event.proposedDeal_picture  + "'";
    var partner_id = event.partner_id;
    var proposedDeal_startDate = "'" + event.proposedDeal_startDate  + "'";
    var proposedDeal_endDate = "'" + event.proposedDeal_endDate + "'";

    var attributes = "proposedDeal_title, proposedDeal_description, proposedDeal_url, proposedDeal_picture, partner_id, proposedDeal_startDate, proposedDeal_endDate";
    var attributeValues = proposedDeal_title + ", " + proposedDeal_description + ", " + proposedDeal_url + ", " + proposedDeal_picture + ", " + partner_id + ", " + proposedDeal_startDate + ", " + proposedDeal_endDate;
    var sql = "insert into mysqlSengaaAws.sengaa_proposedDeal(" + attributes + ") values (" + attributeValues + ")";
    console.log(sql);
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });
  });
}