module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['specs/server/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    jshint: {
      files: [
        'client/**/*.js',
        'server/**/*.js',
        'specs/**/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'specs/client/**/*.js'
        ]
      }
    },

    watch: {
      scripts: {
        files: [
          'server/**/*.js',
          'specs/server/**/*.js'
        ],
        tasks: [
          'test'
        ]
      }
    },

    jsdoc : {
      dist : {
        src: ['server/**/*.js'],
        options: {
          destination: 'doc'
        }
      }
    },

    karma: {
      unit: {
        configFile: 'mobile/karma.conf.js',
        singleRun: true,
        logLevel: 'ERROR'
      }
    },

    shell: {
      setupDB: {
        command: function(DBName) {
          grunt.config.set('DBName', DBName);
          return 'psql -l | grep ' + DBName + ' | wc -l';
        },
        options: {
          callback: function(err, stdout) {
            var done = this.async();

            if (!parseInt(stdout)) {
              grunt.task.run('shell:createDB:' + grunt.config.get('DBName'));
            } else {
              grunt.log.writeln('"' + grunt.config.get('DBName') + '" already exists.');
            }
            done();
          }
        }
      },

      createDB: {
        command: function(DBName) {
          grunt.config.set('DBName', DBName);
          return 'psql -c "CREATE DATABASE ' + DBName + '"';
        },
        options: {
          callback: function(err, stdout) {
            var done = this.async();
            if (!err) {
              grunt.log.writeln(grunt.config.get('DBName') + ' has been created successfully.');
            }
            done();
          }
        }
      },

      dropDB: {
        command: function(DBName) {
          grunt.config.set('DBName', DBName);
          return 'psql -c "DROP DATABASE ' +  DBName + '"';
        },
        options: {
          callback: function(err, stdout) {
            var done = this.async();
            if (!err) {
              grunt.log.writeln(grunt.config.get('DBName') + ' has been deleted successfully.');
            }
            done();
          }
        }
      },

      populateDB: {
        command: function(DBName) {
          grunt.config.set('DBName', DBName);
          return 'node populate.js';
        },
        options: {
          callback: function(err, stdout) {
            var done = this.async();
            if (!err) {
              grunt.log.writeln('Your database has been populated successfully.');
            }
            done();
          }
        }
      },

      checkDB: {
        command: function(DBName) {
          return 'psql -l | grep ' + DBName + ' | wc -l';
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-npm-install');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  grunt.registerTask('setupDB', 'Create a new PostgreSQL database if not exist', function(DBName) {
    grunt.task.run('shell:setupDB:' + DBName);
  });
  grunt.registerTask('createDB', 'Create a new PostgreSQL database', function(DBName) {
    grunt.task.run('shell:createDB:' + DBName);
  });
  grunt.registerTask('dropDB', 'Drop the existing PostgreSQL database', function(DBName) {
    grunt.task.run('shell:dropDB:' + DBName);
  });
  grunt.registerTask('populateDB', 'Populate the existingPostgreSQL database', function(DBName) {
    grunt.task.run('shell:populateDB:' + DBName);
  });

  grunt.registerTask('test', 'Setup database and run mocha tests', [
    //'setupDB',
    'mochaTest',
    'karma'
  ]);

  grunt.registerTask('build', 'Run npm-install, jshint, mochaTest and jsdoc tasks', [
    'npm-install',
    'jshint',
    'test',
    'jsdoc'
  ]);

  grunt.registerTask('default', ['build']);
};
