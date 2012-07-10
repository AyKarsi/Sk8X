window.MapOptionsView = Backbone.View.extend({
    //el: $('#mapCanvas'),

    initialize: function(opts) {

        $(this.el).html(this.template());
        var options = this.model.models;
        var len = options.length;

        $(this.el).find(".page").html('<ul class="thumbnails"></ul>');

        for (var i = 0; i < len; i++) {

            $('.thumbnails', this.el).append(new MapOptionItemView({model: options[i]}).render().el);
        }

    },

    render: function() {}
});

window.MapOptionItemView= Backbone.View.extend({

    tagName: "li",

    className: "span3",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});