describe("UserModel", function() {

    var user;
    var userCollection;

    beforeEach(function() {
        userCollection = new UserCollection();
    });

    it("user collection should be empty", function() {

        expect(userCollection.models.length).toEqual(0);
    });


    it("should now contain one user", function() {
        var userModel = new window.User({
            username: "AyKarsi",
            password: "AyKarsi",
            email: "karsten@grombach.com",
            tags: ""
        });
        userCollection.add(userModel);
        expect(userCollection.models.length).toEqual(1);
    });
    it("should not be possible to add the same user twice", function() {
        var userModel = new window.User({
            username: "AyKarsi",
            password: "AyKarsi",
            email: "karsten@grombach.com",
            tags: ""
        });
        userCollection.add(userModel);

        var userModel2 = new window.User({
            username: "AyKarsi",
            password: "AyKarsi",
            email: "karsten@grombach.com",
            tags: ""
        });
        userCollection.add(userModel2);

        expect(userCollection.models.length).toEqual(1);
    });


});

describe("UserModel loading data", function() {


    var userCollection;

    beforeEach(function() {
        userCollection = new UserCollection();
        var userModel1 = new window.User({
                username: "AyKarsi",
            password: "AyKarsi",
            email: "karsten@grombach.com",
            tags: ""
        });
        userCollection.add(userModel1);
        var userModel2 = new window.User({
            username: "AyKarsi2",
            password: "AyKarsi2",
            email: "karste2n@grombach.com",
            tags: ""
        });
        userCollection.add(userModel2);


/*
        userCollection.fetch({success: function(){
            console.log("user collection loaded data");
        }},this);
*/

        waitsFor(function(){
            return userCollection.models.length > 0;
        },  "Could not load data",500)

    });

    it("users can be loaded from the store", function() {
        expect(userCollection.models.length).toBeGreaterThan(1);
    });

    it("a user can be found by his username", function() {

        var user = userCollection.get("AyKarsi");
        expect(user).toNotEqual(null);
        expect(user.id).toEqual("AyKarsi");
    });

    it("a user can be found by his username in any 'case''", function() {
        var user = userCollection.get("aykarsi");
        expect(user).toNotEqual(null);
        expect(user.id).toEqual("AyKarsi");
    });


});


/*
describe("App", function() {

    var userModel;
    var userCollection;

    beforeEach(function() {

    });

    it("app should be created", function() {
        expect(app).toNotEqual(null);
    });



});*/