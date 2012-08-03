describe("SpotController: loading views", function() {

    var spotCollection;

    beforeEach(function() {
        this.resultView = null;
        spotCollection = new SpotCollection();
        spotCollection.fetch({success: function(){
            console.log("spot collection loaded data");
        }},this);

        waitsFor(function(){
            return spotCollection.models.length > 0;
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

        var spot = spotCollection.models[0];
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

        var spot = spotCollection.models[0];
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

        var spot = spotCollection.models[0];
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
            view.save()
        });

    });

});
