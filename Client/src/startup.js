
require.config({
    baseUrl:'/client/src',
    paths: {
        // JavaScript folders
        /* . . . */

        // Libraries

        jquery: "lib/jquery-1.7.2.min",
        underscore: "lib/underscore-min",
        text: 'lib/text',
        marionette: 'lib/Backbone-Marionette',
        backbone: "lib/backbone-min",
        router:   "js/router",
        utils:     "js/utils"

//        HeaderView :    "js/views/header"


    },
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: 'jquery'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        marionette:{
            deps: ["underscore", "jquery", "backbone"],
            exports: "marionette"
        },
        router:{
            deps: ["underscore", "jquery", "backbone"],
            exports: "router"
        }



    }


});

require([
    "jquery",
    "underscore",
    "backbone",
    "marionette",
    "js/router",
    "lib/bootstrap",
    "js/memorystore",
    "js/config",
    "js/utils",

    "js/models/spotModels",
    "js/models/userModels",
    "js/models/homeActionModel",
    "js/models/optionModel",
    "js/models/mapModels",
    "js/views/Common/NavigationMixin",
    "js/views/Common/MarionettOverrides",
    "js/views/Navi/header",
    "js/views/Home/home",
    "js/views/userlist",
    "js/views/Map/mapView",
    "js/views/Map/spotMarkerView",
    "js/views/Spot/SpotEditView",
    "js/views/Navi/menuView",
    "js/views/about",
    "js/controllers/spotController",
    "js/controllers/mapController",
    "js/config",
    ], function(util) {




    forge.logging.log("require.js setup complete");
    window.spotController = new SpotController();
    window.mapController = new MapController();
    app = new AppRouter();
    Backbone.history.start();
    forge.logging.log("backbone started..");


});



var app;

if (window.forge == null){
    window.forge = {};
    window.forge.logging = {
        log:function(msg){
            console.log(msg);
        }
    }
}
else {
    forge.enableDebug();
}




