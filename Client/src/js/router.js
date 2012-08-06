define([
    'jquery',
    'backbone',
    'marionette'

], function ($,Backbone,Marionette) {

window.AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "map"               : "map",
        "addspot/:lat/:lng" : "addspot",
        "editspot/:_id"     : "editspot",
        "mapoptions/:lat/:lng" : "mapoptions",
        "spotoptions/:id"   : "spotoptions",
        "users/page/:page"	: "list",
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
    //
    // retutrns false if the current page can be reused..
  /*  navigatePage: function(opts){

        console.log("navigatePage");
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

    },*/

    home: function () {
        this.homeView= new HomeView();
        this.mainRegion.show(this.homeView);

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

    map: function() {
        mapController.showMap(_.bind(function(view) {
            this.mainRegion.show(view);
            this.headerView.selectMenuItem('home-menu');
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