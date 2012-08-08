define([
    'backbone'
], function ($) {

window.User = Backbone.Model.extend({

    urlRoot: config.apiUrl+"api/user",
    idAttribute:'_id',
    initialize: function (attributes) {
        this.validators = {};
        //this.id = attributes['_id'];
        //this.url = config.apiUrl+"api/user/"+this.id;


        this.validators.username = function (value) {

            // todo goto server to check if username exists.
            return value.length > 2 ? {isValid: true} : {isValid: false, message: "You must enter a valid username"};
        };

        this.validators.email = function (value) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            // todo goto server to check if username exists.
            return re.test(value) ? {isValid: true} : {isValid: false, message: "Please enter a valid email"};
        };

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };
        this.validators.password = function (value) {
            return value.length > 5 ? {isValid: true} : {isValid: false, message: "Password must be at least 6 characters long"};
        };
        this.validators.password2 = _.bind(function (value) {
            return value == this.get("password") ? {isValid: true} : {isValid: false, message: "Passwords must match"};
        },this);

    },
    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },
    defaults: {
        username: "",
        email:"",
        password:"",
        pos : []
    },
    toMarker:function(){
        var pos = this.get("pos");
        var point = new MapMarker({
            lat:pos[0],
            lng:pos[1],
            label: this.get('_id'),
            type:'User',
            typeData:this
        });
        return point;
    },



    getGoogleLatLng:function() {
        var pos = this.get('pos');
        return new google.maps.LatLng(pos[0], pos[1]);

    },
    // override for merse rest api
    parse: function(models) {
        return models;
    }
});

window.UserCollection = Backbone.Collection.extend({

    model: User,
    url: config.apiUrl+"api/user",


    getPoints:function() {
        var points = [];
        this.each(function(user){
            points.push(user.toMarker());
        });
        return points;

    },
    // override default get, so that username can be passed in any case.
    get: function(id) {
        if (id == null) return void 0;
        var result = this._byId[id.id != null ? id.id : id];
        if (result != null)
            return result;
        var lowId = id.toLowerCase();
        // try to find it ignoring the case
        result = _.find(this.models, _.bind(function(item){
            return item.id.toLowerCase() == lowId;
        },this));
        return result;
    },
    getByUsername: function(username) {
        if (username== null) return void 0;

        var lowId = username.toLowerCase();
        // try to find it ignoring the case
        var result = _.find(this.models, _.bind(function(item){
            return item.get("username").toLowerCase() == lowId;
        },this));
        return result;
    },
    // override for merse rest api
    parse: function(models) {

        return models.payload;
    }


});
});