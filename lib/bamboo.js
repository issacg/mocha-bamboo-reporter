var Base = require('mocha').reporters.Base
  , cursor = Base.cursor
  , color = Base.color
  , fs = require('fs')
  , filename = 'mocha.json';

exports = module.exports = BambooJSONReporter;

/**
 * Initialize a new `JSON` reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function BambooJSONReporter(runner) {
  var self = this;
  Base.call(this, runner);

  var tests = []
    , failures = []
    , passes = []
    , skipped = [];

  runner.on('test end', function(test){
    tests.push(test);
  });

  runner.on('pending', function(test) {
    skipped.push(test);
  });
  
  runner.on('pass', function(test){
    passes.push(test);
  });

  runner.on('fail', function(test){
    failures.push(test);
  });

  runner.on('end', function(){
    var obj = {
        stats: self.stats
      , failures: failures.map(clean)
      , passes: passes.map(clean)
      , skipped: skipped.map(clean)
    };

    //allow "mocha.json" file to be written into a different folder when using Grunt
    //example: Gruntfile.js >> mocha.test.dest = "target/reports/mocha.json"
    if ('grunt' === process.title) {
        console.log(JSON.stringify(obj, null, 2));
    } else {
        fs.writeFileSync(filename, JSON.stringify(obj, null, 2), 'utf-8');
    }
  });

  runner.on('start', function() {
    //only unlink when not using Grunt
    if ('grunt' !== process.title && fs.existsSync(filename)) {
      fs.unlinkSync(filename); // if we die at some point, we don't want bamboo to have a stale results file lying around...      
    }
  });
}

/**
 * Return a plain-object representation of `test`
 * free of cyclic properties etc.
 *
 * @param {Object} test
 * @return {Object}
 * @api private
 */

function clean(test) {
  var o = {
      title: test.title
    , fullTitle: test.fullTitle()
    , duration: test.duration
  }
  if (test.hasOwnProperty("err")) {
    o.error = test.err.stack.toString();
  }
  return o;
}
