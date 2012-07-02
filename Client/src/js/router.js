define([
    'jquery',
    'backbone'

], function ($) {

window.AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "map"               : "map",
        "addspot/:lat/:lng" : "addspot",
        "editspot/:_id"     : "editspot",
        "mapoptions/:lat/:lng" : "mapoptions",
        //"mapoptions/:action": "action",
        "users/page/:page"	: "list",
        "users/add"         : "addWine",
        "users/:id"         : "wineDetails",
        "about"             : "about"
    },

    mapView :null,

    initialize: function () {

        forge.logging.log("init from router..");
        debugger;
        this.headerView = new HeaderView();

        $('.header').html(this.headerView.el);

        var point = new MapMarker({
            lat: 48.123447013691425,
            lng: 11.572508388082952
        });

        this.mapModel = new MapModel({
            center: point,
            zoomLevel:17
        });

        this.bind('all', function (trigger, args) {
            var routeData = trigger.split(":");

            if (routeData[0] === "route") {

                console.log("routing");
                // do whatever here.
                // routeData[1] will have the route name
            }
        });



        //debugger;
        //this.mapView = new MapView({model: this.mapModel });
        //this.navigatePage("#map");
    },
    //
    // retutrns false if the current page can be reused..
    navigatePage: function(opts){

        $(".row-fluid,row").slideDown('slow',function() {
            $(this).remove();
            //if ($(this).hasClass("useOnce"))

            //else
              //  $(this).hide();
        });

        $(".row-fluid,row").promise().done(function(){
            if ($("#"+opts.id).length > 0) {
                $("#"+opts.id).show();
                //$("#"+opts.id).slideUp();

                return false;
            }
        });
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
    home: function () {
        if (!this.navigatePage({id:'homeView'}))
            return;
        this.homeView= new HomeView();

    },

    addspot: function(lat,lng)
    {
        if (!this.navigatePage({id:'spotEditView',deleteExisting:true}))
            return;
        var model = new Spot({
            pos:[lat,lng]
        });
        model.set('_id', model.cid);
        new SpotEditView({model: model});
    },
    editspot :function(_id){
        this.navigatePage({id:'spotEditView'});
        var model = new Spot({_id: _id});
        model.fetch({
            success:_.bind(function() {
                new SpotEditView({model: model});

            },this),
            error :function() {
                alert("error");
            }
        });


    },
	list: function(page) {


        if (!this.navigatePage({id:'userListView'}))
            return;
        //var view = new UserListView();

        var p = page ? parseInt(page, 10) : 1;
        var userList = new UserCollection();
        userList.fetch({success: function(){
            new UserListView({model: userList, page: p});
        }},this);
        this.headerView.selectMenuItem('home-menu');
    },



    mapoptions: function(lat,lng) {
        if (!this.navigatePage({id:'mapOptionsView'}))
            return;
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


        new OptionsView({model:optionsList});





    },

    map: function() {
        if (!this.navigatePage({id:'mapView',deleteExisting:false})){
            google.maps.event.trigger(this.mapView.gmap, "resize");
            return;
        }

        this.mapView = new MapView({model: this.mapModel });
        //$("#container-fluid").append(this.mapView.el);

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

        google.maps.event.trigger(this.mapView.gmap, "resize");
    },




    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content-fluid').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});
    return AppRouter;
});