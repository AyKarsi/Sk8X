describe("MapController: loading views", function() {

    var spotCollection;

    beforeEach(function() {
        var callback = jasmine.createSpy();

        mapController.loadMarkerData(callback);

        waitsFor(function(){
            return callback.callCount > 0;
        });

        runs(function(){
            expect(callback).toHaveBeenCalled();
            expect(mapController.mapModel.markers.length>0).toEqual(true);
        });
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

    it("marker data can be loaded", function() {

        var callback = jasmine.createSpy();

        mapController.loadMarkerData(callback);

        waitsFor(function(){
            return callback.callCount > 0;
        });

        runs(function(){
            expect(callback).toHaveBeenCalled();
            expect(mapController.mapModel.markers.length>0).toEqual(true);
        });
    });


    it("a map marker can be opened", function() {

        var marker = mapController.mapModel.markers.models[0];
        var marker = mapController.openMarkerPopup(marker.get("_id"));
        expect(marker).toNotEqual(null);


    });


});
