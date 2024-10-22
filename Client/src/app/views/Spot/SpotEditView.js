define([
    'jquery',
    'underscore',
    'marionette',
    'backbone',
    'text!app/views/Spot/SpotEditView.html'
], function ($,_,Backbone,Marionette,htmlBody) {

    window.SpotEditView= Marionette.View.extend({

        initialize: function () {

            var viewModel = this.model.toJSON();
            // build the feature checklist
            var features = [];
            _.each(spotController.featureList, _.bind(function(featureDef){
                var featureViewCheckbox = {name:featureDef,checked:""};

                if (_.any(this.model.get("features"),function(a){
                    return a==featureDef;
                })){
                    featureViewCheckbox.checked = "checked";
                }
                features.push(featureViewCheckbox);
            },this));
            viewModel.features = features;

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
            console.log("changing " + event.target);
            utils.hideAlert();

            // Apply the change to the model
            var target = event.target;
            var change = {};
            change[target.name] = target.value;
            this.model.set(change);

            // Run validation rule (if any) on changed item
            var check = this.model.validateItem(target.id);
            if (check.isValid === false) {
                utils.addValidationError(target.id, check.message);
            } else {
                utils.removeValidationError(target.id);
            }
        },

        cancel : function() {
            //mapController.showMap();
            //app.navigate('/map');
        },

        // used mainly for testing
        saveCallback : null,
        beforeSave: function (callback) {
            var features = $(this.el).find("input.feature");
            var hasFeatures;


            var selectedFeatures = [];
            _.each(features, _.bind(function(item){
                if ($(item).attr("checked")){
                    selectedFeatures.push($(item).attr("value"));
                }
            },this));


            this.model.set("features", selectedFeatures);
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
    _.extend(SpotEditView.prototype, NavigationMixin);
});