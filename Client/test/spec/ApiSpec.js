describe("API Login / out ", function() {


    beforeEach(function() {

    });

    it("a user can be logged in", function() {
        var user = new User({
            username: 'PleaseSet',
            password:'324234234'
        });
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $.ajax({
            url: config.apiUrl+"login",
            type:'POST',
            data: {
                login:user.get("username"),
                password:user.get("password")
            },
            success: successCallback,
            error: errorCallback

        });

        waitsFor(function() {
            return successCallback.callCount > 0 || errorCallback.callCount > 0;
        });


        runs(function(){

            expect(errorCallback.callCount).toEqual(0);
            expect(successCallback.callCount > 0).toEqual(true);
            debugger;
            var data = successCallback.argsForCall[0][0];
            expect(data.success).toEqual(true);
        });
    });


    it("a user can be logged in and out", function() {
        var user = new User({
            username: 'PleaseSet',
            email:'test@123.com',
            password:'324234234'
        });
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        $.ajax({
            url: config.apiUrl+"login",
            type:'POST',
            data: {
                login:user.get("username"),
                password:user.get("password")
            },
            success: successCallback,
            error: errorCallback

        });

        waitsFor(function() {
            return successCallback.callCount > 0 || errorCallback.callCount > 0;
        });


        runs(function(){

            expect(errorCallback.callCount).toEqual(0);
            expect(successCallback.callCount > 0).toEqual(true);
            var data = successCallback.argsForCall[0][0];
            expect(data.success).toEqual(true);

            var logoutSuccessCallback  = jasmine.createSpy();
            var logoutErrorCallback  = jasmine.createSpy();
            $.ajax({
                url: config.apiUrl+"logout",
                type:'GET',
                success: logoutSuccessCallback ,
                error: logoutErrorCallback
            });

            waitsFor(function() {
                return logoutSuccessCallback.callCount > 0 || logoutErrorCallback.callCount > 0;
            });

            runs(function(){
                expect(logoutErrorCallback.callCount).toEqual(0);
                expect(logoutSuccessCallback.callCount > 0).toEqual(true);
                var data = logoutSuccessCallback.argsForCall[0][0];
                expect(data.success).toEqual(true);
            });


        });
    });

});

describe("API Spots", function() {


    beforeEach(function() {
        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();
        authController.doLogin({
            username: 'PleaseSet',
            password:'324234234',
            successCallback:successCallback,
            errorCallback:errorCallback
        });
        waitsFor(function() {
            return successCallback.callCount > 0 || errorCallback.callCount > 0;
        });

        runs(function(){
            expect(errorCallback.callCount).toEqual(0);
            expect(successCallback.callCount > 0).toEqual(true);
        });

    });

    it("a new spot can be created and contains a valid Id", function() {

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

    it("a new user can be created and contains a valid Id", function() {

        var user = new User({
            username: 'PleaseSet',
            email:'test@123.com',
            password:'324234234'
        });

        var successCallback = jasmine.createSpy();
        var errorCallback = jasmine.createSpy();

        user.save(null,{
            success:successCallback,
            error:errorCallback
        });

        waitsFor(function() {
            return successCallback.callCount > 0 || errorCallback.callCount > 0;
        });

        runs(function(){
            debugger;
            expect(errorCallback.callCount).toEqual(0);
            expect(successCallback.callCount > 0).toEqual(true);
            expect(successCallback.argsForCall[0][0].get("username")).toNotEqual(null);
        });

    });



});
