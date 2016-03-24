var nanit = require("nanit");
var AWS = require("aws-sdk");
var Media = require("media");

nanit.initialize(function(err){
  if (err) { throw err; }

  loadFilesFromS3()
    .then(filterFiles)
    .then(addToMongo)
    .then(process.exit)
    .then(undefined, function(err){
      setTimeout(function(){
        throw err;
      }, 0);
    });
});

function loadFilesFromS3(){
  var s3 = new AWS.S3();
  var params = {
    Bucket: "watchmecode-net"
  };

  var p = new Promise(function(resolve, reject){
    s3.listObjects(params, function(err, data) {
      if (err) { 
        return reject(err);
      }

      resolve(data.Contents);
    });
  });

  return p;
}

function filterFiles(s3Files){
  var filteredList = s3Files.filter(function(file){
    var isLog = (file.Key.indexOf("logs/") === 0);
    return !isLog;
  });

  return filteredList;
}

function addToMongo(files){
  var filePromises = files.map(saveFile);
  return Promise.all(filePromises);
}

function saveFile(file){
  var p = new Promise(function(resolve, reject){
    var dbFile = new Media.File({
      name: file.Key
    });

    dbFile.save(function(err){
      if (err) { return reject(err); }
      resolve(dbFile);
    });
  });

  return p;
}
