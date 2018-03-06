var chai = require('chai');
var expect = chai.expect;
var buildStatus = require('./../build-status-extractor.js');


describe('build-status-extractor.getBuildStatusImageUrlFromMarkdown', function () {

  it('will return undefined if no build url is present', function () {
    let buildStatusInfo = buildStatus.getBuildStatusImageUrlFromMarkdown("nothing here");

    expect(buildStatusInfo).to.be.undefined;
  });

  it("will return the url, if it finds it", function () {
    let readmeMd = "# node.bcrypt.js\n[![Build Status](https://travis-ci.org/kelektiv/node.bcrypt.js.svg?branch=master)](https://travis-ci.org/kelektiv/node.bcrypt.js)\n[![Dependency Status](https://david-dm.org/kelektiv/node.bcrypt.js.svg)](https://david-dm.org/kelektiv/node.bcrypt.js)\n\nLib to help you hash passwords.\n[bcrypt on wikipedia][bcryptwiki]\n\nCatalyst for this module: [How To Safely Store A Password][codahale]\n\n## If You Are Submitting Bugs/Issues";

    let buildStatusInfo = buildStatus.getBuildStatusImageUrlFromMarkdown(readmeMd);

    expect(buildStatusInfo).equals("https://travis-ci.org/kelektiv/node.bcrypt.js.svg?branch=master");
  });

});

describe('build-status-extractor.getBuildStatusFromSvg', function () {
  it('will return "passing" for the bcrypt package on npm', function (done) {
    buildStatus.getBuildStatusFromSvg("https://travis-ci.org/kelektiv/node.bcrypt.js.svg?branch=master")
      .then(
        (result) => {
          expect(result).equals("passing");
          done();
        },
        error => {
          expect.fail();
        });
  });
});