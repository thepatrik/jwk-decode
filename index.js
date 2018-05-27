"use strict";
const fs = require("fs");
const util = require("util");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const argv = require("yargs").argv;
let file = argv.file;
let token = argv.token;
let output = argv.output;

if (!file) {
    console.log("No file parameter!");
    console.log("Usage: node . --file=path-to-jwk-file [--token=token] [--output=path-to-output-file]");
    return;
}

main(file, output, token);

function main(file, output, token) {
    readFileAsync(file).then(res => {
        const jwk = JSON.parse(res.toString());
        let pem = jwkToPem(jwk);
        if (output) {
            console.log("Writing PEM file to", output + "...");
            writeFileAsync(output, pem).then(() => {
                console.log("Done");
            }).catch(err => {
                console.log("Got error", err);
            });
        } else {
            console.log(pem);
        }

        if (token) {
            decodeAsync(token, pem).then(payload => {
                console.log(payload);
            });
        }
    });
}

function decodeAsync(token, pem) {
    return new Promise(resolve => {
        jwt.verify(token, pem, (err, decoded) => {
            if (err) console.log("Token could not be verified:", err.message);
            if (decoded) return resolve(decoded);

            let payload = jwt.decode(token);
            resolve(payload);
        });
    });
}
