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

  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to database!');

    console.log("1- Executing query on table sengaa_proposedChallenge.");
    var sql1 = "select * from mysqlSengaaAws.sengaa_proposedChallenge where proposedChallenge_id = " + event.proposedChallenge_id;
    console.log(sql1);
    connection.query(sql1, function(err, result) {
      if (err) throw err;
      console.log("Query successfully executed!");
      console.log(result);
      var challenge_title = "'" + result[0].proposedChallenge_title + "'";
      var challenge_description = "'" + result[0].proposedChallenge_description + "'";
      var challenge_firstAward = "'" + result[0].proposedChallenge_firstAward + "'";
      var challenge_secondAward = "'" + result[0].proposedChallenge_secondAward + "'";
      var challenge_otherAward = "'" + result[0].proposedChallenge_otherAward + "'";
      var partner_id = result[0].partner_id;
      var challenge_single = result[0].proposedChallenge_single;
      var challenge_team = result[0].proposedChallenge_team;
      var challenge_startDate = "'" + formatDate(result[0].proposedChallenge_startDate) + "'";
      var challenge_endDate = "'" + formatDate(result[0].proposedChallenge_endDate) + "'";
      console.log(challenge_startDate);
      console.log(challenge_endDate);

      console.log("2- Inserting record in table sengaa_challenge.");
      var attributes = "challenge_title, challenge_description, challenge_firstAward, challenge_secondAward, challenge_otherAward, partner_id, challenge_startDate, challenge_endDate, challenge_single, challenge_team";
      var attributeValues = challenge_title + ", " + challenge_description + ", " + challenge_firstAward + ", " + challenge_secondAward + ", " + challenge_otherAward + ", " + partner_id + ", " + challenge_startDate + ", " + challenge_endDate + ", " + challenge_single + ", " + challenge_team;
      var sql3 = "insert into mysqlSengaaAws.sengaa_challenge(" + attributes + ") values (" + attributeValues + ")";
      console.log(sql3);
      connection.query(sql3, function(err, result) {
        if (err) throw err;
        console.log("1 record inserted into table sengaa_challenge!");
        console.log(result);

        console.log("3- Delete record from table sengaa_proposedChallenge.");
        var sql4 = "delete from sengaa_proposedChallenge where proposedChallenge_id = " + event.proposedChallenge_id;
        console.log(sql4);
        connection.query(sql4, function(err, result) {
          if (err) throw err;
          console.log("1 record deleted from table sengaa_proposedChallenge!");
          console.log(result);
          context.succeed("done");
          callback(null, result);
        });

      });

    });

  });
  
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}