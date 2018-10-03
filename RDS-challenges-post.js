// sengaaBackEnd/RDS-challenges-post.fn
const AWS = require('aws-sdk');
var mysql = require('mysql');
var moment = require('moment');

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

    var challenge_title = "'" + event.challenge_title + "'";
    var challenge_description = "'" + event.challenge_description + "'";
    var challenge_firstAward = "'" + event.challenge_firstAward + "'";
    var challenge_secondAward = "'" + event.challenge_secondAward + "'";
    var challenge_otherAward = "'" + event.challenge_otherAward + "'";

    var partner_id = event.partner_id;

    // Dealing with date
    // e.g. 2012-06-10T10:00:00+04:00
    var arrival_challenge_startDate = event.challenge_startDate;
    console.log(arrival_challenge_startDate);
    var challenge_startDate = new Date(arrival_challenge_startDate);
    console.log(challenge_startDate);
    var arrival_challenge_endDate = event.challenge_endDate;
    var challenge_endDate = new Date(arrival_challenge_endDate);

    var challenge_single = event.challenge_single;
    var challenge_team = event.challenge_team;
    
    // Using Moment.js
    var challenge_createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    var challenge_updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'); 

    var attributes = "challenge_title, challenge_description, challenge_firstAward, challenge_secondAward, challenge_otherAward, partner_id, challenge_startDate, challenge_endDate, challenge_single, challenge_team, challenge_createdAt, challenge_updatedAt";
    var attributeValues = challenge_title + ", " + challenge_description + ", " + challenge_firstAward + ", " + challenge_secondAward + ", " + challenge_otherAward + ", " + partner_id + ", " + challenge_startDate + ", " + challenge_endDate + ", " + challenge_single + ", " + challenge_team + ", " + challenge_createdAt + ", " + challenge_updatedAt;

    var sql = "insert into mysqlSengaaAws.sengaa_challenge(" + attributes + ") values (" + attributeValues + ")";

    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });
  });
}
