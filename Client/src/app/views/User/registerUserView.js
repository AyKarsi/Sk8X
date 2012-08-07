define([
    'jquery',
    'underscore',
    'marionette',
    'backbone',
    'text!app/views/User/Register.html'
], function ($,_,Backbone,Marionette,htmlBody) {

    window.RegisterUserView= Marionette.View.extend({

        initialize: function () {

            var viewModel = this.model.toJSON();
            $(this.el).html( _.template(htmlBody, viewModel));
            this.render();
        },

        render: function () {


            return this;
        },

        events: {
            "change"        : "change",
            "click .save"   : "beforeSave",
            "click .cancel"   : "cancel",
            "click .delete" : "delete"
        },

        change: function (event) {
            // Remove any existing alert message
            console.log("changing " + event.target.name);
            utils.hideAlert();

            // Apply the change to the model
            var target = event.target;
            var change = {};
            change[target.name] = target.value;
            this.model.set(change);

            // Run validation rule (if any) on changed item
            var check = this.model.validateItem(target.name);
            if (check.isValid === false) {
                utils.addValidationError(target.name, check.message);
            } else {
                utils.removeValidationError(target.name);
            }
        },

        cancel : function() {
            //mapController.showMap();
            //app.navigate('/map');
        },

        // used mainly for testing
        saveCallback : null,

        beforeSave: function (callback) {
            this.save(callback);
        },
        save: function (callback) {
            var self = this;

            if (this.model.isNew())
                spotController.spotCollection.add(this.model);

            this.model.save(null, {
                success:_.bind(function (model, b,c) {
                    app.navigate("map/"+model.get("_id"),true);
                    if (this.saveCallback)
                        this.saveCallback();
                    //mapController.openMarkerPopup(model.get("_id"));
                },this),
                error: function () {
                    utils.showAlert('Error', 'An error occurred while trying to save this item', 'alert-error');
                }
            });
        },
        delete: function () {
            alert("todo");
            this.model.destroy({
                success: function () {
                    window.history.back();
                }
            });
            return false;
        }
    });

});