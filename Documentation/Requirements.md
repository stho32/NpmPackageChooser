# Requirements

Useful urls: 
  - https://registry.npmjs.org/<package-name> . 
  - https://stackoverflow.com/questions/16389851/how-do-i-choose-a-node-module

What does the node package chooser look for?
  - [ ] When was the last release published? (younger is better)
  - [ ] How many releases have taken place? (more is better)
  - [ ] How many downloads (last day / last week) does the package have? (more is better)
  - [ ] How many open issues are there? (Lot of issues means buggy library.)
  - [ ] How many pull requests are there? (A higher value means that they are not 'pulled'.)
  - [ ] Is a travis CI build Icon present? If so, does it say "Build passing" (Yes is better)
  - [ ] It goes to the github project page and compares
     - [ ] How many watches, stars and forks are there? (more are better)
     - [ ] How many contributers are there? (more means probable better)
     - [ ] In the Readme.md, is there a Travis CI build icon? If so, does it say "Build passing" (Yes is better and the value of a yes here is equivalent to a travis ci logo on the npm page.)
  - [ ] The licence of the project is printed out since I do not know what licences may be a good choice for you.


Usage : 
  - Go to https://www.npmjs.com and grab the names of the npm packages you want to compare (the users task)
  - [ ] Use this tool like e.g. `node ./compare-npm-packages.js bcrypt bcrypt-nodejs` 
  - [ ] Depending on the stats for each package the tool will tell you about how certain it is, that choosing that package is a good idea and will finally recommend one.

