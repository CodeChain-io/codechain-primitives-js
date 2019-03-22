"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
/**
 * @hidden
 */
const EC = require("elliptic").ec;
/**
 * @hidden
 */
const secp256k1 = new EC("secp256k1");
/**
 * Generates a private key.
 * @returns 32 byte hexadecimal string of private key
 */
exports.generatePrivateKey = () => {
    return _.padStart(secp256k1.genKeyPair().priv.toString("hex"), 64, "0");
};
/**
 * Gets public key from private key.
 * @param priv 32 byte hexadecimal string of private key
 * @returns 64 byte hexadecimal string of public key
 */
exports.getPublicFromPrivate = (priv) => {
    const key = secp256k1.keyFromPrivate(priv);
    // Remove prefix "04" which represents it's uncompressed form.
    return key
        .getPublic()
        .encode("hex")
        .slice(2);
};
//# sourceMappingURL=key.js.map