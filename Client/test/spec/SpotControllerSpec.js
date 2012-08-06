describe("SpotController: loading views", function() {

    var spotCollection;

    beforeEach(function() {
        this.resultView = null;

        spotController.init();

        waitsFor(function(){
            return spotController.loading == false;
        },  "Could not load spot data",1500)

    });
    it("a new spot view can be loaded and has a empty model", function() {

        var callback = jasmine.createSpy();
        var pos = {lat:10,lng:12};
        spotController.addSpot(pos.lat, pos.lng,callback);

        waitsFor(function(){
            return callback.callCount > 0;
        })

        runs(function(){
            expect(callback).toHaveBeenCalled();
            var view = callback.argsForCall[0][0];
            expect(view).toNotEqual(null);
            expect(view.el).toNotEqual(null);
            expect(view.model).toNotEqual(null);
            var newpos = view.model.get("pos");

            expect(newpos[0]).toEqual(pos.lat);
            expect(newpos[1]).toEqual(pos.lng);
        });

    });
    it("a spot edit view can be loaded and has a model", function() {

        var spot = spotController.spotCollection.models[0];
        var callback = jasmine.createSpy();
        spotController.editSpot(spot.id, callback);

        waitsFor(function(){
            return callback.callCount > 0;
        });

        runs(function(){
           expect(callback).toHaveBeenCalled();
           var view = callback.argsForCall[0][0];
           expect(view).toNotEqual(null);
           expect(view.el).toNotEqual(null);
           expect(view.model).toNotEqual(null);
           expect(view.model.id).toEqual(spot.id);
        });

    });
    it("spot options can be loaded", function() {

        var spot = spotController.spotCollection.models[0];
        var callback = jasmine.createSpy();
        spotController.spotOptions(spot.id, callback);

        waitsFor(function(){
            return callback.callCount > 0;
        })

        runs(function(){
            expect(callback).toHaveBeenCalled();
            var view = callback.argsForCall[0][0];
            expect(view).toNotEqual(null);
            expect(view.el).toNotEqual(null);
            expect(view.model).toNotEqual(null);
            expect(view.model.length > 0).toEqual(true);
        });

    });


    it("a spot can be edited", function() {

        var spot = spotController.spotCollection.models[spotController.spotCollection.length-1];
        var callback = jasmine.createSpy();
        spotController.editSpot(spot.id, callback);

        waitsFor(function(){
            return callback.callCount > 0;
        })

        runs(function(){
            expect(callback).toHaveBeenCalled();
            var view = callback.argsForCall[0][0];
            expect(view).toNotEqual(null);
            expect(view.el).toNotEqual(null);
            expect(view.model).toNotEqual(null);
            expect(view.model.id).toEqual(spot.id);

            var testLabel = "testlabel" + new Date().getTime();
            $(view.el).find("input[name='label']").val(testLabel);
            debugger;
            expect($(view.el).find("input[name='label']").val()).toEqual(testLabel);
            var spotCountPre = spotController.spotCollection.length;
            view.saveCallback = jasmine.createSpy();

            // manaullay set the model (click event does not cause the model to be updated
            view.model.set("label",testLabel);

            $(view.el).find(".save").trigger('click');
            //view.beforeSave(saveCallback);
            waitsFor(function(){
                return view.saveCallback.callCount > 0;
            });
            runs(function(){
                expect(view.model.get("label")).toEqual(testLabel);

                expect(spotController.spotCollection.length).toEqual(spotCountPre);

                var updatedSpotModel = spotController.spotCollection.get(spot.id);
                debugger;
                expect(updatedSpotModel).toNotEqual(null);
                expect(updatedSpotModel.get("label")).toEqual(testLabel);

            });


        });

    });

});
