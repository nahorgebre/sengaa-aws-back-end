// sengaaBackEnd/RDS-challenges-all-get.fn
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
    var sql = "select sengaa_challenge.challenge_id, sengaa_challenge.challenge_title, sengaa_challenge.challenge_description, sengaa_challenge.challenge_startDate, sengaa_challenge.challenge_endDate, sengaa_challenge.challenge_firstAward, sengaa_challenge.challenge_secondAward, sengaa_challenge.challenge_otherAward, sengaa_challenge.challenge_single, sengaa_challenge.challenge_team, sengaa_partner.partner_id, sengaa_partner.partner_logo from mysqlSengaaAws.sengaa_challenge, mysqlSengaaAws.sengaa_partner where sengaa_challenge.partner_id = sengaa_partner.partner_id";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Query successfully executed!");
      console.log(result);
      context.succeed(result);
      callback(null, result);
    });
  });
}

