define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!js/views/Map/MapView.html'
], function ($,_,Backbone,Marionette, htmlBody) {

window.MapView = Marionette.View.extend({
    el: '.container-fluid',
    initialize: function(opts) {
        this.bindTo(this, "show", this.onShowCalled, this);

        var compiledTemplate = _.template(htmlBody);
        $(this.el).append(compiledTemplate);

        var mapel = $("#map_canvas")[0];

        // watch for point changes
        this.mapModel = opts.model;
        this.pointsToViews = {};
        this.infowindow = new google.maps.InfoWindow({
            content: "Empty"
        });
        this.openInfo = function(point){
            var pointView = this.pointsToViews[point.get('_id')];
            pointView.openInfo();
        };

        var mapOptions = {
            zoom: 17, // this.mapModel.zoomLevel,
            center: this.mapModel.center.toGPoint(),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            click: function() {}

        };

        this.gmap = new google.maps.Map(mapel , mapOptions);
        google.maps.event.addListener(this.gmap, 'click', function(e)
        {
            //app.navigate("addspot/"+e.latLng.lat()+"/"+ e.latLng.lng(),{trigger:true});
            app.navigate("mapoptions/"+e.latLng.lat()+"/"+ e.latLng.lng(),{trigger:true});

        });


        // map the points to markers
        // attach to the map
        var self = this;
        this.mapModel.on('markers:add', function(newpoint) {
            var id =newpoint.get('_id');
            var markerExist = self.pointsToViews[id];
            if (markerExist)
                markerExist.model = newpoint;
            else {
                self.pointsToViews[id] = new MarkerView({
                    model: newpoint,
                    gmap: self.gmap,
                    mapview:self
                });
            }
        });

        this.mapModel.on('markers:remove', function(removedPoint) {
            // map the model remove to a Marker remove
            var targetView = self.pointsToMarkers[removedPoint.cid];
            targetView.remove();
            delete self.pointsToViews[removedPoint.cid];
        });

        this.mapModel.on('markers:reset', function(newPoints) {
            // remove all the current points
            _.each(_.values(self.pointsToViews), function(pointView) {
                // remove all the map markers
                pointView.remove();
            });
            // empty the map
            for (var k in self.pointsToViews) {
                delete self.pointsToViews[k];
            }

            // gmap render all the new points
            newPoints.each(function(newPoint) {
                self.pointsToViews[newPoint.cid] = new MarkerView({
                    model: newPoint,
                    gmap: self.gmap,
                    mapview:self
                });
            });
        });
        this.show();
    },

    show : function(p){
        $(".container-fluid #mapView").hide();
        console.log("show amp "+p);
        $(".container-fluid #mapView").animate({width: 'show'}, _.bind(function() {
            google.maps.event.trigger(this.gmap, "resize");
        },this));


    },


    render: function() {}
});

window.MarkerView = Backbone.View.extend({

    el: $('#mapCanvas'),

    initialize: function(opts) {
        //this.self =  this;
        this.model = opts.model;
        this.gmap = opts.gmap;
        this.mapview = opts.mapview;

        //var self = this;
        // update the position when the point changes
        this.model.on('change', function(updatedPoint) {
            self.gMarker.setPosition(updatedPoint.toGPoint());
        });
        // render the initial point state
        _.bindAll(this, 'click','dragend');
        this.render();
    },
    click:function(e){
      //alert("click on marker");
       this.openInfo();
    },
    dragend: function(e){
        //alert("dragend");
    },
    render: function() {

        var options ={
            position: this.model.toGPoint(),
            map: this.gmap,
            draggable:true,
            title: this.model.get('label')
        };

        var markerType = this.model.get('type');
        var markerOpts = utils.getMarkerOpt(markerType);
        $.extend(options,markerOpts );

        this.gMarker = new google.maps.Marker(options);
        google.maps.event.addListener(this.gMarker, 'click', this.click);
        google.maps.event.addListener(this.gMarker, 'dragend', this.dragend);
    },

    remove: function() {
        this.gMarker.setMap(null);
        this.gMarker = null;
    },
    openInfo : function(){
        this.mapview.infowindow.content = "<b>"+this.model.get("typeData").get("label")+"</b>";
        var modelType = this.model.get('type');
        if (modelType == 'Spot')
            this.mapview.infowindow.content += "<a href='#editspot/"+this.model.get("_id")+"'>Edit</b>";
        this.mapview.infowindow.open(this.gmap,this.gMarker);
    }


});
});