module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      all: ['test/alltests.js']
    },
    uglify: {
      my_target: {
        files: {
          'build/i2ConfiguratorCore.min.js': ['src/i2Action.js', 'src/i2Database.js']
        }
      },
      options: {
        mangle: {
        },
        compress: {
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');

  grunt.registerTask('default', ['nodeunit']);
  grunt.registerTask('build', ['uglify']);
};
