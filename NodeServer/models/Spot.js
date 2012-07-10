var crypto = require('crypto'), mongoose = require('mongoose'), Schema = mongoose.Schema, ImageInfo = require('../plugins/ImageInfo');

var SpotSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    label: String,
    pos: Array,
    creator: String,
    creationDate : Date
});


SpotSchema.post('init', function () {

    var _this = this;
    console.log("pre_init init "+_this._id + " " +_this.label);
    //next();
});

SpotSchema.pre('save', function (next) {

    var _this = this;
    console.log("pre_spot save "+_this._id + " " +_this.label);
    if (this.isNew)
        this.created_at = Date.now();
    else
        this.modfied_at = Date.now();
    next();
});


var Spot = mongoose.model("spot", SpotSchema);

module.exports = Spot;
