let npmRegistryUrl = "https://registry.npmjs.org/";
let https = require("https");
let moment = require("moment");

function getPackageDownloads(packageName) {
    let dayCount = 7;

    let fromDate = moment().startOf("day").add(-dayCount, "day").format("YYYY-MM-DD");
    let tillDate = moment().startOf("day").add(-1, "days").format("YYYY-MM-DD");

    let url = `https://api.npmjs.org/downloads/range/${fromDate}:${tillDate}` +
        `/${packageName}`;

    return new Promise(function (resolve, reject) {
        https.get(url, response => {
            if (response.statusCode == 404) {
                reject("A package with the name '" + packageName + "' could not be found.");
                return;
            }

            let resultText = "";

            response.on('data', data => {
                resultText += data.toString();
            });

            response.on('end', () => {
                let possibleResult = {};
                let sumLast7Days = 0;
                try {
                    possibleResult = JSON.parse(resultText);

                    for (let i = 0; i < possibleResult.downloads.length; i++) {
                        sumLast7Days += possibleResult.downloads[i].downloads;
                    }
                }
                catch (e) {
                    reject("Error parsing json from npm! " + e.message);
                    return;
                }

                resolve(sumLast7Days);
            });

        }).on('error', (e) => {
            reject(e);
        });
    });
}

function getPackageInfo(packageName) {

    return new Promise(function (resolve, reject) {
        https.get(npmRegistryUrl + packageName, response => {
            if (response.statusCode == 404) {
                reject("A package with the name '" + packageName + "' could not be found.");
                return;
            }

            let resultText = "";

            response.on('data', data => {
                resultText += data.toString();
            });

            response.on('end', () => {
                let possibleResult = {};
                try {
                    //console.log(resultText);
                    possibleResult = JSON.parse(resultText);
                    //console.dir(possibleResult);
                }
                catch (e) {
                    reject("Error parsing json from npm! " + e.message);
                    return;
                }

                let result = {}
                result.latestVersion = possibleResult["dist-tags"].latest;
                result.releaseDate = possibleResult["time"][result.latestVersion];
                result.repositoryUrl = possibleResult["versions"][result.latestVersion].repository.url;
                result.issueTrackerUrl = possibleResult["versions"][result.latestVersion].bugs.url;
                result.releaseCount = Object.keys(possibleResult["versions"]).length;
                result.readmeMd = possibleResult["readme"];

                resolve(result);
            });

        }).on('error', (e) => {
            reject(e);
        });
    });
}

/**
 * Gets information about 
 * - total issue count
 * - open issue count
 * 
 * @param {string} issueTrackerUrl 
 */
function getIssueStats(issueTrackerUrl) {

    return new Promise(function (resolve, reject) {
        https.get(issueTrackerUrl, response => {
            if (response.statusCode == 404) {
                reject("The issue tracker for this repository could not be found.");
                return;
            }

            let resultText = "";

            response.on('data', data => {
                resultText += data.toString();
            });

            response.on('end', () => {
                let possibleResult = {};
                try {
                    resultText = resultText.substr(resultText.indexOf("id=\"js-issues-toolbar"));

                    var openIssues = /\d+ Open/.exec(resultText)[0].replace(" Open", "");
                    var closedIssues = /\d+ Closed/.exec(resultText)[0].replace(" Closed", "");
                }
                catch (e) {
                    reject("Error parsing html from issue tracker! " + e.message);
                    return;
                }

                let result = {};
                result.openIssues = openIssues;
                result.closedIssues = closedIssues;

                resolve(result);
            });

        }).on('error', (e) => {
            reject(e);
        });
    });
}


module.exports = {};
module.exports.getPackageInfo = getPackageInfo;
module.exports.getPackageDownloads = getPackageDownloads;
module.exports.getIssueStats = getIssueStats;