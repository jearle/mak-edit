module.exports = function (grunt) {

  grunt.initConfig({

    browserify: {
      dist: {
        files: {
          'build/bundle.js': ['app/index.js']
        },
        options: {
          debug: true,
          transform: ['brfs']
        }
      }
    },

    watch: {
      scripts: {
        files: ['app/**/*.js'],
        tasks: ['browserify'],
        options: {
          spawn: false,
        },
      }
    },

    devserver: {
      server: {}
    },

    'closure-compiler': {
      frontend: {
        closurePath: '/usr/local/Cellar/closure-compiler/20130823/libexec',
        js: 'build/bundle.min.js',
        jsOutputFile: 'build/bundle.min.closure.js',
        maxBuffer: 99999,
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          language_in: 'ECMASCRIPT5'
        }
      }
    },

    uglify: {
      options: {
        compress: {
          properties: true,
          dead_code: true,
          drop_debugger: true,
          conditionals: true,
          comparisons: true,
          evaluate: true,
          booleans: true,
          loops: true,
          unused: true,
          if_return: true,
          join_vars: true,
          cascade: true,
          negate_iife: true
        }
      },
      build: {
        files: {
          'build/bundle.min.js': ['build/bundle.js']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-devserver');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);

};