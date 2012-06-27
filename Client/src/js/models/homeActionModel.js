var HomeAction = Backbone.Model.extend({

    initialize: function (attributes) {
    },
    defaults: {
        actionHref: '#home',
        actionText: 'Home',
        actionIcon: 'icon-home'

    }
});

var HomeActionCollection = Backbone.Collection.extend({
    model: HomeAction

});
