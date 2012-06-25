
var mongoose = require('mongoose');

module.exports  = {

  User : mongoose.model('User', new mongoose.Schema({
        username: String,
        pos: Array
   })),
   Spot : mongoose.model('Spot', new mongoose.Schema({
        label: String,
        pos: Array,
        creator: String,
        creationDate : Date
    })),
  conn: null,
  init: function(callback)
  {

      console.log("connecting to mongo...");
      var MONGOHQ_URL="mongodb://admin:nimda@staff.mongohq.com:10082/Trigger02";
      mongoose.connection.on("open", function(){
          console.log("mongodb is connected!!");
          if (callback) {
              callback();
          }
      });
      mongoose.connect(MONGOHQ_URL);


      this.User.upsert = (function(doc, callback){
          var saveData = doc.toObject();
          var id = doc._id;
          delete saveData._id;
          this.User.update({_id : id}, saveData, {upsert: true},function(err,doc){
              callback(err,doc);
          })
      }).bind(this);
      this.Spot.upsert = (function(model, callback){

          var id = model._id;
          console.log("id: "+ id);

          model.save(function(err,doc){
              callback(err,doc);
          });
          return;

          var save = function(model,callback){
              console.log("call back from save");
              model.save(function(err,doc){
                  callback(err,doc);
              });
          };
          save(model,callback);
          return;

          if (model.isNew){
            console.log("creating");

            return;
          }

          this.Spot.findById(id, function (err, doc) {
              if (err) console.error(err.stack||err);
              save(model,callback);
          });

      }).bind(this);


  }




};
