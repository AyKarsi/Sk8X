define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!js/views/Map/SpotMarkerView.html'
], function ($,_,Backbone,Marionette, htmlBody) {

    window.SpotMarkerView = Backbone.View.extend({

        initialize: function () {
            var compiledTemplate = _.template(htmlBody, this.model);
        },
        render: function () {


            $(this.el).html(compiledTemplate);
            $(this.el).html("tretetret");
            debugger;
            return this;
        }
    });

});