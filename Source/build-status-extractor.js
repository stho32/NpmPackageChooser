let https = require("https");

function getBuildStatusImageUrlFromMarkdown(markdownText) {
    let buildStatusRegEx = /\[Build Status\]\((.+?)\)/g;
    let buildStatusImage = buildStatusRegEx.exec(markdownText);

    if (buildStatusImage !== null && buildStatusImage.length == 2) {
        let image = buildStatusImage[1];
        return image;
    }

    return undefined;
}

function getBuildStatusFromText(text) {
    if (text.indexOf(">passing<") > -1)
        return "passing";

    return "not passing";
}

function getBuildStatusFromSvg(svgUrl) {

    return new Promise(function (resolve, reject) {
        https.get(svgUrl, response => {
            if (response.statusCode == 404) {
                reject("Svg " + svgUrl + " could not be found!");
                return;
            }

            if (response.statusCode == 301) {
                let recursivePromise = getBuildStatusFromSvg(response.headers.location);
                recursivePromise.then(
                    (buildStatus) => resolve(buildStatus),
                    (error) => reject(error)
                );
                return;
            }

            let resultText = "";

            response.on('data', data => {
                resultText += data.toString();
            });

            response.on('end', () => {
                try {
                    resolve(getBuildStatusFromText(resultText));
                    return;
                }
                catch (e) {
                    reject("Error parsing svg! " + e.message);
                    return;
                }
            });

        }).on('error', (e) => {
            reject(e);
        });
    });
}


module.exports = {};
module.exports.getBuildStatusImageUrlFromMarkdown = getBuildStatusImageUrlFromMarkdown;
module.exports.getBuildStatusFromSvg = getBuildStatusFromSvg;