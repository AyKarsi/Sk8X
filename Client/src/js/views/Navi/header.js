define([
    'jquery',
    'underscore',
    'backbone',
    'text!js/views/Navi/HeaderView.html'
], function ($,_,Backbone,html) {
    window.HeaderView = Backbone.View.extend({

        initialize: function () {
            this.render();
        },
        render: function () {

            var compiledTemplate = _.template(html);
            $(this.el).html(compiledTemplate);
            return this;
        },

        selectMenuItem: function (menuItem) {
            $('.nav li').removeClass('active');
            if (menuItem) {
                $('.' + menuItem).addClass('active');
            }
        }
    });
});