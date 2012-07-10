
module.exports = function(app,db) {

    app.get("/api/spots/:id", function(req, res) {
        console.log("/api/spots/"+req.params.id+" GET request recieved");
        return db.Spot.findById(req.params.id, function(err, spot) {
            console.log("/api/spots response recieved" + err  + " " + spot);
            return res.send(spot);
        });
    });

    app.get("/api/spots", function(req, res) {
        console.log("/api/spots request recieved");
        return db.Spot.find(function(err, spots) {
            console.log("/api/spots response recieved" + err  + " " + spots);
            return res.send(spots);
        });
    });

    app.post("/api/spots", function(req, res) {
        var spot;
        console.log("/api/spots POST request recieved");

        delete req.body._id;

        spot= new db.Spot(req.body);
        //spot.init(req.body);
        console.log("isNew " +spot.isNew);
        console.log("req.body " + spot.label);


        db.Spot.upsert(spot, function(err, doc){
            console.log("err : " +err);
            console.log("numupdated : " + doc);
            return res.send(doc);
        });



    });
    app.put("/api/spots/:id", function(req, res) {
        console.log("/api/spots/"+req.params.id+" PUT request recieved " );


        var spot = new db.Spot();
        spot.init(req.body);

        db.Spot.upsert(spot, function(err, doc){
            console.log("Error: " + err);
            console.log("doc: " + doc);
            return res.send(doc);
        });
    });
    app.del('/api/spots/:id', function(req, res) {
        return db.Spot.findById(req.params.id, function(err, spot) {
            return spot.remove(function(err) {
                if (!err) {
                    return console.log("removed");
                }
            });
        });
    });

};
