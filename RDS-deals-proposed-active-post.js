// sengaaBackEnd/RDS-deals-proposed-activate-post.fn
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
        var queryResult;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Query successfully executed!");
            console.log(result);
            queryResult = result;
            context.succeed("done");
        });

        // Insert record in table sengaa_deal
        var sql = "insert into mysqlSengaaAws.sengaa_deal(deal_title, deal_description, deal_url, deal_picture, partner_id, deal_startDate, deal_endDate)" +
            "values (" + "'" + queryResult[0].deal_title + "', " + "'" + queryResult[0].deal_description + "', " + "'" + queryResult[0].deal_url + "', " + "'" + queryResult[0].deal_picture + "', " + queryResult[0].partner_id + ", " + queryResult[0].deal_startDate + ", " + queryResult[0].deal_endDate + ")";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted!");
            console.log(result);
            context.succeed("done");
            callback(null, result);
        });

    });
}