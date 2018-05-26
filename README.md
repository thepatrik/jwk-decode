# jwk-decode

[![Build Status](https://travis-ci.org/thepatrik/jwk-decode.svg?branch=master)](https://travis-ci.org/thepatrik/jwk-decode)

Small Node.js cli for generating a PEM file from a JWK file or decoding a jwt token directly from a JWK file.

## Usage

Install node dependencies

    npm install

Usage

    node . --file=path-to-jwk-file [--token=token] [--output=path-to-output-file]
