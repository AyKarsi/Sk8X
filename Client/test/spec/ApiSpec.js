describe("API ", function() {


    beforeEach(function() {




    });

    it("a new spot can created and contains a valid Id", function() {

        var spot = new Spot({
            label: 'PleaseSet',
            pos : [],
            spotType:'', // spot or parc
            description:'',
            features:[]
        });

        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        debugger;
        spot.save(null,{
            success:successCallback,
            error:errorCallback
        });

        waitsFor(function() {
            return successCallback.callCount > 0 || errorCallback.callCount > 0;
        });


        runs(function(){


            expect(errorCallback.callCount).toEqual(0);
            expect(successCallback.callCount > 0).toEqual(true);
            expect(successCallback.argsForCall[0][0].get("_id")).toNotEqual(null);
        });

    });
});
