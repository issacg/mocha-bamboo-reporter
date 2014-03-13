mocha-bamboo-reporter
=====================

Bamboo Reporter for Mocha on Node.js

Designed to integrate with [Atlassian Bamboo's Node.js plugin](https://marketplace.atlassian.com/plugins/com.atlassian.bamboo.plugins.bamboo-nodejs-plugin)

Usage
=====

    mocha -R mocha-bamboo-reporter
    
Integrating mocha & bamboo with mocha-bamboo-reporter
=====================================================

Download and install the Node.js Bamboo Plugin from the Atlassian Marketplace from inside your Bamboo installation.  (Note that this is not yet supported for onDemand installations)

Then, in your package.json file, add a devDependency for "mocha-bamboo-reporter", and a script "bamboo" as outlined below...

    package.json
    
    ...
    "devDependencies": {
        ...
        "mocha": ">=1.8.1",
        "mocha-bamboo-reporter": "*"
    }
    
    "scripts": {
        ...
        "bamboo": "node node_modules/mocha/bin/mocha -R mocha-bamboo-reporter"
    }
    
* In Bamboo, create an "npm task" with command `run-script bamboo`
* Then, in Bamboo add a "Parse mocha results" task which runs afterwards to parse the results from mocha
* If you don't do a full checkout on each build, make sure you add a task to delete mocha.json BEFORE the `npm run-script bamboo` task (a simple script task that runs `rm -f mocha.json` should do the trick)

### Alternatively

To run your Mocha tests without modifying your package.json you can simply do the following in Bamboo:

* Add a "npm" task with command `install mocha-bamboo-reporter`
* Add a "Node.js" task with script `node_modules/mocha/bin/mocha` and arguments `--reporter mocha-bamboo-reporter`, along with any other arguments you want to pass to Mocha
* You'll still need to run a "Parse mocha results" task, and ensure you don't use an old mocha.json