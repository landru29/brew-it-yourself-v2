/*jslint nomen: true*/
/*global require, module,  __dirname */

module.exports = function(grunt) {
  'use strict';

  var path = require('path');

  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadTasks('./tasks');

  var returnIndex = function(connect) {
    return connect.static('index.html');
  };

  var project = {
    build: './build',
    dist: './dist/public',
    rootDist: './dist',
    src: './src',
    server: './server',
    app: './src/app',
    bower: './bower_components',
    beerFont: './beer-font'
  };

  var pkg = (require('./package.json'));

  var momentLocale = pkg.moment.locale.map(function(elt) {
    return path.join(project.bower, 'moment/locale', elt);
  });


  // Configure Grunt
  grunt.initConfig({

    pkg: pkg,
    project: project,

    connect: {
      options: {
        base: ['<%= project.build%>', '<%= project.src%>', __dirname],
        port: 9000,
        open: true,
        middleware: function(connect, options) {
          var modRewrite = require('connect-modrewrite');
          var middlewares = [
            modRewrite(['^[\\w\\/-]*\\.?[\\w\\/-]{6,}$ /index.html [L]']),
            require('grunt-contrib-livereload/lib/utils').livereloadSnippet
          ];
          options.base.forEach(function(base) {
            middlewares.push(connect.static(base));
          });

          return middlewares;
        }
      },
      livereload: true
    },

    watch: {
      dev: {
        files: ['<%= project.src%>/index.html', '<%= project.app%>/**/*.*'],
        tasks: [
          'translation',
          'jshint',
          'less',
          //'xml2json'
        ],
        options: {
          livereload: true
        }
      }
    },

    less: {
      dist: {
        options: {},
        files: {
          '<%= project.build%>/styles/main.css': ['<%= project.app%>/**/*.less']
        }
      }
    },

    // translation
    translation: {
      dev: {
        files: [{
          expand: true,
          flatten: false,
          cwd: "<%= project.src%>",
          src: ['app/**/*.xml'],
          dest: '<%= project.build%>/assets',
          filter: 'isFile',
          extendFrom: ["en", "fr"]
        }]
      }
    },

    cssmin: {

    },

    jshint: {
      dev: [
        '<%= project.app%>/**/*.js',
        'Gruntfile.js'
      ]
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    wiredep: {
      app: {
        src: ['<%= project.src%>/index.html'],
        ignorePath: /\.\.\//
      },
      style: {
        src: ['<%= project.app%>/constants.less']
      },
    },

    auto_install: {
      server: {
        options: {
          cwd: '<%= project.server%>',
          stdout: true,
          stderr: true,
          failOnError: true,
          npm: '--production'
        }
      }
    },

    clean: {
      dist: ['<%= project.rootDist%>', '<%= project.build%>', '<%= project.server%>/node_modules'],
      dev: ['<%= project.build%>'],
      font: ['<%= project.beerFont%>']
    },

    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      css: {
        src: '<%= project.dist%>/styles/*.css'
      },
      js: {
        src: '<%= project.dist%>/scripts/*.js'
      }
    },

    ngconstant: {
      options: {
        name: 'application.config',
        dest: '<%= project.build%>/scripts/config.js',
      },
      build: {
        constants: {
          appConfiguration: grunt.file.readJSON('src/assets/config.json')
        }
      },
      dev: {
        constants: {
          appConfiguration: grunt.file.readJSON('src/assets/config.dev.json')
        }
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        files: [{
          expand: true,
          src: ['<%= project.build%>/concat/**/*.js']
        }]
      }
    },

    concat: {
      generated: {
        cwd: 'src'
      },
      moment: {
        src: momentLocale,
        dest: '<%= project.build%>/scripts/moment.js'
      }
    },

    ngtemplates: {
      brewItYourself: {
        cwd: '<%= project.src%>',
        src: 'app/**/*.html',
        dest: '<%= project.build%>/template.js',
        options: {
          //prefix: '/',
          usemin: '<%= project.dist%>/scripts/main.min.js',
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true, // Only if you don't use comment directives!
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          }
        }
      }
    },

    copy: {
      server: {
        files: [{
          expand: true,
          flatten: false,
          src: 'server/**',
          dest: '<%= project.rootDist%>/',
          filter: 'isFile'
        }]
      },
      translations: {
        files: [{
          expand: true,
          flatten: false,
          cwd: '<%= project.build%>',
          src: ['assets/**/*.json'],
          dest: '<%= project.dist%>/',
          filter: 'isFile'
        }]
      },
      conf: {
        files: [{
          expand: true,
          flatten: false,
          cwd: '<%= project.build%>',
          src: ['scripts/**/*.js'],
          dest: '<%= project.dist%>/',
          filter: 'isFile'
        }]
      },
      index: {
        files: [{
          expand: true,
          flatten: true,
          src: ['<%= project.src%>/index.html'],
          dest: '<%= project.dist%>/',
          filter: 'isFile'
        }, {
          expand: true,
          flatten: true,
          src: ['<%= project.src%>/favicon.ico'],
          dest: '<%= project.dist%>/',
          filter: 'isFile'
        }]
      },
      assets: {
        files: [{
          expand: true,
          flatten: false,
          cwd: '<%= project.src%>',
          src: ['assets/**/*'],
          dest: '<%= project.dist%>/',
          filter: 'isFile'
        }, {
          expand: true,
          flatten: false,
          cwd: '<%= project.src%>',
          src: ['assets/**/*'],
          dest: '<%= project.build%>/',
          filter: 'isFile'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          flatten: false,
          cwd: '<%= project.bower%>/font-awesome',
          src: ['fonts/**/*'],
          dest: '<%= project.build%>/',
          filter: 'isFile'
        }, {
          expand: true,
          flatten: false,
          cwd: '<%= project.bower%>/bootstrap',
          src: ['fonts/**/*'],
          dest: '<%= project.build%>/',
          filter: 'isFile'
        }, {
          expand: true,
          flatten: false,
          cwd: '<%= project.beerFont%>',
          src: ['fonts/**/*'],
          dest: '<%= project.build%>/',
          filter: 'isFile'
        }, {
          expand: true,
          flatten: true,
          cwd: '<%= project.beerFont%>/build',
          src: ['icons.css'],
          dest: '<%= project.build%>/styles',
          filter: 'isFile'
        }]
      },
      dist: {
        files: [{
          expand: true,
          flatten: false,
          cwd: '<%= project.build%>',
          src: ['fonts/**/*'],
          dest: '<%= project.dist%>/',
          filter: 'isFile'
        }]
      }
    },

    useminPrepare: {
      html: {
        src: ['<%= project.src%>/index.html']
      },
      options: {
        dest: '<%= project.dist%>',
        staging: '<%= project.build%>',
        root: 'src',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    usemin: {
      html: [
        '<%= project.dist%>/index.html'
      ],
      options: {
        assetsDirs: ['<%= project.dist%>']
      }
    },

    ngdocs: {
      options: {
        dest: 'docs',
        html5Mode: false,
        startPage: '/api',
        title: "brewItYourself Documentation",
        titleLink: "/api",
        sourceLink: '/{{file}}#{{codeline}}'
      },
      api: {
        title: 'Application',
        src: ['src/app/**/*.js']
      }
    },

    webfont: {
      "beer-icons": {
        src: 'icons/*.svg',
        dest: '<%= project.beerFont%>/build/../fonts',
        destCss: '<%= project.beerFont%>/build/',
        options: {
          fontFilename: 'beer-{hash}',
          templateOptions: {
            baseClass: 'beer-icon',
            classPrefix: 'beer-',
            mixinPrefix: 'beer-'
          }
        }
      }
    }

  });

  grunt.registerTask('serve', [
    'clean:dev',
    'copy:fonts',
    'copy:assets',
    'concat:moment',
    'ngconstant:dev',
    'wiredep:style',
    'less',
    'wiredep:app',
    'translation',
    'connect',
    'watch:dev'
  ]);


  grunt.registerTask('dist', [
    'wiredep:app',
    'wiredep:style',
    'jshint:dev',
    'clean:dist',
    'ngdocs',
    'ngconstant:build',
    'translation',
    'copy:translations',
    'copy:index',
    'copy:fonts',
    'copy:assets',
    'concat:moment',
    'copy:conf',
    'copy:dist',
    'less',
    'useminPrepare',
    'ngtemplates:brewItYourself',
    'concat:generated',
    'ngAnnotate',
    'cssmin:generated',
    'uglify:generated',
    'filerev:js',
    'filerev:css',
    'usemin',
    'copy:assets',
    'auto_install:server',
    'copy:server'
  ]);

  grunt.registerTask('default', ['dist']);

  grunt.registerTask('test', ['ngconstant', 'karma']);

  grunt.registerTask('font', ['clean:font', 'webfont']);
};
