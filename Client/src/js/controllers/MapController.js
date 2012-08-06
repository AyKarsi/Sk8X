define([
    'jquery',
    'underscore',
    'backbone'
], function ($,_,Backbone) {

    window.MapController = function()
    {

        // init is called at the end
        this.init = function (){
            this.mapView = new MapView({model: this.mapModel });
            this.loadMarkerData(null);
        };

        var point = new MapMarker({
            lat: 48.123447013691425,
            lng: 11.572508388082952
        });
        this.mapModel = new MapModel({
            center: point,
            zoomLevel:17
        });

        this.showMap =function(callback){

            if (callback != null)
                callback(this.mapView);

        }

        this.loadMarkerData=function(callback)
        {
            this.userList = new UserCollection();
            var markerLoadState = {
                users:false,
                spots:false,
                allLoaded :function() {
                    return this.users && this.spots;
                }
            };
            this.userList.fetch({success:_.bind(function(){
                var userPoints = this.userList.getPoints();
                this.mapModel.markers.add(userPoints);
                markerLoadState.users = true;
                if (markerLoadState.allLoaded() && callback != null)
                    callback();

            },this)});

            this.spotList = new SpotCollection();
            this.spotList.fetch({success:_.bind(function(){
                var spotPoints = this.spotList.getPoints();
                markerLoadState.spots = true;
                if (markerLoadState.allLoaded() && callback != null)
                    callback();
                this.mapModel.markers.add(spotPoints);
            },this)});

        };


        this.openMarkerPopup=function(spotOrUserId){
            var id = spotOrUserId;
            // find the corresponding marker layer
            var result = this.findMarkerView(id);
            if (result != null){
                result.fireEvent("click");
                return result;
            }
        };

        this.findMarkerView = function(id){
            var result = _.find(this.mapView.lmap._layers, _.bind(function(markerView) {
                if (markerView.options == null || markerView.options.model == null)
                    return false;
                return markerView.options.model.attributes._id == id;
            },this));
            return result;
        };


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
            var id = point.get("_id");
            //var result = this.findMarkerModel(model.get("_id"));
            var any = _.any(this.mapView.model.markers, _.bind(function(p,index){
                return p.get("_id") == id;
            },this));

            if (!any)
                this.mapView.model.markers.add(point);
            else
            {

            }

            mapController.openMarkerPopup(point);
            app.navigate('map', true);

        };

        this.init();


    };

});

