var epa = require("epa").getEnvironment();
var mongoose = require("mongoose");
var AWS = require("aws-sdk");

// File Schema
// -----------

var FileSchema = new mongoose.Schema({
  name: {type: String, index: {unique: true}}
});

// Static Methods
// --------------

FileSchema.static("findByName", function(fileName, cb){
  var query = {
    name: fileName
  };

  this.findOne(query, cb);
});

// File Methods
// ------------

FileSchema.method("getDownloadUrl", function(cb){
  var options = {
    Bucket: epa.get("s3").bucket,
    Key: this.name
  };

  var s3 = new AWS.S3();

  s3.getSignedUrl("getObject", options, cb);
})

FileSchema.method("getInfo", function(cb){
  var options = {
    Bucket: epa.get("s3").bucket,
    Key: this.name
  };

  var s3 = new AWS.S3();

  s3.headObject(options, cb);
});

// File Model
// ----------

var FileModel = mongoose.model("Files", FileSchema);

// exports
// -------

module.exports = FileModel;
