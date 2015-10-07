var express = require("express");
var files = require("./files");

var router = express.Router();

router.use(function(req, res, next){
  req.appData = {};
  next();
});

router.use("/files", files);

module.exports = router;
