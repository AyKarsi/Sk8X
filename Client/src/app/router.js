define([
    'jquery',
    'backbone',
    'marionette'

], function ($,Backbone,Marionette) {

window.AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "map"               : "map",
        "map/:markerId"      : "map",
        "addspot/:lat/:lng" : "addspot",
        "editspot/:_id"     : "editspot",
        "mapoptions/:lat/:lng" : "mapoptions",
        "spotoptions/:id"   : "spotoptions",
        "users/page/:page"	: "list",
        "register"          : "register",
        "login"             : "login",
        "users/add"         : "addWine",
        "users/:id"         : "wineDetails",
        "about"             : "about"
    },

    mapView :null,

    initialize: function () {

        this.mainRegion = new Backbone.Marionette.Region({
            el: ".container-fluid"
        });

        forge.logging.log("init from router..");
        this.headerView = new HeaderView();

        $('.header').html(this.headerView.el);


        this.bind('all', function (trigger, args) {
            var routeData = trigger.split(":");

            if (routeData[0] === "route") {

                console.log("routing ->" + routeData[1]);
                // do whatever here.
                // routeData[1] will have the route name
            }
        });

    },


    home: function () {
        this.homeView= new HomeView();
        this.mainRegion.show(this.homeView);

    },

    register: function(lat,lng)
    {
        authController.register(_.bind(function(view) {
            this.mainRegion.show(view);
        },this));
    },
    login: function(lat,lng)
    {
        authController.login(_.bind(function(view) {
            this.mainRegion.show(view);
        },this));
    },


    addspot: function(lat,lng)
    {
        spotController.addSpot(lat,lng, _.bind(function(view) {
            this.mainRegion.show(view);
        },this));
    },
    editspot :function(_id){
        spotController.editSpot(_id, _.bind(function(view) {
            this.mainRegion.show(view);
        },this));
    },

    spotoptions: function(id){

        spotController.spotOptions(id, _.bind(function(view) {
            this.mainRegion.show(view);
        },this));
    },
	list: function(page) {

        if (!this.navigatePage({id:'userListView'}))
            return;

        var p = page ? parseInt(page, 10) : 1;
        var userList = new UserCollection();
        userList.fetch({success: function(){
            new UserListView({model: userList, page: p});
        }},this);
        this.headerView.selectMenuItem('home-menu');
    },
    mapoptions: function(lat,lng) {
        mapController.mapOptions(lat,lng,_.bind(function(view) {
            this.mainRegion.show(view);
        },this));
    },

    map: function(markerId) {
        mapController.showMap(_.bind(function(view) {
            this.mainRegion.show(view);
            this.headerView.selectMenuItem('home-menu');

            if (markerId)
                mapController.openMarkerPopup(markerId);

        },this));
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