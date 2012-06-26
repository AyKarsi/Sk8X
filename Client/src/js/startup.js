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



$(document).ready(function(){
    forge.logging.log("document ready call from main.. ..");
    utils.loadTemplate(['HeaderView','MapView','MapOptionsView','MapOptionItemView','SpotEditView','UserListView','UserListItemView','AboutView'], function() {

        app = new AppRouter();
        Backbone.history.start();
        forge.logging.log("backbone started..");
    });
});
