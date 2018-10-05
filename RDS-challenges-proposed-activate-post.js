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

    var sql = "select * from mysqlSengaaAws.sengaa_proposedChallenge where proposedChallenge_id = " + event.proposedChallenge_id;

    var challenge_title;
    var challenge_description;
    var challenge_firstAward;
    var challenge_secondAward;
    var challenge_otherAward;
    var partner_id; 
    var challenge_startDate;
    var challenge_endDate;
    var challenge_single;
    var challenge_team;

    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Query successfully executed!");
      console.log(result);
      challenge_title = "'" + result[0].challenge_title + "'";
      challenge_description = "'" + result[0].challenge_description + "'";
      challenge_firstAward = "'" + result[0].challenge_firstAward + "'";
      challenge_secondAward = "'" + result[0].challenge_secondAward + "'";
      challenge_otherAward = "'" + result[0].challenge_otherAward + "'";
      partner_id = result[0].partner_id; 
      challenge_startDate = "'" + result[0].challenge_startDate + "'";
      challenge_endDate = "'" + result[0].challenge_endDate + "'";
      challenge_single = result[0].challenge_single;
      challenge_team = result[0].challenge_team;
      console.log(challenge_title);
      context.succeed("done");
    });

    var attributes = "challenge_title, challenge_description, challenge_firstAward, challenge_secondAward, challenge_otherAward, partner_id, challenge_startDate, challenge_endDate, challenge_single, challenge_team";
    var attributeValues = challenge_title + ", " + challenge_description + ", " + challenge_firstAward + ", " + challenge_secondAward + ", " + challenge_otherAward + ", " + partner_id + ", " + challenge_startDate + ", " + challenge_endDate + ", " + challenge_single + ", " + challenge_team;

    sql = "insert into mysqlSengaaAws.sengaa_challenge(" + attributes + ") values (" + attributeValues + ")";

    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted!");
      console.log(result);
      context.succeed("done");
    });

    sql = "delete from sengaa_proposedChallenge where proposedChallenge_id = " + event.proposedChallenge_id;

    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record deleted!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });

  });
}