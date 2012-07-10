define([
    'backbone'
], function ($) {

window.HomeAction = Backbone.Model.extend({

    initialize: function (attributes) {
    },
    defaults: {
        actionHref: '#home',
        actionText: 'Home',
        actionIcon: 'icon-home'

    }
});

window.HomeActionCollection = Backbone.Collection.extend({
    model: HomeAction

});

});