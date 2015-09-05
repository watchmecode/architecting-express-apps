module.exports = function(grunt){
  grunt.initConfig({

  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
 
  grunt.registerTask("default", ["watch"]);
};
