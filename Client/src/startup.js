require.config({
    paths: {
        // JavaScript folders
        /* . . . */

        // Libraries
        jquery: "lib/jquery-1.7.2.min",
        underscore: "lib/underscore-min",
        backbone: "lib/backbone-min",
        router:   "js/router"


    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
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
    "router",
    "lib/bootstrap.js",
    "js/memorystore.js",
    "js/config.js",
    "js/utils.js",
    "js/models/spotModels",
    "js/models/userModels",
    "js/models/homeActionModel",
    "js/models/optionModel",
    "js/models/mapModels",
    "js/views/header",
    "js/views/home",
    "js/views/userlist",
    "js/views/mapView",
    "js/views/SpotEditView",
    "js/views/options",
    "js/views/about"
    ], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".

    forge.logging.log("require.js setup complete");
    debugger;
    utils.loadTemplate(['HeaderView','HomeView','HomeActionView','MapView','OptionsView','OptionItemView','SpotEditView','UserListView','UserListItemView','AboutView'], function() {
        forge.logging.log("templates loaded. starting router..");
        debugger;
        app = new AppRouter();
        Backbone.history.start();
        forge.logging.log("backbone started..");
    });
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



