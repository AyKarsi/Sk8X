define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!js/views/Home/HomeView.html',
    'text!js/views/Home/HomeActionView.html'

], function ($,_,Backbone,Marionette,htmlBody, htmlAction) {


    window.HomeView = Marionette.View.extend({
        //el: '.container-fluid',
        initialize: function () {
            this.elId = "homeView";
            //var compiledTemplate = _.template(htmlBody);
            this.el = $(htmlBody);

            //Backbone.View.prototype.constructor.apply(this, arguments);
            this.bindTo(this, "show", this.onShowCalled, this);
        },
        render: function () {

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
                var itemHtml = new HomeActionView({model: action}).render().el;
                $('.row', this.el).append(itemHtml);
            },this);
            return this;
        }

    });
    _.extend(HomeView.prototype, NavigationMixin);


    window.HomeActionView = Backbone.View.extend({

        initialize: function () {
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.close, this);
        },

        render: function () {
            var compiledTemplate = _.template(htmlAction);
            this.el  = compiledTemplate(this.model.toJSON());
            return this;
        }
});
});

