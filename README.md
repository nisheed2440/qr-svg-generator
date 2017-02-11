# QR SVG Generator

Sample application created to implement QR code generation from the server with encrypted data.

Thanks to [@alexeyten](https://github.com/alexeyten) for creating the [qr-image](https://www.npmjs.com/package/qr-image "qr-image") npm module. This application builds on top of the [qr-image](https://www.npmjs.com/package/qr-image "qr-image") library with added functionality for `color` and `logo`.

![alt text][logo]

## Installation
To begin run `npm install`.

After the modules are installed run `node server.js`to start the application. The server will load @ `http://localhost:3000`.

Try scanning the QR code with your mobile device. You should see an encrypted data string.

###Changing the `cypher` text
In `package.json` just update the key `cypher` with the new passphrase.

###Changing the `QR color`
To change the color of the QR code just add the `color` parameter to the image link as follows

```
/qr-image?color=<HEX CODE>

eg.

/qr-image?color=DE2728
```

Checkout `index.html` for more examples.

[logo]: screen-grab.png "Screen Shot"
