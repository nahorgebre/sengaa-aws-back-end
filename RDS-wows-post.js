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
    var sql = "insert into mysqlSengaaAws.sengaa_partner(partner_name, partner_description, partner_url, partner_logo, partner_accountManager, partner_billingAdress_street, partner_billingAdress_postalCode, partner_billingAdress_location, partner_billingAdress_country, partner_domicile_street, partner_domicile_postalCode, partner_domicile_location, partner_domicile_country)" +
    "values (" + "'" + event.partner_name + "', " + "'" + event.partner_description + "', " + "'" + event.partner_url + "', " + "'" + event.partner_logo + "', " + "'" + event.partner_accountManager + "', " + "'" + event.partner_billingAdress_street + "', " + "'" + event.partner_billingAdress_postalCode + "', " + "'" + event.partner_billingAdress_location + "', " + "'" + event.partner_billingAdress_country + "', " + "'" + event.partner_domicile_street + "', " + "'" + event.partner_domicile_postalCode + "', " + "'" + event.partner_domicile_location + "', " + "'" + event.partner_domicile_country + "'" + ")";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted!");
      console.log(result);
      context.succeed("done");
      callback(null, result);
    });
  });
}
