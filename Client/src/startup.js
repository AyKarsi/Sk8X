require.config({
    baseUrl:'/client/lib',
    paths: {
        // JavaScript folders
        /* . . . */

        // Libraries

        jquery: "jquery-1.7.2.min",
        underscore: "underscore-min",
        //text: 'lib/text',
        backbone: "backbone-min",
        router:   "../js/router",
        utils:     "../js/utils"

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
    "/client/js/memorystore.js",
    "/client/js/config.js",
    "/client/js/utils.js",

    "/client/js/models/spotModels.js",
    "/client/js/models/userModels.js",
    "/client/js/models/homeActionModel.js",
    "/client/js/models/optionModel.js",
    "/client/js/models/mapModels.js",
    "/client/js/views/header.js",
    "/client/js/views/home.js",
    "/client/js/views/userlist.js",
    "/client/js/views/mapView.js",
    "/client/js/views/SpotEditView.js",
    "/client/js/views/options.js",
    "/client/js/views/about.js"
    ], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".

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



