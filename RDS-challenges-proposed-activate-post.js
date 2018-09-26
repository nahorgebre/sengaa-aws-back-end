// sengaaBackEnd/RDS-challenges-proposed-activate-post.fn
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

    // Query table sengaa_proposedChallenge
    var sql = "select * from mysqlSengaaAws.sengaa_proposedChallenge where proposedChallenge_id = '" + event.proposedChallenge_id + "'";
    var queryResult;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Query successfully executed!");
      console.log(result);
      queryResult = result;
      context.succeed("done");
    });

    // Insert record in table sengaa_challenge
    var sql = "insert into mysqlSengaaAws.sengaa_challenge(challenge_title, challenge_description, challenge_firstAward, challenge_secondAward, challenge_otherAward, partner_id, challenge_startDate, challenge_endDate, challenge_single, challenge_team)" +
      "values (" + "'" + queryResult[0].challenge_title + "', " + "'" + queryResult[0].challenge_description + "', " + "'" + queryResult[0].challenge_firstAward + "', " + "'" + queryResult[0].challenge_secondAward + "', " + "'" + queryResult[0].challenge_otherAward + "', " + queryResult[0].partner_id + ", " + queryResult[0].challenge_startDate + ", " + queryResult[0].challenge_endDate + ", " + queryResult[0].challenge_single + ", " + queryResult[0].challenge_team + ")";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });

  });
}