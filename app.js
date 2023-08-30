
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

/////////////////////////////////// Request targeting all Articles ///////////////////////////////
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

/////////////////////////////////// Request targeting a specific Articles ///////////////////////////////

app.route("/articles/:articleTitle")

.get(function(req,res){
    console.log(req.params.articleTitle);
    Article.findOne({ title: req.params.articleTitle})
    .then(function(founddata){
        if(founddata){
            res.send(founddata);
            console.log(founddata);
        }
        else{
            console.log("data not found");
        }

    })
    .catch(function(){
        console.log("data not found");
        res.send("data not found");
    });

})

.put(function(req,res){
    Article.updateOne(
        {title:req.params.articleTitle},
        {title: req.body.title, content:req.body.content},
    )
    .then(function(){
        console.log("sucessfully replace data");
    })
    .catch(function(err){
        console.log(err);
    });
})


.patch(function(req,res){
    Article.updateOne(
        {title: req.params.articleTitle},
        {$set : req.body}
    )
    .then(function(){
        console.log("sucessfully updated by patch http verb");
    })
    .catch(function(err){
        console.log(err);
    });
})
.delete(function(req,res){
    Article.deleteOne({ title: req.params.articleTitle})
    .then(function(){
        console.log("sucessfully deleted");

    })
    .catch(function(err){
        console.log(err);
    })
});

// defining local host
app.listen(3000,function(){
    console.log("server started in port 3000");
});

