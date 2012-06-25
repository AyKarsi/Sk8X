// folder struckture http://stackoverflow.com/questions/5178334/folder-structure-for-a-nodejs-project



var http = require('http');
var db = require('./skatedb');
var mongoose = require('mongoose');
var express = require('express');//   , form = require('connect-form');
var mers = require('mers');
var User = require('./models/user');
var Spot = require('./models/spot');

//db.init();


// cloud 9 settings/workarounds
var appPort = 99;
if (process.env.PORT)
    appPort =  process.env.PORT;


var app = express.createServer(
  // connect-form (http://github.com/visionmedia/connect-form)
  // middleware uses the formidable middleware to parse urlencoded
  // and multipart form data
  //form({ keepExtensions: true }) deprecated http://stackoverflow.com/questions/8481349/expressjs-bodyparser-and-connect-form

);

//CORS middleware
// see http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.configure(function() {
    app.use(allowCrossDomain);
    app.use(express.bodyParser({uploadDir:'./uploads'}));
    app.use('/api', mers({uri:'"mongodb://admin:nimda@staff.mongohq.com:10082/Trigger02"'}).rest());

    //app.use(express.bodyParser());
    //app.use(express.cookieParser());
    //app.use(express.session({ secret: 'cool beans' }));
    //app.use(express.methodOverride());

    //app.use(app.router);
    //app.use(express.static(__dirname + '/public'));
});

//require('./routes/spotRoutes.js')(app,db);
//require('./routes/userRoutes.js')(app,db);


//var io = require('socket.io').listen(app);
var count = 0;

app.listen(appPort);
console.log("running on " + appPort);



app.get('/', function(req, res){
  res.send('<form method="post" enctype="multipart/form-data">'
    + '<p>1111: <input type="file" name="image" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '</form>');
});
/*
app.get('/push', function(req, res){
    console.log("pushing");
    count++;
    io.sockets.emit('news',{count:count});
    res.send(count);

});
*/

app.post('/fileupload', function(req, res, next){
    
    //http://www.hacksparrow.com/handle-file-uploads-in-express-node-js.html
    console.log(req.body);
    console.log(req.files);
    
    res.send({msg:'success'}) ;
    
    return;
    

});

//mongodb://admin:nimda@staff.mongohq.com:10082/Trigger02
/*
io.sockets.on('connection', function(socket){
    console.log("sending");
    socket.volatile.emit('notification', {time: new Date()});    
});
*/

/*
io.sockets.on('connection', function (socket) {
  socket.emit('news', { count: count });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
  */
console.log("express started");


