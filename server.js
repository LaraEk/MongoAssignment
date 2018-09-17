var cheerio = require("cheerio");
var request = require("request");

console.log("[WIP] web scraper [WIP]");

request("https://old.reddit.com/r/proplifting/", function(error, response, html) {

    var $ = cheerio.load(html);
    var results = [];

    $("p.title").each(function(i, element) {

        var title=$(element).text();
        var link = $(element).children().attr("href");

        results.push({
            title: title,
            link: link
        });

    });

    console.log(results);

});