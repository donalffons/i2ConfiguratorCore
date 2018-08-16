module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      all: ['test/alltests.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['nodeunit']);
};
