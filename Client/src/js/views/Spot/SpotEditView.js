define([
    'jquery',
    'underscore',
    'marionette',
    'backbone',
    'text!js/views/Spot/SpotEditView.html'
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

        },

        render: function () {


            return this;
        },

        events: {
            "change"        : "change",
            "click .save"   : "beforeSave",
            "click .delete" : "delete",
            "drop #picture" : "dropHandler"
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
            var check = this.model.validateItem(target.id);
            if (check.isValid === false) {
                utils.addValidationError(target.id, check.message);
            } else {
                utils.removeValidationError(target.id);
            }
        },

        beforeSave: function () {

            var features = $(this.el).find("input.feature");
            var hasFeatures;
            var selectedFeatures = [];
            _.each(features, _.bind(function(item){
                if ($(item).attr("checked")){
                    selectedFeatures.push($(item).attr("value"));
                }
            },this));


            this.model.set("features", selectedFeatures);
            this.save();
        },

        save: function () {
            var self = this;
            this.model.save(null, {
                success:_.bind(function (model) {
                    mapController.addUpdateMarker(model);
                },this),
                error: function () {
                    utils.showAlert('Error', 'An error occurred while trying to save this item', 'alert-error');
                }
            });
        },

        delete: function () {

            this.model.destroy({
                success: function () {
                    alert('Wine deleted successfully');
                    window.history.back();
                }
            });
            return false;
        },

        dropHandler: function (event) {
            event.stopPropagation();
            event.preventDefault();
            var e = event.originalEvent;
            e.dataTransfer.dropEffect = 'copy';
            this.pictureFile = e.dataTransfer.files[0];

            // Read the image file from the local file system and display it in the img tag
            var reader = new FileReader();
            reader.onloadend = function () {
                $('#picture').attr('src', reader.result);
            };
            reader.readAsDataURL(this.pictureFile);
        }

    });
    _.extend(SpotEditView.prototype, NavigationMixin);
});