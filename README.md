codechain-primitives-js [![npm version](https://badge.fury.io/js/codechain-primitives.svg)](https://badge.fury.io/js/codechain-primitives) [![Build Status](https://travis-ci.org/CodeChain-io/codechain-primitives-js.svg?branch=master)](https://travis-ci.org/CodeChain-io/codechain-primitives-js) [![codecov](https://codecov.io/gh/CodeChain-io/codechain-primitives-js/branch/master/graph/badge.svg)](https://codecov.io/gh/Codechain-io/codechain-primitives-js)
==============

JavaScript functions and classes for CodeChain primitives

## Installing a package
```sh
# npm
npm install codechain-primitives
# yarn
yarn add codechain-primitives
```

## Getting started
```javascript
// Using require
var primitives = require("codechain-primitives");
var H256 = primitives.H256;
var blake256 = primitives.blake256;

// Using import
import { blake256, H256 } from "codechain-primitives";
```

## Functions
 * blake256
 * blake256WithKey
 * ripemd160
 * signEcdsa
 * verifyEcdsa
 * recoverEcdsa
 * generatePrivateKey
 * getPublicFromPrivate
 * toHex
 * getAccountIdFromPrivate
 * getAccountIdFromPublic

## Classes
 * H128, H160, H256, H512
 * U256
 * AssetTransferAddres
 * PlatformAddress

## API Documentation

Coming soon
