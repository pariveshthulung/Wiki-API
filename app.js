const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

// set up connection
mongoose.connect("mongodb://localhost/27017/wikiDB");

// schema
const wikiSchema={
    title: String,
    content: String
};

// model
const Article = mongoose.model("article", wikiSchema);

app.get("/articles", function(req,res){
    

});

app.listen(3000,function(){
    console.log("server started in port 3000");
});

