/*jslint nomen: true*/
/*global require, module,  __dirname */

module.exports = function (grunt) {
    'use strict';

    var path = require('path');

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadTasks('./tasks');

    var returnIndex = function (connect) {
        return connect.static('index.html');
    };

    var project= {
        build: './build',
        dist: './.dist',
        src: './src',
        app: './src/app',
        bower: './bower_components'
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
                middleware: function (connect, options) {
                    var modRewrite = require('connect-modrewrite');
                    var middlewares = [
                      modRewrite(['^[\\w\\/-]*\\.?[\\w\\/-]{6,}$ /index.html [L]']),
                      require('grunt-contrib-livereload/lib/utils').livereloadSnippet
                    ];
                    options.base.forEach(function (base) {
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
                    'jshint',
                    'less',
                    'xml2json'
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
                    '<%= project.build%>/main.css': ['<%= project.app%>/**/*.less']
                }
            }
        },

        // translation
        xml2json: {
            dev: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '<%= project.src%>',
                        src: ['app/**/*.xml'],
                        dest: '<%= project.build%>/assets',
                        filter: 'isFile'
                        }
                    ]
            },
            missing: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '<%= project.src%>',
                        src: ['app/**/en.xml'],
                        dest: '<%= project.build%>/assets',
                        filter: 'isFile',
                        baseFile: [
                            'ar.json',
                            'it.json',
                            'de.json',
                            'pl.json',
                            'cs.json',
                            'lt.json'
                        ]
                    }
                ]
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
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },

        wiredep: {
            app: {
                src: ['<%= project.src%>/index.html'],
                ignorePath: /\.\.\//
            },
            style: {
                src: ['<%= project.app%>/app.less']
            },
        },

        clean: {
            dist: ['<%= project.dist%>', '<%= project.build%>'],
            dev: ['<%= project.build%>']
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
                constants: {
                    appConfiguration: grunt.file.readJSON('src/assets/config.json')
                }
            },
            build: {}
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: ['<%= project.build%>/concat/**/*.js']
                    }
                ]
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
            TatUi: {
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
            translations: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '<%= project.build%>',
                        src: ['assets/**/*.json'],
                        dest: '<%= project.dist%>/',
                        filter: 'isFile'
                    }
                ]
            },
            conf: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '<%= project.build%>',
                        src: ['scripts/**/*.js'],
                        dest: '<%= project.dist%>/',
                        filter: 'isFile'
                    }
                ]
            },
            index: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= project.src%>/index.html'],
                        dest: '<%= project.dist%>/',
                        filter: 'isFile'
                    }
                ]
            },
            assets: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '<%= project.src%>',
                        src: ['assets/**/*'],
                        dest: '<%= project.dist%>/',
                        filter: 'isFile'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: '<%= project.bower%>/font-awesome',
                        src: ['fonts/**/*'],
                        dest: '<%= project.dist%>/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: false,
                        cwd: '<%= project.bower%>/bootstrap',
                        src: ['fonts/**/*'],
                        dest: '<%= project.dist%>/',
                        filter: 'isFile'
                    }
                ]
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
                title: "TatUi Documentation",
                titleLink: "/api",
                sourceLink: '/{{file}}#{{codeline}}'
            },
            api: {
                title: 'Application',
                src: ['src/app/**/*.js']
            }
        }

    });

    grunt.registerTask('serve', [
        'clean:dev',
        'concat:moment',
        'ngconstant',
        'wiredep:style',
        'less',
        'wiredep:app',
        'xml2json',
        'connect',
        'watch:dev'
    ]);


    grunt.registerTask('dist', [
        'wiredep:app',
        'wiredep:style',
        'jshint:dev',
        'clean:dist',
        'ngdocs',
        'ngconstant',
        'xml2json',
        'copy:translations',
        'copy:index',
        'copy:fonts',
        'concat:moment',
        'copy:conf',
        'less',
        'useminPrepare',
        'ngtemplates:TatUi',
        'concat:generated',
        'ngAnnotate',
        'cssmin:generated',
        'uglify:generated',
        'filerev:js',
        'filerev:css',
        'usemin',
        'copy:assets'
    ]);

    grunt.registerTask('default', ['dist']);
};
