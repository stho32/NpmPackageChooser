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

# Project

See [requirements](Documentation/Requirements.md) for the instructions.

The folder "Provided-Files" contains the files provided for the project.

You might also be interested in my [notes](Documentation/Notes.md) where I share my thoughts about why I chose one way of solution over another. 

And here you can find my [pomodoro-log](Documentation/Pomodoro-Log.md) for the project.
