var express = require("express");
var Media = require("media");

// routes
// ------

var router = new express.Router();

router.head("/:file", getFileInfo);
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

function getFileInfo(req, res, next){
  var file = req.appData.file;
  if (!file) { return next(); }

  file.getInfo(function(err, info){
    if (err) { return next(err); }

    res.set({
      "Content-Type": info.ContentType,
      "Accept-Ranges": info.AcceptRanges,
      "Last-Modified": info.LastModified,
      "Content-Length": info.ContentLength,
      "ETag": info.ETag,
      "Connection": "close"
    });

    res.status(200);
    res.end();
  });
}

// exports
// -------

module.exports = router;
