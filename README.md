mocha-bamboo-reporter
=====================

Bamboo Reporter for Mocha on Node.js

Designed to integrate with [Atlassian Bamboo's Node.js plugin](https://marketplace.atlassian.com/plugins/com.atlassian.bamboo.plugins.bamboo-nodejs-plugin)

Usage
=====

    mocha -R mocha-bamboo-reporter

You can specify the output file by setting **MOCHA_FILE** environment variable, for example:

    MOCHA_FILE="test-results.json" mocha -R mocha-bamboo-reporter

If the variable is not set, running Mocha will create an output file named `mocha.json` in the working directory.
    
Using the Mocha task in Bamboo
=====================================================

Download and install the Node.js Bamboo Plugin from the Atlassian Marketplace from inside your Bamboo installation.  (Note that this is not yet supported for onDemand installations)

Then, in your package.json file, add a devDependency for "mocha-bamboo-reporter" as outlined below...

    package.json
    
    ...
    "devDependencies": {
        ...
        "mocha": ">=1.8.1",
        "mocha-bamboo-reporter": "*"
    }

*Install the necessary* `node_modules` *before executing any of the tasks described below, by adding an "npm" task with the "install" command.*

Executing the "Mocha Test Runner" Bamboo task will create an output file containing test results. Add a "Mocha Test Parser" task which runs afterwards to parse them.

If you don't do a full checkout on each build, make sure you add a task to delete mocha.json BEFORE the "Mocha Test Runner" task. A simple script task that runs `rm -f <filename>` should do the trick.
    
### Alternatively

To run your Mocha tests without modifying your package.json you can simply add an additional "npm" task with command `install mocha-bamboo-reporter` before the "Mocha Test Runner" task.
