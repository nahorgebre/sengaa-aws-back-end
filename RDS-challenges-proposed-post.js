// sengaaBackEnd/RDS-challenges-proposed-post.fn
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
    var sql = "insert into mysqlSengaaAws.sengaa_proposedChallenge(proposedChallenge_title, proposedChallenge_description, proposedChallenge_firstAward, proposedChallenge_secondAward, proposedChallenge_otherAward, partner_id, proposedChallenge_startDate, proposedChallenge_endDate, proposedChallenge_single, proposedChallenge_team)" +
    "values (" + "'" + event.proposedChallenge_title + "', " + "'" + event.proposedChallenge_description + "', " + "'" + event.proposedChallenge_firstAward + "', " + "'" + event.proposedChallenge_secondAward + "', " + "'" + event.proposedChallenge_otherAward + "', " + event.partner_id + ", " + event.proposedChallenge_startDate + ", " + event.proposedChallenge_endDate + ", " + event.proposedChallenge_single + ", " + event.proposedChallenge_team + ")";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });
  });
}
