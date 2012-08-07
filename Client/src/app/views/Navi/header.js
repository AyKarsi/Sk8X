define([
    'jquery',
    'underscore',
    'backbone',
    'text!app/views/Navi/HeaderView.html'
], function ($,_,Backbone,html) {
    window.HeaderView = Backbone.View.extend({

        initialize: function () {
            this.render();
        },
        render: function () {

            var compiledTemplate = _.template(html);
            $(this.el).html(compiledTemplate);
            this.toggleLoggedInState();
            return this;
        },
        toggleLoggedInState:function()
        {
            if (authController.isLoggedIn()){
                $(this.el).find(".loggedIn").show();
                $(this.el).find(".loggedOut").hide();
                $(this.el).find("#prefs").html(authController.currentUser.username);
            }
            else {
                $(this.el).find(".loggedIn").hide();
                $(this.el).find(".loggedOut").show();
                $(this.el).find("#prefs").html("");
            }

        },
        selectMenuItem: function (menuItem) {
            $('.nav li').removeClass('active');
            if (menuItem) {
                $('.' + menuItem).addClass('active');
            }
        }
    });
});