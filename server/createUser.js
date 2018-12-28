// let express = require('express');
// var router = express.Router();
// let webpack = require('webpack');
// let config = require('.././webpack.config');
// let bodyParser = require('body-parser');
// let MongoClient = require('mongodb').MongoClient;
// const dbConn = MongoClient.connect('mongodb://localhost:27017');
//
// const app = express();
// const PORT = 3000;
// const compiler  = webpack(config);
//
// app.use(require('webpack-dev-middleware') (compiler));
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

const createUser = function(){
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

  console.log('abc');
}
export default createUser;
