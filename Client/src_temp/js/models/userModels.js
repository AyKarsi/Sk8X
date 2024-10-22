var User = Backbone.Model.extend({

    url: config.apiUrl+"api/user",


    initialize: function (attributes) {
        this.validators = {};
        this.id = attributes['_id'];
        this.url = config.apiUrl+"api/spots/"+this.id;

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };
    },
    defaults: {
        _id: null,
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

var UserCollection = Backbone.Collection.extend({

    model: User,
    url: config.apiUrl+"api/user",


    getPoints:function() {
        var points = [];
        this.each(function(user){
            points.push(user.toMarker());
        });
        return points;

    },
    // override for merse rest api
    parse: function(models) {

        return models.payload;
    }


});
