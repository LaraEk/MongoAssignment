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

mongoose.connect("mongodb://localhost/chinanewsdb");

// // SCRAPE ROUTE comes first
// // note that this one works as well as the axios one below, so we'll use the axios one for now
// // because yay new library, but I'm going to leave this here as a useful thing. 
// app.get("/scrape", function(req, res) {
//     request("https://www.scmp.com/frontpage/international", function(error, response, html) {
//         var $ = cheerio.load(html);
//         var results = [];

//         $("h3.lvl_25-title").each(function(i, element) {
//             var title = $(element).text();
//             var link = $(element).children().attr("href");

//             db.article.create({
//                 title: title,
//                 link: link
//             },
//             function(err, inserted) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(inserted);
//                 }
//             });
//         });
//         console.log(results);
//     });
// })

// app.get("/test", function(req, res) {
//     console.log(res);
//     res.json("test");
// });

// SCRAPE ROUTE comes first
app.get("/scrape", function (req, res) {
    console.log("app.get begun");
    axios.get("https://www.scmp.com/frontpage/international").then(function(response) {
        console.log("axios.get begun");
        var $ = cheerio.load(response.data);
        var results = [];

        $("h3.lvl_25-title").each(function(i, element) {
            var title = $(element).text();
            var link = $(element).children().attr("href");
    
            results.push({
                title: title,
                link: link
            });

            db.article.create(results).then(function(dbarticle) {
                console.log(dbarticle);
            }).catch(function(error) {
                return res.json(error);
            });
        });
        console.log(results);

        res.send(results);
    });
});


// GET ALL ROUTE 
app.get("/articles", function(req, res) {
    db.article.find({})
        .then(function(dbarticle) {
            res.json(dbarticle);
        })
        .catch(function(error) {
            res.json(error);
        });
});

// GET SPECIFIC ARTICLE BY ID & POPULATE IT WITH A NOTE
app.get("/articles/:id", function (req, res) {
    db.article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbarticle) {
        res.json(dbarticle);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// SAVE/UPDATE THE NOTE FOR AN ARTICLE
app.post("/articles/:id", function(req, res) {
    db.note.create(req.body)
    .then(function(dbnote) {
        return db.article.findOneAndUpdate({ _id: req.params.id }, { note: dbnote._id }, { new: true });
    }).then(function(dbarticle) {
        res.json(dbarticle);
    }).catch(function(error) {
        res.json(error);
    });
});


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