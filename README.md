# qr-svg-generator

Sample application created to implement QR code generation from the server with encrypted data.

## Installation
To begin run `npm install`.

After the modules are installed run `node server.js`to start the application. The server will load @ `http://localhost:3000`.

Try scanning the QR code with your mobile device. You should see an encrypted data string.

###Changing the `cypher` text
In `package.json` just update the key `cypher` with the new passphrase.
