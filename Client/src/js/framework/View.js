Ska8X.View = Backbone.View.extend({
    constructor: function(){
        Backbone.View.prototype.constructor.apply(this, arguments);
        this.bindTo(this, "onShow", this.onShowCalled, this);
        console.log("in backview constructor");
    },
    onShow: function(){
        $(this.el).show(500);
    },


    // Default `close` implementation, for removing a view from the
    // DOM and unbinding it. Regions will call this method
    // for you. You can specify an `onClose` method in your view to
    // add custom code that is called after the view is closed.
    close: function(){
        if (this.beforeClose) { this.beforeClose(); }

        this.remove();

        if (this.onClose) { this.onClose(); }
        this.trigger('close');
        this.unbindAll();
        this.unbind();
    }


});

// Copy the features of `BindTo`
_.extend(Marionette.View.prototype, Sk8X.BindTo);