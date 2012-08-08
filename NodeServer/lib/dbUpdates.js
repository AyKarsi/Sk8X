var User = require('./../models/user');
var Spot = require('./../models/spot');
var log = require('./log')("log.txt");
var mongoose = require("mongoose");

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






var query = User.where('_id').equals("501fdd44782632b42900040f");
query.remove(function(err, count){
    log("Removed err " +err + " docs deleted "+count);
});

 var query = User;
 query.--- remove(function(err, count){
 log("Removed users " +err + " docs deleted "+count);
 });

 */

/*mongoose.connection.collections['users'].drop( function(err) {
    if (!err)
        console.log("dropped user collection ");
    else
        console.log("drop user collection failed " + err);

});*/



// remove test records
var query = Spot.where('label').regex(/^pleaseDelete[a-z0-9]+$/i);
query.remove(function(err, count){
    log("Removed TestDocuments err " +err + " docs deleted "+count);
});

query = Spot.where('pos').equals([100,100]);
query.remove(function(err, count){
    log("Removed Testdocuments err " +err + " docs deleted "+count);
});

query = Spot.where('pos').equals(["undefined","undefined"]);
query.remove(function(err, count){
    log("Removed Testdocuments err " +err + " docs deleted "+count);
});
query = Spot.where('pos').equals([]);
query.remove(function(err, count){
    log("Removed Testdocuments err " +err + " docs deleted "+count);
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
