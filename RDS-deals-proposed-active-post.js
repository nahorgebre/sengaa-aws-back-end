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

    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connected to database!');
        
        var sql = "select * from mysqlSengaaAws.sengaa_proposedDeal where proposedDeal_id = '" + event.proposedDeal_id + "'";
        console.log(sql);
        connection.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Query successfully executed!");
            console.log(result);
            var deal_title = "'" + result[0].proposedDeal_title + "'";
            var deal_description = "'" + result[0].proposedDeal_description + "'";
            var deal_url = "'" + result[0].proposedDeal_url + "'";
            var deal_picture = "'" + result[0].proposedDeal_picture + "'";
            var partner_id = result[0].partner_id;
            var deal_startDate = "'" + formatDate(result[0].proposedDeal_startDate) + "'";
            var deal_endDate = "'" + formatDate(result[0].proposedDeal_endDate) + "'";
            console.log(deal_startDate);
            console.log(deal_endDate);

            var attributes = "deal_title, deal_description, deal_url, deal_picture, partner_id, deal_startDate, deal_endDate";
            var attributeValues = deal_title + ", " + deal_description + ", " + deal_url + ", " + deal_picture + ", " + partner_id + ", " + deal_startDate + ", " + deal_endDate;
            var sql2 = "insert into mysqlSengaaAws.sengaa_deal(" + attributes + ") values (" + attributeValues + ")";
            console.log(sql2);
            connection.query(sql2, function(err, result) {
                if (err) throw err;
                console.log("1 record inserted!");
                console.log(result);

                var sql3 = "delete from mysqlSengaaAws.sengaa_proposedDeal where proposedDeal_id = '" + event.proposedDeal_id + "'";
                console.log(sql3);
                connection.query(sql3, function(err, result) {
                    if (err) throw err;
                    console.log("1 record deleted!");
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