var mongoose = require("mongoose");
var epa = require("epa").getEnvironment();

// configure mongoosejs
// --------------------

module.exports = function(next){
  mongoose.connect(epa.get("mongodb"), function(err){
    if (err) { return next(err); }
    next();
  });
};
