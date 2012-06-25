var MapOption = Backbone.Model.extend({
    urlRoot: "api/options",
    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };
    },
    defaults: {
        _id: null

    }

});

var MapOptionCollection= Backbone.Collection.extend({

    model: MapOption,
    url: "api/options"

});