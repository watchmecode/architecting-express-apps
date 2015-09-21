var express = require("express");
var Media = require("media");

// routes
// ------

var router = new express.Router();

router.get("/", getFile);

// route handlers
// --------------

function getFile(req, res, next){
  var fileId = "55f9944ed2a548c981536bb9";

  Media.File.findById(fileId, function(err, file){
    if (err) { return next(err); }

    file.getDownloadUrl(function(err, url){
      if (err) { return next(err); }

      res.redirect(url);
    });
  });
}

// exports
// -------

module.exports = router;
