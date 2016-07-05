module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    open : {
      dev: {
        path: 'http://localhost:1919'
      }
    },

    connect: {
      server: {
        options: {
          port: 1919,
          base: 'demo_docs/build',
          livereload: true
        }
      }
    },
    copy: {
      fonts: {
        files: [
          {
              expand: true,
              flatten: true,
              src: ['bower_components/font-awesome/fonts/*'],
              dest: 'sphinx_rtd_theme/static/fonts/',
              filter: 'isFile'
          },
          {
              expand: true,
              flatten: true,
              src: ['bower_components/lato-googlefont/Lato-Bold.ttf',
                    'bower_components/lato-googlefont/Lato-Regular.ttf'],
              dest: 'sphinx_rtd_theme/static/fonts/',
              filter: 'isFile'
          },
          {
              expand: true,
              flatten: true,
              src: ['bower_components/robotoslab-googlefont/RobotoSlab-Bold.ttf',
                    'bower_components/robotoslab-googlefont/RobotoSlab-Regular.ttf'],
              dest: 'sphinx_rtd_theme/static/fonts/',
              filter: 'isFile'
          },
          {
              expand: true,
              flatten: true,
              src: ['bower_components/inconsolata-googlefont/Inconsolata-Bold.ttf',
                    'bower_components/inconsolata-googlefont/Inconsolata-Regular.ttf'],
              dest: 'sphinx_rtd_theme/static/fonts/',
              filter: 'isFile'
          }
        ]
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          loadPath: ['bower_components/bourbon/dist', 'bower_components/neat/app/assets/stylesheets', 'bower_components/font-awesome/scss', 'bower_components/wyrm/sass']
        },
        files: [{
          expand: true,
          cwd: 'src/sass',
          src: ['*.sass'],
          dest: 'css',
          ext: '.css'
        }]
      },
      build: {
        options: {
          style: 'compressed',
          loadPath: ['bower_components/bourbon/dist', 'bower_components/neat/app/assets/stylesheets', 'bower_components/font-awesome/scss', 'bower_components/wyrm/sass']
        },
        files: [{
          expand: true,
          cwd: 'src/sass',
          src: ['*.sass'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },

    browserify: {
      dev: {
        options: {
          external: ['jquery']
        },
        src: ['js/*.js'],
        dest: 'js/theme.js'
      },
      build: {
        options: {
          external: ['jquery']
        },
        src: ['js/*.js'],
        dest: 'js/theme.js'
      }
    },

    exec: {
      bower_update: {
        cmd: './node_modules/.bin/bower update'
      }
    },
    clean: {
      build: ["demo_docs/build"],
      fonts: ["sphinx_rtd_theme/static/fonts"]
    },

    watch: {
      /* Compile sass changes into theme directory */
      sass: {
        files: ['src/sass/*.sass', 'bower_components/**/*.sass'],
        tasks: ['sass:dev']
      },
      /* JavaScript */
      browserify: {
        files: ['src/js/*.js'],
        tasks: ['browserify:dev']
      }
    }

  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('fonts', ['clean:fonts','copy:fonts']);
  grunt.registerTask('default', ['exec:bower_update','clean:build','sass:dev','browserify:dev','connect','open','watch']);
  grunt.registerTask('build', ['exec:bower_update','clean:build','sass:build','browserify:build']);
}

