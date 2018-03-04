# Node Package Chooser

Project progress : See [requirements](Documentation/Requirements.md) task list. The project is not complete yet. 

This project is intended to help with node package selection. 
As we all know using open source can be awesome or a pain, depending on what packages we use. We ask a lot of questions:

Usage : 
  - Go to https://www.npmjs.com and grab the names of the npm packages you want to compare
  - Use this tool like e.g. `node ./compare-npm-packages.js bcrypt bcrypt-nodejs` 
  - Depending on the stats for each package the tool will tell you about how certain it is, that choosing that package is a good idea and will finally recommend one.

What does the node package chooser look for?
  - When was the last release published? (younger is better)
  - How many releases have taken place? (more is better)
  - How many downloads (last day / last week) does the package have? (more is better)
  - How many open issues are there? (Lot of issues means buggy library.)
  - How many pull requests are there? (A higher value means that they are not 'pulled'.)
  - Is a travis CI build Icon present? If so, does it say "Build passing" (Yes is better)
  - It goes to the github project page and compares
     - How many watches, stars and forks are there? (more are better)
     - How many contributers are there? (more means probable better)
     - In the Readme.md, is there a Travis CI build icon? If so, does it say "Build passing" (Yes is better and the value of a yes here is equivalent to a travis ci logo on the npm page.)
  - The licence of the project is printed out since I do not know what licences may be a good choice for you.

## Tool versions needed

 - nodejs v.9.5.0
 - npm v.5.6.0
 - npm install mocha -g (version 5.0.1)

## Getting it up and running

```bash
cd Source/
npm install
npm test
```

## Example calls

From bash, you can use the shell script, wich is a simple adapter for the node command line to start.
```bash
./compare-npm-packages.sh bcrypt bcryptjs
```

example output:
```
$ ./compare-npm-packages.sh bcrypt bcryptjs

Package: bcryptjs
  repository url: git+https://github.com/dcodeIO/bcrypt.js.git
  issue tracker url: https://github.com/dcodeIO/bcrypt.js/issues

  latest version: 2.4.3
  last release date: 2017-02-07T09:43:46.316Z
  release count: 25
  build status: unknown
  downloads of the last 7 days: 214593
  issueTrackerStats : 
    12 Open Issues
    50 Closed Issues


Package: bcrypt
  repository url: git+https://github.com/kelektiv/node.bcrypt.js.git
  issue tracker url: https://github.com/kelektiv/node.bcrypt.js/issues

  latest version: 1.0.3
  last release date: 2017-08-24T03:47:34.385Z
  release count: 36
  build status: passing
  downloads of the last 7 days: 153240
  issueTrackerStats : 
    9 Open Issues
    476 Closed Issues
```

