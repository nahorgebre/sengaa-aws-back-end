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

    var proposedChallenge_title = "'" + event.proposedChallenge_title + "'";
    var proposedChallenge_description = "'" + event.proposedChallenge_description + "'";
    var proposedChallenge_firstAward = "'" + event.proposedChallenge_firstAward + "'";
    var proposedChallenge_secondAward = "'" + event.proposedChallenge_secondAward + "'";
    var proposedChallenge_otherAward = "'" + event.proposedChallenge_otherAward + "'";

    var partner_id = event.partner_id;

    var proposedChallenge_startDate = "'" + event.proposedChallenge_startDate + "'";
    var proposedChallenge_endDate = "'" + event.proposedChallenge_endDate  + "'";

    var proposedChallenge_single = event.proposedChallenge_single;
    var proposedChallenge_team = event.proposedChallenge_team;

    var attributes = "proposedChallenge_title, proposedChallenge_description, proposedChallenge_firstAward, proposedChallenge_secondAward, proposedChallenge_otherAward, partner_id, proposedChallenge_startDate, proposedChallenge_endDate, proposedChallenge_single, proposedChallenge_team";
    var attributeValues = proposedChallenge_title + ", " + proposedChallenge_description + ", " + proposedChallenge_firstAward + ", " + proposedChallenge_secondAward + ", " + proposedChallenge_otherAward + ", " + partner_id + ", " + proposedChallenge_startDate + ", " + proposedChallenge_endDate + ", " + proposedChallenge_single + ", " + proposedChallenge_team;

    var sql = "insert into mysqlSengaaAws.sengaa_proposedChallenge(" + attributes + ") values (" + attributeValues + ")";
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