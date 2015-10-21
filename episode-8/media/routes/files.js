var express = require("express");
var Media = require("media");

// routes
// ------

var router = new express.Router();

router.get("/:file", getFile);

// params
// ------

router.param("file", function(req, res, next, fileName){
  Media.File.findByName(fileName, function(err, file){
    if (err) { return next(err); }

    req.appData.file = file;
    next();
  });
});

// route handlers
// --------------

function getFile(req, res, next){
  var file = req.appData.file;
  if (!file) { return next(); }

  file.getDownloadUrl(function(err, url){
    if (err) { return next(err); }

    res.redirect(url);
  });
}

// exports
// -------

module.exports = router;
