var clientDir = __dirname + '/../Client';
var log = require("./lib/log")("log.txt");
var http = require('http');
var mongoose = require('mongoose');
var express = require('express');//   , form = require('connect-form');
var everyauth = require('everyauth');
require('./lib/authSetup');
var cors = require('./lib/cors');
var mers = require('mers');
var User = require('./models/user');
var Spot = require('./models/spot');

// cloud 9 settings/workarounds
var appPort = 10999;
if (process.env.PORT)
    appPort =  process.env.PORT;

var app = express.createServer();

app.configure(function() {
    app.use(cors.allowCrossDomain);
    app.use(express.bodyParser({uploadDir:'./uploads'}));
    app.use(express.cookieParser());
    app.use(express.session({secret: 'mr ripley'}));
    app.use(everyauth.middleware());
    app.use(express.methodOverride());
    //app.use('/api', mers({uri:'"mongodb://admin:nimda@staff.mongohq.com:10082/Trigger02"'}).rest());
    app.use('/api', mers({uri:'"mongodb://localhost:27017/Ska8x"'}).rest());
    app.use("/client", express.static(clientDir));
});


//var io = require('socket.io').listen(app);
var count = 0;

app.listen(appPort);
log("running on " + appPort);
require("./lib/routes")(app);


var testDBConnection = function(callback){
    //var MONGOHQ_URL="mongodb://admin:nimda@staff.mongohq.com:10082/Trigger02";
    mongoose.connection.on("open", function(){
        log("mongodb is connected!!");
        callback();
    });

    mongoose.connection.on("error", function(){
        log("mongodb is not connected!!!!");
        throw "Unable to connect to database ";
    });
}

testDBConnection(function(){
    log("express started. System is ready");
    require("./lib/dbUpdates");

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




