let https = require("https");

function getBuildStatusImageUrlFromMarkdown(markdownText, onResultAvailable) {
    let buildStatusRegEx = /\[Build Status\]\((.+?)\)/g;
    let buildStatusImage = buildStatusRegEx.exec(markdownText);

    if ( buildStatusImage !== null && buildStatusImage.length == 2 ) {
        let image = buildStatusImage[1];
        return image;
    }

    return undefined; 
}

function getBuildStatusFromText(text) {
    if ( text.indexOf(">passing<") > -1 ) 
        return "passing";

    return "not passing";
}

function getBuildStatusFromSvg(svgUrl, onResultAvailable) {
    https.get(svgUrl, response => {
        if ( response.statusCode == 404 ) {
            onResultAvailable({
                    errorMessage: "Svg " + svgUrl + " could not be found!"
                });
            return;
        }

        if ( response.statusCode == 301 ) {
            return(getBuildStatusFromSvg(response.headers.location, onResultAvailable));
        }

        let resultText = "";
    
        response.on('data', data => {
            resultText += data.toString();
        });

        response.on('end', () => {
            try
            {
                onResultAvailable(getBuildStatusFromText(resultText));
                return;
            }
            catch(e) {
                console.error("Error parsing svg! " + e.message)
            }

            onResultAvailable(undefined);
        });
    
    }).on('error', (e) => {
      console.error(e);
    });
}


module.exports = {};
module.exports.getBuildStatusImageUrlFromMarkdown = getBuildStatusImageUrlFromMarkdown;
module.exports.getBuildStatusFromSvg = getBuildStatusFromSvg;