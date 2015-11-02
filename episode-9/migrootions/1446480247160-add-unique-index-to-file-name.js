var Migroose = require('migroose');
var mongoose = require("mongoose");
var migration = new Migroose.Migration('1446480247160-add-unique-index-to-file-name');

migration.step(function(data, stepComplete){

  mongoose.connection.db.collection("files", function(err, collection){
    if (err) { return stepComplete(err); }
  
    collection.createIndex({name: 1}, {unique: true}, function(err, result){
      if (err) { return stepComplete(err); }

      stepComplete();
    });

  });
});

module.exports = migration;
