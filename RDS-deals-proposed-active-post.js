// sengaaBackEnd/RDS-deals-proposed-active-post.fn
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

        // Query table sengaa_proposedChallenge
        var sql = "select * from mysqlSengaaAws.sengaa_proposedDeal where proposedDeal_id = '" + event.proposedDeal_id + "'";

        var deal_title;
        var deal_description; 
        var deal_url;
        var deal_picture;
        var partner_id;
        var deal_startDate;
        var deal_endDate;

        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Query successfully executed!");
            console.log(result);
            deal_title = "'" + result[0].deal_title + "'";          
            deal_description = "'" + result[0].deal_description + "'"; 
            deal_url = "'" + result[0].deal_url + "'";
            deal_picture = "'" + result[0].deal_picture + "'";
            partner_id = result[0].partner_id;
            deal_startDate = "'" + result[0].deal_startDate + "'";
            deal_endDate = "'" + result[0].deal_endDate + "'";
            context.succeed("done");
        });

        var attributes = "deal_title, deal_description, deal_url, deal_picture, partner_id, deal_startDate, deal_endDate";
        var attributeValues = deal_title + ", " +  deal_description + ", " + deal_url + ", " + deal_picture + ", " + partner_id + ", " + deal_startDate + ", " + deal_endDate;

        sql = "insert into mysqlSengaaAws.sengaa_deal(" + attributes + ") values (" + attributeValues + ")";

        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted!");
            console.log(result);
            context.succeed("done");
            callback(null, result);
        });

        sql = "delete from sengaa_proposedChallenge where proposedChallenge_id = " + event.proposedDeal_id;

        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record deleted!");
            console.log(result);
            context.succeed("done");
            callback(null, result);
          });

    });
}