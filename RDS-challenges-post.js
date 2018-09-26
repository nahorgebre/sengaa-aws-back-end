// sengaaBackEnd/RDS-challenges-post.fn
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
    var sql = "insert into mysqlSengaaAws.sengaa_challenge(challenge_title, challenge_description, challenge_firstAward, challenge_secondAward, challenge_otherAward, partner_id, challenge_startDate, challenge_endDate, challenge_single, challenge_team)" +
      "values (" + "'" + event.challenge_title + "', " + "'" + event.challenge_description + "', " + "'" + event.challenge_firstAward + "', " + "'" + event.challenge_secondAward + "', " + "'" + event.challenge_otherAward + "', " + event.partner_id + ", " + event.challenge_startDate + ", " + event.challenge_endDate + ", " + event.challenge_single + ", " + event.challenge_team + ")";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });
  });
}
