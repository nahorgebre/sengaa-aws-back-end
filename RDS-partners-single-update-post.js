// sengaaBackEnd/RDS-partners-single-update-post.fn
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

    var partner_name = "'" + event.partner_name + "'";
    var partner_description = "'" + event.partner_description + "'";
    var partner_url = "'" + event.partner_url + "'";
    var partner_logo = "'" + event.partner_logo + "'";
    var partner_accountManager = "'" + event.partner_accountManager + "'";
    var partner_accountManagerEmail = "'" + event.partner_accountManagerEmail + "'";
    var partner_billingAdress_street = "'" + event.partner_billingAdress_street + "'";
    var partner_billingAdress_postalCode = "'" + event.partner_billingAdress_postalCode + "'";
    var partner_billingAdress_location = "'" + event.partner_billingAdress_location + "'";
    var partner_billingAdress_country = "'" + event.partner_billingAdress_country + "'";
    var partner_domicile_street = "'" + event.partner_domicile_street + "'";
    var partner_domicile_postalCode = "'" + event.partner_domicile_postalCode + "'";
    var partner_domicile_location = "'" + event.partner_domicile_location + "'";
    var partner_domicile_country = "'" + event.partner_domicile_country + "'";

    var set = "partner_name=" + partner_name + ", partner_description=" + partner_description + ", partner_url=" + partner_url + ", partner_logo=" + partner_logo + ", partner_accountManager=" + partner_accountManager + ", partner_accountManagerEmail=" + partner_accountManagerEmail + ", partner_billingAdress_street=" + partner_billingAdress_street + ", partner_billingAdress_postalCode=" + partner_billingAdress_postalCode + ", partner_billingAdress_location=" + partner_billingAdress_location + ", partner_billingAdress_country=" + partner_billingAdress_country + ", partner_domicile_street=" + partner_domicile_street + ", partner_domicile_postalCode=" + partner_domicile_postalCode + ", partner_domicile_location=" + partner_domicile_location + ", partner_domicile_country=" + partner_domicile_country;
    var sql = "update mysqlSengaaAws.sengaa_partner set " + set + " where partner_id = " + event.partner_id;
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
