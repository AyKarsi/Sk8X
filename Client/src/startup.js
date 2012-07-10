require.config({
    //baseUrl:'/client/lib',
    paths: {
        // JavaScript folders
        /* . . . */

        // Libraries

        jquery: "lib/jquery-1.7.2.min",
        underscore: "lib/underscore-min",
        text: 'lib/text',
        marionette: 'lib/Backbone.Marionette',
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
            exports: "Backbone"
        },
        router:{
            deps: ["underscore", "jquery", "backbone"],
            exports: "Backbone"
        }



    }


});

require([
    "jquery",
    "underscore",
    "backbone",
    "lib/Backbone.Marionette.js",
    "js/router",
    "lib/bootstrap.js",
    "js/memorystore.js",
    "js/config.js",
    "js/utils.js",

    "js/models/spotModels.js",
    "js/models/userModels.js",
    "js/models/homeActionModel.js",
    "js/models/optionModel.js",
    "js/models/mapModels.js",
    "js/views/Common/NavigationMixin.js",
    "js/views/Common/MarionettOverrides.js",
    "js/views/Navi/header.js",
    "js/views/Home/home.js",
    "js/views/userlist.js",
    "js/views/Map/mapView.js",
    "js/views/Spot/SpotEditView.js",
    "js/views/Navi/mapOptionsView.js",
    "js/views/about.js"
    ], function(util) {




    forge.logging.log("require.js setup complete");

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



