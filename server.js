var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var axios = require("axios");
var db = require("./models");

var PORT = 5555;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://locahost/chinanewsdb");

// SCRAPE ROUTE comes first
app.get("/scrape", function (req, res) {
    axios.get("https://www.scmp.com/frontpage/international").then(function(response) {
        var $ = cheerio.load(response.data);
        var results = [];

        $("h3.lvl_25-title").each(function(i, element) {
            var title = $(element).text();
            var link = $(element).children().attr("href");
    
            results.push({
                title: title,
                link: link
            });

            db.article.create(result).then(function(dbarticle) {
                console.log(dbarticle);
            }).catch(function(error) {
                return res.json(error);
            });
        });
        console.log(results);

        res.send("scraped");
    });
});

// request("https://www.scmp.com/frontpage/international", function(error, response, html) {
//     var $ = cheerio.load(html);
//     var results = [];

//     $("h3.lvl_25-title").each(function(i, element) {
//         var title = $(element).text();
//         var link = $(element).children().attr("href");

//         results.push({
//             title: title,
//             link: link
//         });
//     });
//     console.log(results);
// });




console.log("[WIP] web scraper [WIP]");

app.listen(PORT, function() {
    console.log("App running on PORT " + PORT + "!");
});


// JUST REQUESTS THAT PUT INTO CLI WITHOUT ROUTES INVOLVED 
// request("https://old.reddit.com/r/news/", function(error, response, html) {
//     var $ = cheerio.load(html);
//     var results = [];

//     $("p.title").each(function(i, element) {

//         var title = $(element).text();
//         var link = $(element).children().attr("href");

//         results.push({
//             title: title,
//             link: link
//         });
//     });
//     console.log(results);
// });

// request("https://www.scmp.com/frontpage/international", function(error, response, html) {
//     var $ = cheerio.load(html);
//     var results = [];

//     $("h3.lvl_25-title").each(function(i, element) {
//         var title = $(element).text();
//         var link = $(element).children().attr("href");

//         results.push({
//             title: title,
//             link: link
//         });
//     });
//     console.log(results);
// });