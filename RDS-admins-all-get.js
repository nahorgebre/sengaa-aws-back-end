// sengaaBackEnd/RDS-admins-all-get.fn
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
    var sql = "select * from mysqlSengaaAws.sengaa_admin";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Query successfully executed!");
      console.log(result);
      context.succeed(result);
      callback(null, result);
    });
  });
}
