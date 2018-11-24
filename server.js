let express = require('express');
var router = express.Router();
let webpack = require('webpack');
let config = require('./webpack.config');
let bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
const dbConn = MongoClient.connect('mongodb://localhost:27017');

const app = express();
const PORT = 3000;
const compiler  = webpack(config);

app.use(require('webpack-dev-middleware') (compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/user', function(req, res){
res.send({emp: 1632, org: 'tothenew'});
});

app.get('/me', function(req, res){
res.send({name: "Arushi Shukla", project: "GarbleCloud"});
});

app.get('/feed', function(req, res){
  var FeedData = { _id : 100, item : "juice" };
  res.send(FeedData);
});

app.post('/userDetails', function(req, res){
var myData = req.body;
console.log('???????????????', myData);

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  var db = client.db('userData');
    db.collection('userData').findOne(myData, function (err, result) {
          if(err == null && result==null)
            res.send({'code':0,'error':"data hasn't matched!"});
         else{
           let userDetails = {name:result.name,email:result.email},
           access_token = Math.random();
           res.send({'code':1,'access_token':access_token,details:userDetails});
         }
     });
   });
});

//CreateUser Api
app.post('/createUser', function(req, res){
var myData = req.body;

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  var db = client.db('userData');

  db.collection('userData').createIndex({"email": 1}, { unique: true }, function(err,result){
    console.log('???????????????', myData);
    if (err){
      console.log('error::::::::::', err);
         res.send('Error');
    }

    else{
      console.log('Success::::::::::');
      db.collection('userData').insert(myData, function (err, result) {
          console.log(result);
          if (err)
          res.send('Error');
          else
          res.send('Success');
       });
    }
      });
    })
  });


  //CreateFeed Api

  app.post('/createFeed', function(req, res){
  var myData = req.body;

  console.log(myData);

  MongoClient.connect("mongodb://localhost:27017", function (err, client) {
    var db = client.db('userData');

    // db.collection('userData').findOne(myData, function(err,result){
    //   console.log('???????????????', myData);
    //   if (err){
    //     console.log('error::::::::::', err);
    //        res.send('Error');
    //   }
    //
    //   else{
    //     console.log('Success::::::::::');
    //     db.collection('userData').insert(myData, function (err, result) {
    //         console.log(result);
    //         if (err)
    //         res.send('Error');
    //         else
    //         res.send('Success');
    //      });
    //   }
    //     });
    db.collection('userData').insert(myData,function(err,result){
        if(err){
          res.send({error:"Something got wrong."})
        }
        else{
          res.send("Success");
        }
    })
      })
    });

app.listen(PORT, ()=> {
console.log(`Server running on ${PORT}`);
});
