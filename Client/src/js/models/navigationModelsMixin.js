

BaseView = Backbone.View.extend({
    constructor: function(){
        Backbone.View.prototype.constructor.apply(this, arguments);
        this.bindTo(this, "onShow", this.onShowCalled, this);
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

/*
App.Mixins.Navigation = {

    constructor: function(){
        Backbone.View.prototype.constructor.apply(this, arguments);
        this.bindTo(this, "onShow", this.onShowCalled, this);
    },

    close: function(){
        this.remove();
        this.unbind();
    },

    onShow: function(){
        $(this.el).show(500);
    }

};*/

RegionManager = (function (Backbone, $) {
    var currentView;
    var el = "#mainregion";
    var region = {};

    var closeView = function (view) {
        if (view && view.close) {
            view.close();
        }
    };

    var openView = function (view) {
        view.render();
        $(el).html(view.el);
        if (view.onShow) {
            view.onShow();
        }
    };

    region.show = function (view) {
        closeView(currentView);
        currentView = view;
        openView(currentView);
    };

    return region;
})(Backbone, jQuery);