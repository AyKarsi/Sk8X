var log = require("./log")(__filename);

var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Join = require("join");

var DbUser = new Schema(
    {
        username : String,
        password : String,
        email    : String,
        tags     : String
    }
);

var DbUserStory = new Schema(
    {
        createdby   : ObjectId,
        createdon   : Date,
        title       : String,
        description : String,
        assignedto  : ObjectId,
        priority    : Number,
        tags        : String
    }
)

var DbTask = new Schema(
    {
        createdby    : ObjectId,
        createdon    : Date,
        title        : String,
        description  : String,
        assignedto   : ObjectId,
        reluserstory : ObjectId,
        tags         : String
    }
);

var typeMap = new Array();

exports.createType = function(type)
{
    type = type.toLowerCase();
    var func = typeMap[type];
    if (func==null) throw "models.createType: Type "+type+" not found in typemap";

    return func();
}

exports.createModels = function(callback)
{
    exports.User = Mongoose.model('User', DbUser, 'user');
    typeMap["user"] = function() { return new exports.User(); }

    exports.User.findByUsername = function(user, callback)
    {
        this.findOne({'username':user}, function(err,doc)
        {
             callback(err,doc);
        });
    };

    exports.Task = Mongoose.model('Task', DbTask, 'task');
    typeMap["task"] = function() { return new exports.Task(); }

    exports.UserStory = Mongoose.model('UserStory', DbUserStory, 'userstory');
    typeMap["userstory"] = function() { return new exports.UserStory(); }

    var join = Join.create();
    exports.User.collection.ensureIndex({username:1, email:1}, {unique:true, sparse:true}, join.add());

    join.when(function()
    {
        callback();
    });
}

log("Loaded databases");
