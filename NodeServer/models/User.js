var crypto = require('crypto'), mongoose = require('mongoose'), Schema = mongoose.Schema, ImageInfo = require('../plugins/ImageInfo');
var log = require("./../lib/log")("log.txt");
var RoleSchema = new Schema({
    name:{type:String},
    read:{type:Boolean},
    edit:{type:Boolean},
    remove:{type:Boolean},
    changeOwnership:{type:Boolean}

})
var UserSchema = new Schema({
    username:{type:String, required:true,  index: { unique: true },  display:{help:'This must be a unique name'}},
    //first_name:{type:String},
    //last_name:{type:String},
    //twitter:{type:String,required:true, validate: /^@[a-zA-Z0-9]*$/i },
    email:{type:String},
    password:{type:String, display:{dataType:'Password'}, get:function(){ return 'password' }}

  ,  groups:[
        { type:Schema.ObjectId, ref:'group', index:true}
    ],
    meta:{
        stars:Number,
        favorite:{type:Number,display:{title:'Favorite'}}
    },
    roles:[RoleSchema],
    created_at:{type:Date, display:{display:'none'}},
    created_by:{type:Schema.ObjectId, ref:'user'},
    modified_at:{type:Date}
    ,
    images:[ImageInfo]
    ,profile:{type:Schema.ObjectId, ref:'ProfileImage' }
    ,pictures:[{type:Schema.ObjectId, ref:'PictureImage'}]
}, {safe:true, strict:true, display:{
    fields:['username','first_name','last_name','password','twitter','email','groups', 'meta.favorite', 'images'
        ,'profile','pictures'
    ],
    list_fields:['username','first_name','last_name','twitter','email', 'meta.favorite']
 }

});
mongoose.model('ProfileImage', ImageInfo);
mongoose.model('PictureImage', ImageInfo);

UserSchema.statics.findA_thru_H = function onFindAH(){
    return this.find().regex('username', /^[a-h]/i);
}

UserSchema.statics.findI_thru_P = function onFindIP(){
    return this.find().regex('username', /^[i-p]/i);
}
UserSchema.statics.findQ_thru_Z = function onFindQZ(){
    return this.find().regex('username', /^[q-z]/i);
}

function sha1b64(password) {
    return crypto.createHash('sha1').update(password).digest('base64');
}



//UserSchema.virtual('password').set(
//    function (password) {
//        this.set('_password', sha1b64(password));
//    }).get(function () {
//        return this.get('_password');
//    });

UserSchema.methods.comparePasswords = function(pwd1){
    var p1 = this._doc.password;
    //console.log("checking Password " + this.password + " " +pwd1);
    var p2 = sha1b64(pwd1);
    if (p1== p2)
        return true;
    return false;
};

UserSchema.pre('save', function (next) {
    log("saving user " + this.username);
    var _this = this;
    if (this._doc.password && this._doc.password != 'password'){
        this.password = sha1b64(_this._doc.password)
    }
    if (this.isNew)
        this.created_at = Date.now();
    else
        this.modfied_at = Date.now();
    next();
});

UserSchema.statics.findByUsernamePassword = function (username, password) {
    return  this.where({username:username, _password:sha1b64(password)});
}

var User = mongoose.model("user", UserSchema);

module.exports = User;