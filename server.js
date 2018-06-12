let express = require('express');
let  webpack = require('webpack');
let config = require('./webpack.config');

const app = express();
const PORT = 3000;
const compiler  = webpack(config);

app.use(require('webpack-dev-middleware') (compiler));

app.get('/user', function(req, res){
res.send({emp: 1632, org: 'tothenew'});
});

app.get('/me', function(req, res){
res.send({name: "Arushi Shukla", project: "GarbleCloud"});
});


app.get('/feed', function(req, res){
res.send({timeStamp: new Date(), feed: "This is demo feed from express server"});
});



app.listen(PORT, ()=> {
console.log(`Server running on ${PORT}`);
});
