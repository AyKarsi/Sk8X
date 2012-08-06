var crypto = require('crypto'), mongoose = require('mongoose'), Schema = mongoose.Schema, ImageInfo = require('../plugins/ImageInfo');

var SpotSchema = new Schema({
    _id: mongoose.Schema.ObjectId,
    label: String,
    pos: Array,
    creator: String,
    creationDate : Date,
    features:[String],
    description:String
});


SpotSchema.post('init', function () {

    var _this = this;
    console.log("pre_init init "+_this._id + " " +_this.label);
    //next();
});

SpotSchema.pre('save', function (next) {

    var _this = this;
    console.log("pre_spot save "+_this._id + " " +_this.label + " isNew "+this.isNew);
    if (this.isNew)
        this.created_at = Date.now();
    else
        this.modfied_at = Date.now();

    //manually create new objectId so that it is returned to the client..
    this._id = new Spot()._id;


    next();
});


var Spot = mongoose.model("spot", SpotSchema);

module.exports = Spot;
