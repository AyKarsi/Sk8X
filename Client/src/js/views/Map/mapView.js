
define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!js/views/Map/MapView.html'
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


            this.lmap.on("popupopen",function(e){
                var model = e.popup._source.options.model;
                var modelType = model.get('type');
                if (modelType == 'Spot'){

                    var markerView = new SpotMarkerView({model:model});
                    markerView.render();
                    e.popup.setContent(markerView.el);
                }
                else {
                    e.popup.setContent(model.get("typeData").get("label"));
                }

            });

            this.lmap.on("click",function(e){
                app.navigate("mapoptions/"+e.latLng+"/"+ e.latLng,{trigger:true});
            });

            var self = this;
            this.mapModel.on('markers:add', function(newpoint) {
                var marker = L.marker([newpoint.get("lat"),  newpoint.get("lng")],{
                    model:newpoint
                });

                // empty bind need so that event listeners is tuned in
                marker.bindPopup("");
                marker.addTo(self.lmap);
            });

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

            });

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