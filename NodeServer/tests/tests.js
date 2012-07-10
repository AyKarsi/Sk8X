var db = require('./../skatedb');
module.exports = {
    setUp: function (callback) {
        db.init(callback);

        //callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    testCreateTestUsers: function (test)
    {
        var data ={
            _id : "4fe3773ffca7f74410000002",
            pos:[48.123447013691425,11.57250838808296],
            username:'AyKarsi2',
            modified: new Date()
        };
        u = new db.User();
        u._id = data._id;
        u.pos = data.pos;
        u.username = data.username;
        //u.init(data);

        db.User.upsert(u,function(err,doc){
            console.log("error:" +err);
            console.log("found doc :" +doc);
            test.done();
        });
    }


};
