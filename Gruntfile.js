module.exports = function(grunt) {

  var jsonFiles = [
    'theme.json',
    'theme-ui.json',
    'package.json',
    'labels/*.json'
  ],
    jsFiles = [
    'Gruntfile.js',
    'build.js',
    'scripts/**/*.js'
  ],
    filesToArchive = [
    'compiled/**',
    'labels/**',
    'resources/**',
    'scripts/**',
    'stylesheets/**',
    'templates/**',
    'build.js',
    'CHANGELOG.md',
    'Gruntfile.js',
    'LICENSE',
    'package.json',
    'README.md',
    'theme.json',
    'theme-ui.json',
    '*.ico',
    '*.png'
  ],

versionCmd = ':'; // e.g. 'git describe --tags --always' or 'svn info'

grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    theme: grunt.file.readJSON('theme.json'),
    jsonlint: {
      theme_json: {
        src: jsonFiles
      }
    },
    jshint: {
      theme_js: jsFiles,
      options: {
        ignores: ['scripts/vendor/**/*.js'],
        undef: true,
        laxcomma: true,
        unused: false,
        globals: {
          console: true,
          window: true,
          document: true,
          setTimeout: true,
          clearTimeout: true,
          module: true,
          define: true,
          require: true,
          Modernizr: true,
          process: true
        }
      }
    },
    zubat: {
      main: {
        dir: '.',
        manualancestry: ['./references/<%= theme.about.extends %>'],
        ignore: ['/references','\\.git','node_modules','^/resources','^/tasks','\\.zip$']
      }
    },
    compress: {
      build: {
        options: {
          archive: '<%= pkg.name %>.zip',
          pretty: true
        },
        files: [{
          src: filesToArchive,
          dest: '/'
        }]
      }
    },
    // clean all generated files
    clean: {
        build: {
            src: ["stylesheets/**/*.less"]
        }
    },
    copy: {
        files: {
            cwd: 'references/core6/stylesheets',  // set working folder / root to copy
            src: '**/*.less',           // copy all files and subfolders
            dest: 'stylesheets',    // destination folder
            expand: true           // required when using cwd
        }
    },   
    watch: {
      json: {
        files: jsonFiles,
        tasks: ['jsonlint']
      },
      javascript: {
        files: jsFiles,
        tasks: ['jshint','zubat']
      },
      compress: {
        files: filesToArchive,
        tasks: ['compress']
      },
      css: {
        files: ["**/*.less"],
        tasks: ['less']
      }
    },
    less: {
      dev: {
        options: {
          paths: ['references/core6/stylesheets','stylesheets']
        },
        files: {
          'dev/css/style.css' : 'stylesheets/storefront.less'
        }
      }
	},
    setver: {
      release: {
        cmd: versionCmd,
        themejson: true,
        packagejson: true,
        readmemd: true
      },
      build: {
        cmd: versionCmd,
        themejson: true,
      },
      renamezip: {
        cmd: versionCmd,
        filenames: ["<%= pkg.name %>.zip"]
      }
    }
  });

  [
   'grunt-jsonlint',
   'grunt-contrib-jshint',
   'grunt-contrib-clean',
   'grunt-contrib-copy',   
   'grunt-contrib-watch',
   'grunt-contrib-compress',
   'grunt-contrib-less'
  ].forEach(grunt.loadNpmTasks);

  grunt.loadTasks('./tasks/');
  
  
  grunt.registerTask('theme', ['watch:css']);
  grunt.registerTask('init', ['clean', 'copy']);    
  grunt.registerTask('build', ['jsonlint', 'jshint', 'checkreferences', 'zubat', 'setver:build', 'compress', 'setver:renamezip']);
  grunt.registerTask('release', ['jsonlint', 'jshint', 'zubat', 'setver:release', 'compress', 'setver:renamezip']);
  grunt.registerTask('default', ['build']);
};
