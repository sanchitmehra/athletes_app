var express = require('express');
var app = express();
cors = require('cors');
bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var DB;
app.use(cors({
    origin: 'http://192.168.1.5:8081'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://sanchit:Sanchit1@ds157742.mlab.com:57742/athletes', {
    useNewUrlParser : true
    }, function(err, db){
if(err){
    console.log("this is an error connecting to mongodb");
    console.log(err);
}

else{
    
    console.log("connection successfull");
}
});

var Schema = mongoose.Schema;

var athletes_schema = new Schema({
username : String,
nationality: String,
gender: String,
sport: String,
dateofbirth: Date,
description: String,
location: String,
team: String,
facebook_handle: String,
twitter_handle: String,
insta_handle: String,

});

 var athletes = mongoose.model('athletes_information', athletes_schema);

    app.get('/data', function(req, res){
        
        console.log("received a get request");
        res.send({
            message: 'data sent back'
        });
        
      
    });

    app.post('/getathletes', function(req, res){
        
        console.log("received a get request");
      
        athletes.find(function(err, result) {
       
            if(result !== null){
                console.log("all athletes are "+result);
                res.send({
                   data : result 
                 });
            }
            });

        // DB.collection('athletes_info').find(function(err, result){
        //     if(result !== null){
        //         console.log("data found from database");
        //         console.log(result);
        //         res.send({
        //             data: result
        //         });
        //     }
        //     else{
        //         res.send({
        //                 data: "No Athlete in the database"
        //         });
        //     }
        // });
      
    });

    app.post('/save_athlete', function(req, res){
        
        console.log("athlete data: " +req.body);
      
        var data = new athletes({
            username : req.body.username,
            nationality  : req.body.nationality,
            gender : req.body.gender,
            sport: req.body.sports,
            description : req.body.description,
             location : req.body.location,
             dateofbirth: req.body.dateofbirth,
             team:  req.body.team,
             facebook_handle: req.body.facebook,
             twitter_handle: req.body.twitter,
             insta_handle: req.body.instagram,
             
        });

data.save(function(err){
                if(!err){
                    console.log("athlete saved");
                    res.send({
                        message: "athlete Saved"
                    });
                }
                else {
                    console.log("Error on saving to DB");
                   
                 }
      });

    });
    

app.listen(3000);

console.log("server running on port 3000");