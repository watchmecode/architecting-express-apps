var nanit = require("nanit");

module.exports = {

  connect: function(cb){

    nanit.initialize(function(err){
      if (err) { throw err; }
      cb();
    });

  }
};
