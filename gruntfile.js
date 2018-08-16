module.exports = function(grunt) {
  grunt.initConfig({
    nodeunit: {
      all: ['test/alltests.js']
    },
    uglify: {
      my_target: {
        files: {
          'build/i2ConfiguratorCore.min.js': ['src/i2DatabaseObject.js', 'src/i2Database.js', 'src/i2Action.js', 'src/i2Model.js', 'src/i2Variant.js', 'src/i2ActionBuilder.js', 'src/i2ModelBuilder.js', 'src/i2VariantBuilder.js']
        }
      },
      options: {
        mangle: true,
        compress: true,
        beautify: false
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
