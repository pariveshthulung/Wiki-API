
// defining requiring libraries
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

// set up connection
mongoose.connect("mongodb://localhost:27017/wikiDB");

// creating schema
const wikiSchema={
    title: String,
    content: String
};

// creating model
const Article = mongoose.model("article", wikiSchema);

// requesting landing page
app.get("/",function(req,res){
    console.log("server started at port 3000.");
});

// requesting articles page
app.get("/articles", function(req,res){
    Article.find()
    .then(function(data){
        res.send(data);
    })
    .catch(function(err){
        res.send(err);
    });

});

// sending data to server
app.post("/articles",function(req,res){

    // creating document
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    //saving data with err handling
    newArticle.save()
    .then(function(){
        console.log("sucessfully save into database.");
    })
    .catch(function(err){
        console.log(err);
    });
});


// defining local host
app.listen(3000,function(){
    console.log("server started in port 3000");
});

