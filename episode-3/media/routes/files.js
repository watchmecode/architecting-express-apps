var express = require("express");
var AWS = require("aws-sdk");

// configure AWS
// -------------

var credentials = new AWS.SharedIniFileCredentials({
  profile: "test-architecting-express"
});

AWS.config.credentials = credentials;

// routes
// ------

var router = new express.Router();

router.get("/", getFile);

// route handlers
// --------------

function getFile(req, res, next){
  var file = "16-install-node-on-osx.mp4";

  var options = {
    Bucket: "watchmecode-net",
    Key: file
  };

  var s3 = new AWS.S3();

  s3.getSignedUrl("getObject", options, function(err, url){
    if (err) { return next(err); }

    res.redirect(url);
  });
};

// exports
// -------

module.exports = router;
