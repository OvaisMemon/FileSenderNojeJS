var express = require("express")
var logger = require("morgan")
var fs = require("fs")
var path = require("path")

var app = express();

app.use(logger("dev"));

app.use(function(req, res, next){
    var filepath = path.join(__dirname, "static", req.url);
    fs.stat(filepath, function(err, fileInfo){
        if(err){
            next();
            return;
        }
        
        if (fileInfo.isFile()){
            res.sendFile(filepath);
        }else{
            next();
        }
    })
})

app.use(function(req, res){
    res.status(400).send("File not found.");
})

app.listen(3000, function(){
    console.log("App is running on port 3000");
})