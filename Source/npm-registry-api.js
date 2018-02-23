let npmRegistryUrl = "https://registry.npmjs.org/";
let https = require("https");
let moment = require("moment");

function getPackageDownloads(packageName, onResultAvailable) {
    let dayCount = 7;

    let fromDate = moment().startOf("day").add(-dayCount, "day").format("YYYY-MM-DD");
    let tillDate = moment().startOf("day").add(-1, "days").format("YYYY-MM-DD");

    let url = `https://api.npmjs.org/downloads/range/${fromDate}:${tillDate}` + 
        `/${packageName}`;
    
    https.get(url, response => {
        if ( response.statusCode == 404 ) {
            onResultAvailable({
                    errorMessage: "A package with the name '" + packageName + "' could not be found."
                });
            return;
        }

        let resultText = "";
    
        response.on('data', data => {
            resultText += data.toString();
        });

        response.on('end', () => {
            let possibleResult = {};
            let sumLast7Days = 0;
            try
            {
                possibleResult = JSON.parse(resultText);

                for (let i = 0; i < possibleResult.downloads.length; i++) {
                    sumLast7Days += possibleResult.downloads[i].downloads;
                }
            }
            catch(e) {
                console.error("Error parsing json from npm! " + e.message)
            }

            onResultAvailable(sumLast7Days);
        });
    
    }).on('error', (e) => {
      console.error(e);
    });
}

function getPackageInfo(packageName, onResultAvailable) {
    
    https.get(npmRegistryUrl + packageName, response => {
        if ( response.statusCode == 404 ) {
            onResultAvailable({
                    errorMessage: "A package with the name '" + packageName + "' could not be found."
                });
            return;
        }

        let resultText = "";
    
        response.on('data', data => {
            resultText += data.toString();
        });

        response.on('end', () => {
            let possibleResult = {};
            try
            {
                //console.log(resultText);
                possibleResult = JSON.parse(resultText);
                //console.dir(possibleResult);
            }
            catch(e) {
                console.error("Error parsing json from npm! " + e.message)
            }

            let result = {}
            result.latestVersion = possibleResult["dist-tags"].latest;
            result.releaseDate   = possibleResult["time"][result.latestVersion];
            result.releaseCount  = Object.keys(possibleResult["versions"]).length;

            onResultAvailable(result);
        });
    
    }).on('error', (e) => {
      console.error(e);
    });
}

module.exports = {};
module.exports.getPackageInfo      = getPackageInfo;
module.exports.getPackageDownloads = getPackageDownloads;