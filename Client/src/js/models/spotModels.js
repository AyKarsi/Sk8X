define([
    'backbone'
], function ($) {

window.Spot = Backbone.Model.extend({

    urlRoot: config.apiUrl+"api/spot",
    idAttribute:'_id',
    initialize: function (attributes) {


        this.validators = {};
        /*
        if (this.id)
            this.url = config.apiUrl+"api/spot/"+this.id;
        else if (this._id)
            this.url = config.apiUrl+"api/spot/"+this._id;*/
    },
    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },
    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },
    defaults: {
        _id: null,
        label: 'PleaseSet',
        pos : [],
        spotType:'', // spot or parc
        description:'',
        features:[]
    },
    toMarker:function(){
        var pos = this.get("pos");
        var point = new MapMarker({
            _id: this.get('_id'),
            lat:parseFloat(pos[0]),
            lng:parseFloat(pos[1]),
            label: this.get('label'),
            type:'Spot',
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

        if (models.payload)
            return models.payload;
        return models;
    }

});

window.SpotCollection = Backbone.Collection.extend({

    model: Spot,
    url: config.apiUrl+"api/spot",

    getPoints:function() {
        var points = [];
        this.each(function(spot){

            var lat = spot.get("pos")[0];
            var lng = spot.get("pos")[1];

            if (!lat || !lng){
                console.log("unknown coordinates for point"+spot.attributes.type + " "+ spot.attributes._id);
            }
            else
                points.push(spot.toMarker());
        });
        return points;

    },
    // override for merse rest api
    parse: function(models) {
        return models.payload;
    }


});
});