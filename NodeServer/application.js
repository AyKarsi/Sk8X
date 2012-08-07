var http = require('http');
var mongoose = require('mongoose');
var express = require('express');//   , form = require('connect-form');
var everyauth = require('everyauth');
var mers = require('mers');
var User = require('./models/user');
var Spot = require('./models/spot');
var clientDir = __dirname + '/../Client';


// cloud 9 settings/workarounds
var appPort = 10999;
if (process.env.PORT)
    appPort =  process.env.PORT;

var app = express.createServer();
//CORS middleware
// see http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};


everyauth.password
    .getLoginPath("/client/src/index.html#login")
    .postLoginPath("/login")
    .authenticate(function(login,password){
        console.log("logging in " + login+ " " +  password);
        var promise = this.Promise();
        var query = User.where('username').equals(login);//.where('password').equals(password);
        query.exec(function(err, user){
            if (err) return promise.fulfill([err]);
            if (user && user.length > 0 && user[0].comparePasswords(password))
                promise.fulfill(user[0]);
        });
//
//
//        User.find({ username: login}, function (err, user) {
//           if (err) return promise.fulfill([err]);
//           promise.fulfill(user);
//        });
        return promise;
    })
    .respondToLoginSucceed( function (res, user, data) {

        var loggedIn =everyauth._req._getters.loggedIn();
        console.log("respondToLoginSucceed " +loggedIn + " "+  everyauth.user);

        if (user) {
            everyauth.user = user;
            //response.login = true;
            return res.json({ success: true }, 200);
        }
        //this.redirect(res);
    })
    .handleLogout( function (req, res) {

        everyauth.user = null;
        return res.json({ success: true }, 200);

    })
    .respondToLoginFail( function (req, res, errors, login) {
        if (!errors || !errors.length) return;
        return res.json({ success: false, errors: errors });
    })
    .getRegisterPath('/client/src/index.html#register') // Uri path to the registration page
    .postRegisterPath('/register') // The Uri path that your registration form POSTs to
    .registerUser(function(newUserAttributes){
        // This step is only executed if we pass the validateRegistration step without
        // any errors.
        //
        // Returns a user (or a Promise that promises a user) after adding it to
        // some user store.
        //
        // As an edge case, sometimes your database may make you aware of violation
        // of the unique login index, so if this error is sent back in an async
        // callback, then you can just return that error as a single element array
        // containing just that error message, and everyauth will automatically handle
        // that as a failed registration. Again, you will have access to this error via
        // the `errors` local in your register view jade template.
        // e.g.,
        // var promise = this.Promise();
        // User.create(newUserAttributes, function (err, user) {
        //   if (err) return promise.fulfill([err]);
        //   promise.fulfill(user);
        // });
        // return promise;
        //
        // Note: Index and db-driven validations are the only validations that occur
        // here; all other validations occur in the `validateRegistration` step documented above.
    })
    .registerSuccessRedirect('/client/src/index.html');


;


app.configure(function() {
    app.use(allowCrossDomain);
    app.use(express.bodyParser({uploadDir:'./uploads'}));
    app.use(express.cookieParser());
    app.use(express.session({secret: 'mr ripley'}));
    app.use(everyauth.middleware());
    app.use(express.methodOverride());

    //app.use('/api', mers({uri:'"mongodb://admin:nimda@staff.mongohq.com:10082/Trigger02"'}).rest());
    app.use('/api', mers({uri:'"mongodb://localhost:27017/Ska8x"'}).rest());
    app.use("/client", express.static(clientDir));
});

everyauth.helpExpress(app);

//var io = require('socket.io').listen(app);
var count = 0;

app.listen(appPort);
console.log("running on " + appPort);



app.get('/', function(req, res){

    console.log("everyauth "+ everyauth.loggedIn);
    console.log(req.loggedIn);
    res.send('<form method="post" enctype="multipart/form-data">'
    + '<p>1111: <input type="file" name="image" /></p>'
    + '<p><input type="submit" value="Upload" /></p>'
    + '</form>');
});


/*
app.post('/login', function(req, res,next){

    var username = req.body.username;
    var password = req.body.password;
    var query = User.where('username').equals(username);//.where('password').equals(password);
    query.exec(function(err, docu){
        var response = {login:false};
        if (docu && docu.length > 0 && docu[0].comparePasswords(password)){
            // todo only accept if a single user was found
            response = {login:true};
        }
        else{
            response = {login:false};
        }
        res.send(response);
    });
});
*/




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


var testDBConnection = function(){

    console.log("connecting to mongo...");

    var MONGOHQ_URL="mongodb://admin:nimda@staff.mongohq.com:10082/Trigger02";
    mongoose.connection.on("open", function(){
        console.log("mongodb is connected!!");

    });

    //mongoose.connect(MONGOHQ_URL);

    /*
    mongoose.connect("localhost", "sk8x",function(err)
    {
        if (err)
        {
            throw "Unable to connect to database "+err;
        }
    });*/



}

testDBConnection();


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



/*
// update db fields
db.Spot.update({'features' : null},
      {'$set' : {'features' : [] }},
      { multi: true },
      function (err, numAffected) {
          console.log("updated "+ numAffected + " documents");
      }
);



 // remove a field
 Spot.update({'' : 'Parc'},
 {'$unset' : {'':1}},
 { multi: true },
 function (err, numAffected) {
 console.log("updated "+ numAffected + " documents");
 }
 );



 */


var query = User.where('_id').equals("501fdd44782632b42900040f");
query.remove(function(err, count){
    console.log("Removed err " +err + " docs deleted "+count);
});


// remove test records
var query = Spot.where('label').regex(/^pleaseDelete[a-z0-9]+$/i);

console.log(query);

/*query.exec(function(err, docu){
    console.log("err " +err + " doc "+docu);
});*/
query.remove(function(err, count){
    console.log("Removed err " +err + " docs deleted "+count);
});

query = Spot.where('pos').equals([100,100]);
query.remove(function(err, count){
    console.log("Removed err " +err + " docs deleted "+count);
});


//console.log(mongoose.connection.collections);
/*
mongoose.connection.collections['profileimages'].drop( function(err) {
    console.log(err + ' <- collection dropped');
});

mongoose.connection.collections['pictureimages'].drop( function(err) {
    console.log(err + ' <- collection dropped');
});

mongoose.connection.collections['users'].drop( function(err) {
    console.log(err + ' <- collection dropped');

    console.log(mongoose.connection.collections);
});


var u = new User({
    username:"teest",
    password:"test13",
    email:"2342342@werwre.com"
});
u.save(null,function(a,b,c){
   console.log(a +  b + c);
});



 */