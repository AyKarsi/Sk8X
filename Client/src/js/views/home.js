define([
    'jquery',
    'backbone'


], function ($) {
window.HomeView = Backbone.View.extend({
    el: '.container-fluid',
    initialize: function () {
        this.render();
    },

    render: function () {
        //this.el = $(this.el).append("<div class='row-fluid useOnce' id='homeView' ></div>");
        $(this.el).append(this.template());



        var actions = new HomeActionCollection();
        actions.add(new HomeAction({
            actionHref:"#map",
            actionText:"Map",
            icon:"icon-globe"
        }));
        actions.add(new HomeAction({
            actionHref:"#myspots",
            actionText:"My Spots",
            icon:"icon-map-marker"
        }));
        actions.add(new HomeAction({
            actionHref:"#settings",
            actionText:"Settings",
            icon:"icon-cog"
        }));
        actions.add(new HomeAction({
            actionHref:"#mycrew",
            actionText:"My Crew",
            icon:"icon-flag"
        }));
        actions.add(new HomeAction({
            actionHref:"#messages",
            actionText:"Messages",
            icon:"icon-envelope"
        }));
        actions.add(new HomeAction({
            actionHref:"#logout",
            actionText:"Logout",
            icon:"icon-off"
        }));


        actions.each(function(action){
            $('.row', this.el).append(new HomeActionView({model: action}).render().el);
        });
        return this;
    },

    selectMenuItem: function (menuItem) {
        $('.nav li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }
});

window.HomeActionView = Backbone.View.extend({

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});
});