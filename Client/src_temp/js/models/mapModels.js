// geo-point data model
var MapMarker = Backbone.Model.extend({
    // explicitly specifiy the model
    defaults: {
        lat: 0.0,
        lng: 0.0,
        label: "Empty",
        type: 'marker',
        typeData: null
    },

    // convenience function
    toGPoint: function() {
        return new google.maps.LatLng(this.get('lat'), this.get('lng'));
    }
});

// collection of points
var MapMarkerCollection = Backbone.Collection.extend({
    model: MapMarker
});



//model is a composit model of points
window.MapModel = Backbone.Model.extend({
    // by default models can't be nested
    initialize: function(opts) {
        Backbone.Model.prototype.initialize.apply(this, arguments);

        this.markers = new MapMarkerCollection;
        this.center = opts.center;
        // route changes to model listeners
        var self = this;

        this.markers.on('add', function(event,model,options) {
            self.trigger('markers:add', event,model,options); //model.models[options.index]);
        });

        this.markers.on('remove', function(removedPoint) {
            self.trigger('markers:remove', removedPoint);
        });

        this.markers.on('reset', function(newPoints) {
            self.trigger('markers:reset', newPoints);
        })

        this.center.on('change', function(newCenter) {
            self.trigger('center:change', newCenter);
        });

    },

    defaults: {
        label: null
    }
});

