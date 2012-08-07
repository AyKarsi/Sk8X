define([
    'jquery',
    'underscore',
    'marionette',
    'backbone',
    'text!app/views/User/LoginUserView.html'
], function ($,_,Backbone,Marionette,htmlBody) {

    window.LoginUserView= Marionette.View.extend({

        initialize: function () {
            var viewModel = this.model.toJSON();
            $(this.el).html( _.template(htmlBody, viewModel));
            this.render();
        },

        render: function () {

            return this;
        },

        events: {
            "click .save"   : "save",
            "change"   : "change"
        },

        change: function (event) {
            // Remove any existing alert message
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

        // used mainly for testing
        saveCallback : null,


        beforeSave: function (callback) {
            this.save(callback);
        },
        save: function (callback) {

            authController.doLogin({
                username:this.model.get("username"),
                password: this.model.get("password"),
                successCallback:_.bind(function(){
                    app.navigate("map");
                },this),
                errorCallback: _.bind(function(){
                    utils.showAlert("Login failed", "Either username or password are not correct");
                },this)
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