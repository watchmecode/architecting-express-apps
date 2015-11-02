var epa = require("epa").getEnvironment();
var express = require("express");
var files = require("./files");

var router = express.Router();

router.use(function(req, res, next){
  req.appData = {};
  next();
});

router.use("/files", files);

router.get("/", function(req, res){
  res.redirect(epa.get("www"));
});

module.exports = router;
