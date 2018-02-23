# Requirements

Useful urls: 
  - https://registry.npmjs.org/<package-name> . 
  - https://stackoverflow.com/questions/16389851/how-do-i-choose-a-node-module

Extract the following information with APIs:
  - [x] When was the last release published?
  - [x] How many releases have taken place?
  - [x] How many downloads (last day / last week) does the package have? (example url https://api.npmjs.org/downloads/range/2018-01-01:2018-02-01/bcrypt)
  - [x] Is a travis CI build Icon present? If so, does it say "Build passing" (Yes is better)
  - [ ] It goes to the github project page and compares
     - [>] How many open issues are there? (Lot of issues means buggy library.)
     - [ ] How many pull requests are there? (A higher value means that they are not 'pulled'.)
     - [ ] How many watches, stars and forks are there? (more are better)
     - [ ] How many contributers are there? (more means probable better)
     - [ ] In the Readme.md, is there a Travis CI build icon? If so, does it say "Build passing" (Yes is better and the value of a yes here is equivalent to a travis ci logo on the npm page.)
  - [ ] The licence of the project is printed out since I do not know what licences may be a good choice for you.

Implement the following rules: 
  - [ ] A younger release date is better.
  - [ ] More releases are better (releases per timeframe)
  - [ ] At least 100 downloads in the last week, but more is better
  - [ ] A bigger number of issues on github may indicate a buggy library. So that is not so good.
  - [ ] ...


Usage : 
  - Go to https://www.npmjs.com and grab the names of the npm packages you want to compare (the users task)
  - [ ] Use this tool like e.g. `node ./compare-npm-packages.js bcrypt bcrypt-nodejs` 
  - [ ] Depending on the stats for each package the tool will tell you about how certain it is, that choosing that package is a good idea and will finally recommend one.

