
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!app/views/Map/MapView.html'
], function ($,_,Backbone,Marionette, htmlBody) {

    window.MapView = Marionette.View.extend({
        name:'mapView',
        initialize: function(opts) {
            this.bindTo(this, "show", this.onShowCalled, this);

            //var compiledTemplate = _.template(htmlBody);
            this.el = $(htmlBody);

            var mapel = $("#map_canvas",this.el)[0];


            this.lmap = L.map(mapel);

            L.tileLayer('http://{s}.tile.cloudmade.com/5b59eb4cf032475ba1acacdb4a8eff87/997/256/{z}/{x}/{y}.png', {
                //L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }).addTo(this.lmap);

            // watch for point changes
            this.mapModel = opts.model;
            this.lmap.setView( [this.mapModel.get("center").get("lat"),  this.mapModel.get("center").get("lng")], 19);


            this.lmap.on("popupopen", _.bind(function(e){

                var popup = e.popup != null ? e.popup : e._popup;
                if(popup == null)
                {
                    console.log("recieved invalid popupopen event " +e);
                    return;
                }

                var model = popup._source.options.model;
                var id = model.get("_id");
                // make sure we have the latest (possibly update markermode)
                model = spotController.spotCollection.get(id);//this.mapModel.markers.models,function(m){

                // todo modelType
                var modelType = model.get('type');

                var markerView = new SpotMarkerView({model:model});
                markerView.render();
                popup.setContent(markerView.el);


            },this));

            this.lmap.on("click",function(e){
                app.navigate("mapoptions/"+e.latlng.lat+"/"+ e.latlng.lng,{trigger:true});
            });

            this.addSpot = function(spot){
                var pos = spot.get("pos");
                var lat = pos[0];
                var lng = pos[1];

                if (!lat || !lng  || lat == "undefined" || lng =="undefined" ){
                    console.log("unkonw coordinats for point"+spot.attributes.type + " "+ spot.attributes._id);
                    return;
                }

                var marker = L.marker([lat,lng],{
                    model:spot
                });
                // empty bind need so that event listeners is tuned in
                marker.bindPopup("");
                marker.addTo(this.lmap);
                //console.log("added marker "+ spot.get("_id") + " " + spot.get("label"));
            };

            spotController.spotCollection.on('reset', _.bind(function(){
                console.log("got reset event (called on fetch?)");

                _.each(spotController.spotCollection.models, _.bind(function(spot){
                    this.addSpot(spot);
                },this));
            },this));


            spotController.spotCollection.on('add', _.bind(function(newSpot){
                console.log("got add event");
                this.addSpot(newSpot);
            },this));



/*            this.markerViews = [];
            this.mapModel.on('markers:add', _.bind(function(newpoint) {

                var lat = newpoint.get("lat");
                var lng = newpoint.get("lng");

                if (!lat || !lng){
                    console.log("unkonw coordinats for point"+newpoint.attributes.type + " "+ newpoint.attributes._id);
                    return;
                }

                var marker = L.marker([lat,lng],{
                    model:newpoint
                });
                // empty bind need so that event listeners is tuned in
                marker.bindPopup("");
                marker.addTo(this.lmap);
                console.log("added marker "+ newpoint.get("_id") + " " + newpoint.get("label"));
                this.markerViews.push(marker);


            },this));

            this.mapModel.on('markers:remove', function(removedPoint) {

                // todo remove markers :)

                return;
                // map the model remove to a Marker remove
                var targetView = self.pointsToMarkers[removedPoint.cid];
                targetView.remove();
                delete self.pointsToViews[removedPoint.cid];
            });

            this.mapModel.on('markers:reset', function(newPoints) {

                alert("reset todo")

            });*/

        },
        close: function(){
            if (this.beforeClose) { this.beforeClose(); }

            console.log("close mapview override")
            /*
            this.remove();

            if (this.onClose) { this.onClose(); }
            this.trigger('close');
            this.unbindAll();
            this.unbind();*/
        },
        render: function() {},
        onRendered: function () {
            console.log("resizing map");
            this.lmap.invalidateSize();
        }

    });
});