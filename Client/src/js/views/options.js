define([
    'backbone'
], function ($) {

window.OptionsView = Backbone.View.extend({
    el: '.container-fluid',
    model: null,
    initialize: function () {
        if (this.model == null){
            alert("no model given");
            return;
        }
        this.render();
    },

    render: function () {

        $(this.el).append(this.template());
        this.model.each(function(option){
            $('.row', this.el).append(new OptionItemView({model: option}).render().el);
        });
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
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});
});