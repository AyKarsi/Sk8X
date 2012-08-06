define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!js/views/Map/SpotMarkerView.html'
], function ($,_,Backbone,Marionette, htmlBody) {

    window.SpotMarkerView = Backbone.View.extend({

        initialize: function () {
            var model = this.model.toJSON();
            // todo typdata
            //model.typeData = model.typeData.toJSON();
            model.href = "#spotoptions/"+model._id;
            this.compiledTemplate = _.template(htmlBody, model);
        },
        render: function () {


            $(this.el).html(this.compiledTemplate,this.model);
            //$(this.el).html("tretetret");

            return this;
        }
    });

});