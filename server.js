let express = require('express');
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
//  console.log(client.db('Feed_Module'));
res.send({emp: 1632, org: 'tothenew'});
});

app.get('/me', function(req, res){
res.send({name: "Arushi Shukla", project: "GarbleCloud"});
});

app.get('/feed', function(req, res){
  var FeedData = {timeStamp: new Date(), feed: "This is demo feed from express server"};
  res.send(FeedData);
// console.log('Feed Data :::::',FeedData);
});

app.post('/userDetails', function(req, res){
var myData = req.body;
console.log('???????????????', myData);

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  var db = client.db('userData');
    db.collection('userData').insert(myData, function (err, result) {
         if (err)
            res.send('Error');
         else
           res.send('Success');
     });
});

});

app.listen(PORT, ()=> {
console.log(`Server running on ${PORT}`);
});
