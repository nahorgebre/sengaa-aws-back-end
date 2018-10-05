// sengaaBackEnd/RDS-wows-post.fn
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


    var sql = "update mysqlSengaaAws.sengaa_style set style_countWows = style_countWows + 1 where style_id = " + event.style_id;

    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record updated!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });
  });
}
