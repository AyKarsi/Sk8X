describe("MapController: loading views", function() {

    var spotCollection;

    beforeEach(function() {
        /*
        spotCollection = new SpotCollection();
        spotCollection.fetch({success: function(){
            console.log("spot collection loaded data");
        }},this);

        waitsFor(function(){
            return spotCollection.models.length > 0;
        },  "Could not load spot data",1500)
        */
    });
    it("a map can be loaded", function() {

        var callback = jasmine.createSpy();

        mapController.showMap(callback);

        waitsFor(function(){
            return callback.callCount > 0;
        })

        runs(function(){
            expect(callback).toHaveBeenCalled();
            var view = callback.argsForCall[0][0];
            expect(view).toNotEqual(null);
            expect(view.el).toNotEqual(null);
            expect(view.model).toNotEqual(null);
            expect(view.model.markers).toNotEqual(null);
        });

    });

    it("map options can be loaded", function() {

        var callback = jasmine.createSpy();

        mapController.mapOptions(1,2,callback);

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

});
