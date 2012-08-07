define([
    'backbone'
], function ($) {

    window.Feature = Backbone.Model.extend({

        url: config.apiUrl+"api/feature",


        initialize: function (attributes) {
            this.validators = {};
            this.id = attributes['_id'];
            this.url = config.apiUrl+"api/user/"+this.id;

        },
        defaults: {
            _id: null,
            name: "empty",
            title :"empty"
        },
        // override for merse rest api
        parse: function(models) {
            return models;
        }
    });

    window.FeatureCollection = Backbone.Collection.extend({

        model: Feature,
        url: config.apiUrl+"api/feature",

        // override for merse rest api
        parse: function(models) {

            return models.payload;
        }


    });
});
