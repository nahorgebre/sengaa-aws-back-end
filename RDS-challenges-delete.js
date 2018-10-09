// sengaaBackEnd/RDS-challenges-delete.fn
const AWS = require('aws-sdk');
var mysql = require('mysql');

exports.fn = (event, context, callback) => {
  var connection = mysql.createConnection({
    host     : 'mysql-sengaa-aws.cugdacsemmim.us-east-1.rds.amazonaws.com',
    user     : 'sengaa18',
    password : 'aagnes18',
    database : 'mysqlSengaaAws'
  });

  // insert in table sengaa_inactiveChallenge is missing!!!
  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to database!');
    var sql = "delete from mysqlSengaaAws.sengaa_challenge where challenge_id = " + event.challenge_id;
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record deleted!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });
  });
}

