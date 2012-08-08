
require.config({
    baseUrl:'/client/src',
    paths: {
        jquery: "lib/jquery-1.7.2.min",
        underscore: "lib/underscore-min",
        text: 'lib/text',
        marionette: 'lib/Backbone-Marionette',
        backbone: "lib/backbone-min",
        router:   "js/router",
        utils:     "js/utils"
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
    "app/router",
    "lib/bootstrap",
    "app/memorystore",
    "app/config",
    "app/utils",
    "app/models/spotModels",
    "app/models/userModels",
    "app/models/homeActionModel",
    "app/models/optionModel",
    "app/models/mapModels",
    "app/views/Common/NavigationMixin",
    "app/views/Common/MarionettOverrides",
    "app/views/Navi/header",
    "app/views/Home/home",
    "app/views/User/RegisterUserView",
    "app/views/User/LoginUserView",
    "app/views/userlist",
    "app/views/Map/mapView",
    "app/views/Map/spotMarkerView",
    "app/views/Spot/SpotEditView",
    "app/views/Navi/menuView",
    "app/views/about",
    "app/controllers/spotController",
    "app/controllers/mapController",
    "app/controllers/authController",
    "app/config"
    ], function(util) {


    forge.logging.log("require.js setup complete");
    window.authController = new AuthController();
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




