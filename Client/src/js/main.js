var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "list",
        "map"               : "map",
        "addspot/:lat/:lng"  : "addspot",
        "editspot/:_id"     : "editspot",
        "mapoptions"        : "mapOptions",
        "mapoptions/:action": "action",
        "users/page/:page"	: "list",
        "users/add"         : "addWine",
        "users/:id"         : "wineDetails",
        "about"             : "about"
    },

    mapView :null,

    initialize: function () {

        forge.logging.log("init from router..");

        this.headerView = new HeaderView();
        forge.logging.log("headerView " );
        $('.header').html(this.headerView.el);

        var point = new MapMarker({
            lat: 48.123447013691425,
            lng: 11.572508388082952
        });

        this.mapModel = new MapModel({
            center: point,
            zoomLevel:17
        });
        //debugger;
        this.mapView = new MapView({model: this.mapModel });
        forge.logging.log("end init from router..");
        this.navigatePage("#map");

    },
    navigatePage: function(id){
        $(".row.page").hide();
        if ($("#"+id).length > 0) {
            $("#"+id).show();
            return false;
        }
        //$("#content").append(el);
        return true;

    },
    action:function(action){
        switch(action){
            case "addspot":
                this.addSpot();
                break;
            default:
                alert("action not implemented :" + action);
        }
        return;

    },
    addspot: function(lat,lng)
    {

        var model = new Spot({
            pos:[lat,lng]
        });

        model.set('_id', model.cid);
        $("#spotEditView").remove();
        $("#content").append(new SpotEditView({model: model}).el);
        this.navigatePage('spotEditView');
    },
    editspot :function(_id){

        var model = new Spot({_id: _id});
        model.fetch({
            success:_.bind(function() {
                $("#spotEditView").remove();
                $("#content").append(new SpotEditView({model: model}).el);
                this.navigatePage('spotEditView');
            },this),
            error :function() {
                alert("error");
            }
        });


    },
	list: function(page) {


        if (!this.navigatePage('userListView'))
            return;
        //var view = new UserListView();

        var p = page ? parseInt(page, 10) : 1;
        var userList = new UserCollection();
        userList.fetch({success: function(){
            $("#content").html(new UserListView({model: userList, page: p}).el);
        }},this);
        this.headerView.selectMenuItem('home-menu');
    },



    mapOptions: function() {
        if (!this.navigatePage('mapOptionsView'))
            return;
        this.optionsList = new MapOptionCollection();
        this.optionsList.fetch({success:_.bind(function(){
            $("#content").append(new MapOptionsView({model:this.optionsList}).el);

        },this)});



    },

    map: function() {

        if (!this.navigatePage('mapView')){
            //this.mapView.gmap.checkResize();
            google.maps.event.trigger(this.mapView.gmap, "resize");
            this.mapView.gmap.setZoom(this.mapView.gmap.getZoom());
            return;
        }


        $("#content").append(this.mapView.el);

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

        this.headerView.selectMenuItem('home-menu');
    },




    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});
var app;
$(document).ready(function(){
    forge.logging.log("document ready..");
    utils.loadTemplate(['HeaderView','MapView','MapOptionsView','MapOptionItemView','SpotEditView','UserListView','UserListItemView','AboutView'], function() {
        forge.logging.log("views loaded starting backbone..");
        app = new AppRouter();
        Backbone.history.start();
        forge.logging.log("backbone started..");
    });
});
