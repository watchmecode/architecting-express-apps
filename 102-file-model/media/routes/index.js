var express = require("express");
var files = require("./files");

var router = express.Router();

router.use("/files", files);

module.exports = router;
