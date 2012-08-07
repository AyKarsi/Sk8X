define([
    'jquery',
    'underscore',
    'backbone',
    'marionette'
], function ($,_,Backbone,Marionette) {


    Marionette.Region.prototype.open = function(view){
        this.$el.hide();
        this.$el.html(view.el);
        this.$el.animate({height:'show'});

        this.$el.promise().done( _.bind(function() {
            if (view.onRendered != null)
                view.onRendered();
        },this));

}});