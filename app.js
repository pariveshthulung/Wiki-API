
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
    
});

// chainable routing handler
app.route("/articles")

// reading data from database
.get(function(req,res){
    Article.find()
    .then(function(data){
        res.send(data);
    })
    .catch(function(err){
        res.send(err);
    });

})

// sending data to server
.post(function(req,res){

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
})

// deleting data from database
.delete(function(req,res){
    Article.deleteMany()
    .then(function(){
        console.log("[-]sucessfully deleted");
    })
    .catch(function(err){
        console.log(err);
    })
});

// defining local host
app.listen(3000,function(){
    console.log("server started in port 3000");
});

