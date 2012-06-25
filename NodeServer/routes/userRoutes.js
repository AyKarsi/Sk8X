
module.exports = function(app,db) {
    app.get("/api/users", function(req, res) {
        console.log("/api/users request recieved");
        return db.User.find(function(err, users) {
            console.log("/api/users response recieved" + err  + " " + users);
            return res.send(users);
        });
    });

    app.post("/api/users", function(req, res) {
        var user;
        console.log("/api/users POST request recieved");
        user= new db.User({
            _id : req.body._id,
            pos: req.body.pos,
            username: req.body.username
        });

        db.User.upsert(user, function(err, doc){
            return res.send(user);
        });



    });
    app.put("/api/users/:id", function(req, res) {
        console.log("/api/users/"+req.params.id+" PUT request recieved " );

        var user = new db.User();
        user.init(req.body);

        db.User.upsert(user, function(err, doc){
            console.log("Error: " + err);
            console.log("doc: " + doc);

            return res.send(user);
        });
    });
    app.del('/api/users/:id', function(req, res) {
        return User.findById(req.params.id, function(err, user) {
            return user.remove(function(err) {
                if (!err) {
                    return console.log("removed");
                }
            });
        });
    });



};
