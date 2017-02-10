var CryptoJS = require('crypto-js');
var Readable = require('stream').Readable;
// Add your secret passphrase to `cypher` key in package.json
var cypher = require('./package.json').cypher;
var qr = require('qr-image');

module.exports = function qrSvg(dataText) {
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
        var W = 240;
        var S = svgObject.size;
        stream.push('<svg xmlns="http://www.w3.org/2000/svg" ');
        stream.push('width="' + W + '" height="' + W + '" ');
        stream.push('viewBox="0 0 ' + S + ' ' + S + '">');
        stream.push('<path d="');
        stream.push(svgObject.path);
        stream.push('"/>');
        //Push any new path or group information here.
        stream.push('</svg>');
        stream.push(null);
    });
    return stream;
}