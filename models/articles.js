var mongoose = require("mongoose");

var schema = mongoose.Schema;

var articleschema = new schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
    //I'll add note here in a bit!
});

var article = mongoose.model("article", articleschema);

module.exports = article;