describe("SpotModel", function() {

    var spot;
    var spotCollection;

    beforeEach(function() {
        spotCollection = new SpotCollection();
    });

    it("spot collection should be empty", function() {

        expect(spotCollection.models.length).toEqual(0);
    });


    it("a new spot should have no features", function() {
        var spot = new Spot();
        expect(spot.get("features").length).toEqual(0);
    });




    it("should now contain one spot", function() {
        var spot = new Spot({
            _id: "23423234234",
            label: 'PleaseSet',
            pos : [],
            spotType:'', // spot or parc
            description:'',
            features:[]
        });
        spotCollection.add(spot);
        expect(spotCollection.models.length).toEqual(1);
    });




    it("should not be possible to add the same spot twice", function() {
        var spot = new Spot({
            _id: "23423234234",
            label: 'PleaseSet',
            pos : [],
            spotType:'', // spot or parc
            description:'',
            features:[]
        });
        spotCollection.add(spot);

        var spot2 = new Spot({
            _id: "23423234234",
            label: 'PleaseSet',
            pos : [],
            spotType:'', // spot or parc
            description:'',
            features:[]
        });
        spotCollection.add(spot2);

        expect(spotCollection.models.length).toEqual(1);
    });

});

describe("SpotModel loading data", function() {


    var spotCollection;

    beforeEach(function() {
        spotCollection = new SpotCollection();
        spotCollection.fetch({success: function(){
            console.log("spot collection loaded data");
        }},this);

        waitsFor(function(){
            return spotCollection.models.length > 0;
        },  "Could not load spot data",500)

    });

    it("spots can be loaded from the store", function() {
        expect(spotCollection.models.length).toBeGreaterThan(1);
    });

    it("a spot can be found by its id", function() {

        var spotToFind = spotCollection.models[0];

        var foundSpot = spotCollection.get(spotToFind.id);
        expect(foundSpot).toNotEqual(null);
        expect(foundSpot.id).toEqual(spotToFind.id);
    });

    it("a spot can be updated", function() {

        debugger;
        var spotToFind = spotCollection.models[spotCollection.length-1];

        var foundSpot = spotCollection.get(spotToFind.id);
        expect(foundSpot).toNotEqual(null);
        expect(foundSpot.id).toEqual(spotToFind.id);

        var newLabel = "testLabel"+ new Date().getTime();
        spotToFind.set("label",newLabel);

        var successCallBack = jasmine.createSpy();
        var errorCallBack = jasmine.createSpy();

        spotToFind.save(null, {
            success: successCallBack,
            error: errorCallBack
        });

        waitsFor(function() {
            return successCallBack.callCount > 0 || errorCallBack.callCount > 0;
        });


        runs(function(){
            expect(errorCallBack.callCount).toEqual(0);
            expect(successCallBack.callCount > 0).toEqual(true);

            var updatedModel = successCallBack.argsForCall[0][0];
            expect(updatedModel).toNotEqual(null);
            expect(updatedModel.id).toEqual(spotToFind.id);
            expect(updatedModel.get("label")).toEqual(newLabel);

            // get model from collection and test again

            var spotC = _.find(spotCollection.models, function(s){
                return s.get("_id") == spotToFind.get("_id");
            });
            debugger;
            expect(spotC).toNotEqual(null);
            expect(spotC.get("label")).toEqual(newLabel);
        });


    });

    xit("a new spot can be created and deleted", function() {

        var newLabel = "pleaseDelete"+ new Date().getTime();
        debugger;
        var spot = new Spot({
            pos:[100,100],
            label: newLabel,
            spotType:'parc'
        });

        var successCallBack = jasmine.createSpy();
        var errorCallBack = jasmine.createSpy();

        var successDeleteCallBack = jasmine.createSpy();
        var errorDeleteCallBack = jasmine.createSpy();

        spot.save(null, {
            success: successCallBack,
            error: errorCallBack
        });

        waitsFor(function() {
            return successCallBack.callCount > 0 || errorCallBack.callCount > 0;
        });


        runs(function(){
            expect(errorCallBack.callCount).toEqual(0);
            expect(successCallBack.callCount > 0).toEqual(true);

            var model = successCallBack.argsForCall[0][0];
            expect(model).toNotEqual(null);
            expect(model.get("label")).toEqual(newLabel);


            model.destroy({
                success:successDeleteCallBack,
                error:errorDeleteCallBack
            });

            waitsFor(function() {
               return successDeleteCallBack.callCount > 0 || errorDeleteCallBack.callCount > 0;}
                );
            });

            runs(function(){
                expect(errorDeleteCallBack.callCount).toEqual(0);
                expect(successDeleteCallBack.callCount > 0 ).toEqual(true);

                var updatedModel = successCallBack.argsForCall[0][0];
                expect(updatedModel).toNotEqual(null);
                expect(updatedModel.id).toEqual(spot.id);
                expect(updatedModel.get("label")).toEqual(newLabel);


            });

    });

    it("should be possible to save a spot with features", function() {
        var newLabel = "pleaseDelete"+ new Date().getTime();


        var spot = new Spot({
            pos:[100,100],
            label: newLabel,
            spotType:'parc'
        });

        spot.set("features", ["Curb","Rail"]);

        var successCallBack = jasmine.createSpy();
        var errorCallBack = jasmine.createSpy();

        var successDeleteCallBack = jasmine.createSpy();
        var errorDeleteCallBack = jasmine.createSpy();

        spot.save(null, {
            success: successCallBack,
            error: errorCallBack
        });

        waitsFor(function() {
            return successCallBack.callCount > 0 || errorCallBack.callCount > 0;
        });


        runs(function(){
            expect(errorCallBack.callCount).toEqual(0);
            expect(successCallBack.callCount > 0).toEqual(true);


            var updatedModel = successCallBack.argsForCall[0][0];
            expect(updatedModel).toNotEqual(null);

            var features = updatedModel.get("features");
            expect(features.length).toEqual(2);

            updatedModel.destroy();

        });



    });

    it("should be possible to update a spot with features", function() {
        var spot = spotController.spotCollection.models[0];

        var initialFeatures = spot.get("features");
        var initialLength =initialFeatures.length;


        var fakeFeature = "FakeFeature"+new Date().getTime();
        initialFeatures.push(fakeFeature);

        spot.set("features",initialFeatures.slice(0));
        spot.set("description","FakeDescription"+new Date().getTime());

        var successCallBack = jasmine.createSpy();
        var errorCallBack = jasmine.createSpy();

        var successDeleteCallBack = jasmine.createSpy();
        var errorDeleteCallBack = jasmine.createSpy();

        spot.save(null, {
            success: successCallBack,
            error: errorCallBack
        });

        waitsFor(function() {
            return successCallBack.callCount > 0 || errorCallBack.callCount > 0;
        });


        runs(function(){
            expect(errorCallBack.callCount).toEqual(0);
            expect(successCallBack.callCount > 0).toEqual(true);


            var updatedModel = successCallBack.argsForCall[0][0];
            expect(updatedModel).toNotEqual(null);

            var features = updatedModel.get("features");
            expect(features.length).toEqual(initialLength+1);


        });



    });




});
