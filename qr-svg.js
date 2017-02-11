var CryptoJS = require('crypto-js');
var Readable = require('stream').Readable;
// Add your secret passphrase to `cypher` key in package.json
var cypher = require('./package.json').cypher;
var qr = require('qr-image');
//Ideal QR width, but can be higher
var BASELINE_WIDTH_QR = 240;
//Ideal size width within the QR
var BASELINE_WIDTH_LOGO = 40;

var customLogoSvg = function (stream, fillColor) {
    var rWidth = (BASELINE_WIDTH_LOGO / BASELINE_WIDTH_QR) * 100;
    var rWidthHalf = rWidth / 2;
    stream.push('<svg xmlns="http://www.w3.org/2000/svg" ')
    //Add width and height as percentages of the qr dimensions
    stream.push('width="' + rWidth + '%" height="' + rWidth + '%" ');
    //Position the login in the center of the QR
    stream.push('x="' + (50 - rWidthHalf) + '%" y="' + (50 - rWidthHalf) + '%" ');
    stream.push('viewBox="0 0 40 40" ');
    stream.push('>');
    stream.push('<circle cx="20" cy="20" r="20" fill="#fff"/>');
    stream.push('<circle cx="20" cy="20" r="18" fill="#fff" stroke="' + fillColor + '" stroke-miterlimit="10"/>');
    stream.push('<path d="M19.79,27.63a2,2,0,0,1,2.06-1.93h2.23a1.61,1.61,0,0,0,1.61-1.61V21.84a1.6,1.6,0,0,0-1.61-1.61H21.69a2,2,0,0,1-1.93-2.06V15.75a2,2,0,0,1,2.06-1.94h2.25a1.6,1.6,0,0,0,1.61-1.6V10a1.61,1.61,0,0,0-1.61-1.61H21.84A1.61,1.61,0,0,0,20.23,10v2.25A2,2,0,0,1,18.3,14.3H15.93a1.61,1.61,0,0,0-1.61,1.61v2.25a1.61,1.61,0,0,0,1.61,1.61h2.27a2,2,0,0,1,2.06,1.94v2.42a2,2,0,0,1-1.94,2H15.93a1.61,1.61,0,0,0-1.61,1.61V30a1.61,1.61,0,0,0,1.61,1.61h2.25A1.61,1.61,0,0,0,19.78,30Z" fill="' + fillColor + '"/>');
    stream.push('</svg>');
};

module.exports = function qrSvg(dataText, qrColor) {
    var fillColor = qrColor || '#1D1D1D';
    var stream = new Readable();
    //Encrypt the `dataText` using AES encryption and `cypher`;
    var encryptedText = CryptoJS.AES.encrypt(dataText, cypher);

    //To Decrypt the encrypted text use the following snippet
    //console.log(CryptoJS.AES.decrypt(encryptedText.toString(), cypher).toString(CryptoJS.enc.Utf8));

    //Return the SVG object from the qr-image node module
    var svgObject = qr.svgObject(encryptedText.toString(), {
        ec_level: 'M'
    });
    stream._read = function () {}; //noop
    process.nextTick(function () {
        var W = BASELINE_WIDTH_QR; //Increase the default width here 
        var S = svgObject.size;
        stream.push('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" ');
        stream.push('width="' + W + '" height="' + W + '" ');
        stream.push('viewBox="0 0 ' + S + ' ' + S + '">');
        stream.push('<path d="');
        stream.push(svgObject.path);
        stream.push('" fill="' + fillColor + '"/>');
        //Push any new path or group information here.
        customLogoSvg(stream, fillColor);
        stream.push('</svg>');
        stream.push(null);
    });
    return stream;
}