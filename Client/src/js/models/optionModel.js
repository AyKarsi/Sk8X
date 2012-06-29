define([
    'backbone'
], function ($) {

window.Option = Backbone.Model.extend({

    defaults: {
        href:'#',
        text:'',
        icdon:''


    }

});

window.OptionCollection= Backbone.Collection.extend({

    model: Option


});

});