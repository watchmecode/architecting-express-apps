var AWS = require("aws-sdk");

// configure AWS
// -------------

module.exports = function(next){
  var credentials = new AWS.SharedIniFileCredentials({
    profile: "test-architecting-express"
  });

  AWS.config.credentials = credentials;

  next();
};
