define([
    'jquery',
    'underscore',
    'backbone',
    'text!/client/tpl/HomeView.html',
    'text!/client/tpl/HomeActionView.html'

], function ($,_,Backbone,htmlBody, htmlAction) {

    window.HomeView = Backbone.View.extend({
    el: '.container-fluid',
    initialize: function () {
        this.render();
    },

    render: function () {

        var compiledTemplate = _.template(htmlBody);
        $(this.el).append(compiledTemplate);



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
            var compiledTemplate = _.template(htmlAction);
            $(this.el).append(compiledTemplate(this.model.toJSON()));
            //$(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
});
});

