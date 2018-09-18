var cheerio = require("cheerio");
var request = require("request");

console.log("[WIP] web scraper [WIP]");

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

request("https://www.scmp.com/frontpage/international", function(error, response, html) {
    var $ = cheerio.load(html);
    var results = [];

    $("h3.lvl_25-title").each(function(i, element) {
        var title = $(element).text();
        var link = $(element).children().attr("href");

        results.push({
            title: title,
            link: link
        });
    });
    console.log(results);
});