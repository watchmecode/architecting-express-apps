module.exports = function(grunt){
  grunt.initConfig({
    watch: {
      media: {
        files: ["media/routes/**/*.js"],
        tasks: ["jshint:mediaRoutes"]
      }
    },

    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },

      mediaRoutes: ["media/routes/**/*.js"]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
 
  grunt.registerTask("default", ["watch"]);
};
