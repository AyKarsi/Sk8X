define([
    'jquery',
    'underscore',
    'backbone'
], function ($,_,Backbone) {

    window.MapController = function()
    {

        var point = new MapMarker({
            lat: 48.123447013691425,
            lng: 11.572508388082952
        });
        this.mapModel = new MapModel({
            center: point,
            zoomLevel:17
        });

        this.showMap =function(callback){

            var isNew = false;
            if(this.mapView == null){
                this.mapView = new MapView({model: this.mapModel });
                isNew = true;
            }

            if (!isNew)
            {
                callback(this.mapView);
                return;
            }

            this.userList = new UserCollection();
            this.userList.fetch({success:_.bind(function(){
                var userPoints = this.userList.getPoints();
                this.mapModel.markers.add(userPoints);
            },this)});

            this.spotList = new SpotCollection();
            this.spotList.fetch({success:_.bind(function(){
                var spotPoints = this.spotList.getPoints();
                this.mapModel.markers.add(spotPoints);
            },this)});

            google.maps.event.trigger(this.mapView.gmap, "resize");

            callback(this.mapView);


        }

        this.mapOptions = function(lat, lng,callback){
            var optionsList = new OptionCollection();

            optionsList.add(new Option({
                href:"#addspot/"+lat+"/"+lng,
                text:"Add Spot here",
                icon:'icon-map-marker'
            }));

            optionsList.add(new Option({
                href:"#setmypos/"+lat+"/"+lng,
                text:"Set My Position",
                icon:'icon-map-marker'
            }));

            var menuView = new MenuView({model:optionsList});
            callback(menuView);

        };

        this.addUpdateMarker = function (model){
            var point = model.toMarker();
            this.mapView.model.markers.add(point);
            this.mapView.openInfo(point);
            app.navigate('map', true);

        };


    };

});

