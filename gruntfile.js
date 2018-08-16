module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      all: ['test/alltests.js']
    },
    uglify: {
      my_target: {
        src: 'src/**/*.js',
        dest: 'build/i2ConfiguratorCore.min.js'
      },
      options: {
        mangle: {
        },
        compress: {
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten:true, src: ['src/*.php'], dest: 'build/', filter: 'isFile'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['nodeunit']);
  grunt.registerTask('build', ['uglify', 'copy']);
};
