"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = require("./hash");
const key_1 = require("./key/key");
/**
 * @hidden
 */
const toHexByte = (byte) => byte < 0x10 ? `0${byte.toString(16)}` : byte.toString(16);
/**
 * Converts buffer to hexadecimal string.
 * @param buffer arbritrary length of data
 * @returns hexadecimal string
 */
exports.toHex = (buffer) => {
    return Array.from(buffer)
        .map(toHexByte)
        .join("");
};
/**
 * Gets account id from private key.
 * @param priv 32 byte hexadecimal string of private key
 * @returns 20 byte hexadecimal string of account id
 */
exports.getAccountIdFromPrivate = (priv) => {
    const publicKey = key_1.getPublicFromPrivate(priv);
    return exports.getAccountIdFromPublic(publicKey);
};
/**
 * Gets account id from the given public key.
 * @param publicKey 64 byte hexadecimal string of uncompressed public key
 * @returns 20 byte hexadecimal string of account id
 */
exports.getAccountIdFromPublic = (publicKey) => {
    return hash_1.blake160(publicKey);
};
/**
 * Converts BigNumber to formatted number string
 * Default decimalSeparator is point: "."
 * Default groupSeparator is comma; ","
 * Default groupSize is 3
 * @param num BigNumber object
 * @returns formatted number string
 */
exports.toLocaleString = (num) => {
    return num.toFormat();
};
//# sourceMappingURL=utility.js.map