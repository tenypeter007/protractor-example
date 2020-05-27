exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['todo-spec.js'],
    framework: 'jasmine2',
    onPrepare: function() {
      var AllureReporter = require('jasmine-allure-reporter');
      jasmine.getEnv().addReporter(new AllureReporter({
        resultsDir: 'allure-results'
      }));

      jasmine.getEnv().afterEach(function(done){
        browser.takeScreenshot().then(function (png) {
          allure.createAttachment('Screenshot', function () {
            return new Buffer(png, 'base64')
          }, 'image/png')();
          done();
        })
      });

      var jasmineReporters = require('jasmine-reporters');
      var junitReporter = new jasmineReporters.JUnitXmlReporter({

        // setup the output path for the junit reports
        savePath: 'output/',
  
        // conslidate all true:
        //   output/junitresults.xml
        //
        // conslidate all set to false:
        //   output/junitresults-example1.xml
        //   output/junitresults-example2.xml
        consolidateAll: false
  
      });
       jasmine.getEnv().addReporter(junitReporter);
    }

    
  };