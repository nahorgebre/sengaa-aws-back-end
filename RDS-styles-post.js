// sengaaBackEnd/RDS-styles-post.fn
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
    var sql = "insert into mysqlSengaaAws.sengaa_style(style_title, style_picture, user_id, challenge_id)" +
    "values (" + "'" + event.style_title + "', " + "'" + event.style_picture + "', " + event.user_id + ", " + event.challenge_id + ")";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });
  });
}
