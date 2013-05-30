mocha-bamboo
============

Bamboo Reporter for Mocha on Node.js

Designed to integrate with [Atlassian Bamboo's Node.js plugin](https://marketplace.atlassian.com/plugins/com.atlassian.bamboo.plugins.bamboo-nodejs-plugin)

Usage
=====

    mocha -R mocha-bamboo-reporter > mocha.json
    
Integrating mocha & bamboo with mocha-bamboo-reporter
=====================================================

A patched version of the Atlassian Bamboo Node.js plugin with support for this module exists [here](https://bitbucket.org/issacg/bamboo-nodejs-plugin/downloads#download-190726)
Install it on your bamboo server

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
        "bamboo": "node node_modules/mocha/bin/mocha -R mocha-bamboo-reporter > mocha.json"
    }
    
In Bamboo, create an "npm task" with command `run-script bamboo`
Then, in Bamboo add a "Parse mocha results" task which runs afterwards to parse the results from mocha

If you don't do a full checkout on each build, make sure you add a task to delete mocha.json BEFORE the `npm run-script bamboo` task (I use a script task that runs `rm -f mocha.json`)