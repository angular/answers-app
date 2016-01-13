module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['systemjs', 'jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-systemjs')
    ],
    systemjs: {
      configFile: 'system.config.js',
      config: {
        map: {
          'zone.js': 'node_modules/zone.js/lib'
        },
        packages: {
          'zone.js': {
            defaultExtension: 'js'
          },
          'src': {
            defaultExtension: 'ts'
          }
        }
      }
    },
    files: [
      // Just sourcemaps needed for SystemJS since karma plugin provides System
      {pattern: 'node_modules/systemjs/dist/**/*.map', included: false, watched: false},
      {pattern: 'node_modules/reflect-metadata/**/*.js', included: false, watched: false},
      // Include reflect so it will be globally available before Angular loads
      'node_modules/reflect-metadata/Reflect.ts',
      // Cannot wholesale include zone because load ordering matters.
      {pattern: 'node_modules/zone.js/lib/**/*.js', included: false, watched: false},
      // Include zone so it will automatically patch.
      'node_modules/zone.js/lib/zone.js',
      {pattern: 'node_modules/rxjs/**/*.@(js|map)', included: false, watched: false},
      {pattern: 'node_modules/firebase/lib/firebase-web.js', included: false, watched: false},
      {pattern: 'node_modules/angular2/**/*.js', included: false, watched: false},

      'karma-test-shim.js',

      // paths loaded via module imports
      {pattern: 'src/**/*.ts', included: false, watched: true},
      'src/**/*.spec.ts',

      // paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      {pattern: 'src/**/*.html', included: false, watched: true},
      {pattern: 'src/**/*.css', included: false, watched: true},

      // paths to support debugging with source maps in dev tools
      // {pattern: 'src/**/*.ts', included: false, watched: false},
      {pattern: 'src/**/*.js.map', included: false, watched: false}
    ],
    exclude: [],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
