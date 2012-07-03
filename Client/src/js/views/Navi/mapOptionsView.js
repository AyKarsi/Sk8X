define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!js/views/Navi/OptionsView.html',
    'text!js/views/Navi/OptionItemView.html'

], function ($,_,Backbone,Marionette,htmlBody, htmlAction) {
    window.OptionsView = Marionette.View.extend({

        model: null,
        initialize: function () {
            if (this.model == null){
                alert("no model given");
                return;
            }
            this.bindTo(this, "show", this.onShowCalled, this);

        },

        render: function () {

            this.el = $(htmlBody);
            this.model.each(function(option){
                var itemHtml = new OptionItemView({model: option}).render().el;
                $('.row', this.el).append(itemHtml);
            },this);
            return this;
        },

        selectMenuItem: function (menuItem) {
            $('.nav li').removeClass('active');
            if (menuItem) {
                $('.' + menuItem).addClass('active');
            }
        }
    });

    window.OptionItemView = Backbone.View.extend({

        initialize: function () {
            this.model.bind("change", this.render, this);
            this.model.bind("destroy", this.close, this);
        },

        render: function () {
            this.el = _.template(htmlAction, this.model.toJSON());
            return this;
        }
    });
});