var crypto = require('crypto'), mongoose = require('mongoose'), Schema = mongoose.Schema, ImageInfo = require('../plugins/ImageInfo');
var everyauth = require('everyauth');

var SpotSchema = new Schema({
    label: String,
    pos: Array,
    creator: String,
    creationDate : Date,
    features:[String],
    description:String
});




SpotSchema.post('init', function () {

    var loggedIn =everyauth._req._getters.loggedIn();

    console.log("post " +loggedIn);
    if(!loggedIn)
        return false;

    var _this = this;
    //console.log("pre_init init "+_this._id + " " +_this.label);
    //next();
});


SpotSchema.pre('init', function (next) {

//    Read is allowed for everyone..
//    if(!everyauth.user)
//        next(new Error('Not Logged in'));
    next();

});

SpotSchema.pre('save', function (next) {

    if(!everyauth.user){
        next(new Error('Not Logged in'));
        return;
    }


    var _this = this;
    console.log("pre_spot save "+_this._id + " " +_this.label + " isNew "+this.isNew);
    if (this.isNew){
        this.created_at = Date.now();
    }
    else
        this.modfied_at = Date.now();

    next();


});


var Spot = mongoose.model("spot", SpotSchema);

module.exports = Spot;
