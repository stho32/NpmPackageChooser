var chai = require('chai');
var expect = chai.expect; 
var npm = require('./../npm-registry-api.js');
var moment = require("moment");

describe('npm-registry-api.getPackageInfo', function() {

  it('will generate an error message when the package does not exist.', function() {
    npm.getPackageInfo("not-existing", (result) => {
      expect(result.errorMessage).to.equal("A package with the name 'not-existing' could not be found.");
    });
  });

  it('downloads stats of a npm package', function() {
    npm.getPackageInfo("bcrypt", result => {
      expect(result.latestVersion, "Latest version").to.equal("1.0.3");
      expect(result.releaseDate, "Release date and time").to.equal("2017-08-24T03:47:34.385Z");
      expect(result.releaseCount, "Release count").to.equal(36);
    });
  });
});


describe('npm-registry-api.getPackageDownloads', function() {
  it('grabs the sum of the downloads of the last 7 days', function() {
    npm.getPackageDownloads("bcrypt", function(data) {
      expect(data, "Downloads of the last 7 days").to.be.greaterThan(0);
      console.log("bcrypt has been downloaded " + data + " times in the last 7 days.");
    });
  });
});