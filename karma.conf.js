
module.exports = function(config) {
    config.set({
      reporters: ['progress', 'coverage'],
  
      coverageReporter: {
        dir: 'coverage/',
        reporters: [
          { type: 'html', subdir: 'html' },
          { type: 'lcov', subdir: 'lcov' },
          { type: 'text-summary' }
        ]
      },
    });
  };
  