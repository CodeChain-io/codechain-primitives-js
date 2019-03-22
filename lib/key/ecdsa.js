"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
const EC = require("elliptic").ec;
/**
 * @hidden
 */
const secp256k1 = new EC("secp256k1");
/**
 * Gets ECDSA signature for message from private key.
 * @param message 32 byte hexademical string
 * @param priv 32 byte hexadecimal string of private key
 * @returns r, s, v of ECDSA signature
 */
exports.signEcdsa = (message, priv) => {
    if (!/^[0-9a-fA-F]{64}$/.test(message)) {
        throw new Error(`invalid message: ${message}`);
    }
    if (!/^[0-9a-fA-F]{64}$/.test(priv)) {
        throw new Error(`invalid private key: ${priv}`);
    }
    const key = secp256k1.keyFromPrivate(priv);
    const { r, s, recoveryParam: v } = key.sign(message, { canonical: true });
    return {
        r: r.toString("hex"),
        s: s.toString("hex"),
        v
    };
};
/**
 * Checks if the signature from signEcdsa is correct.
 * @param message 32 byte hexademical string
 * @param signature r, s, v of ECDSA signature
 * @param pub 64 byte hexadecimal string of public key
 * @returns if signature is valid, true. Else false.
 */
exports.verifyEcdsa = (message, signature, pub) => {
    if (!/^[0-9a-fA-F]{64}$/.test(message)) {
        throw new Error(`invalid message: ${message}`);
    }
    if (!/^[0-9a-fA-F]{1,64}$/.test(signature.r) ||
        !/^[0-9a-fA-F]{1,64}$/.test(signature.s) ||
        signature.v < 0 ||
        signature.v > 3) {
        throw new Error(`invalid signature: ${signature}`);
    }
    if (!/^[0-9a-fA-F]{128}$/.test(pub)) {
        throw new Error(`invalid public key: ${pub}`);
    }
    const key = secp256k1.keyFromPublic("04" + pub, "hex");
    return key.verify(message, signature);
};
/**
 * Gets public key from the message and ECDSA signature.
 * @param message 32 byte hexademical string
 * @param signature r, s, v of ECDSA signature
 * @returns 64 byte hexadecimal string public key
 */
exports.recoverEcdsa = (message, signature) => {
    if (!/^[0-9a-fA-F]{64}$/.test(message)) {
        throw new Error(`invalid message: ${message}`);
    }
    if (!/^[0-9a-fA-F]{1,64}$/.test(signature.r) ||
        !/^[0-9a-fA-F]{1,64}$/.test(signature.s) ||
        signature.v < 0 ||
        signature.v > 3) {
        throw new Error(`invalid signature: ${signature}`);
    }
    return secp256k1
        .recoverPubKey(secp256k1
        .keyFromPrivate(message, "hex")
        .getPrivate()
        .toString(10), signature, signature.v)
        .encode("hex")
        .slice(2);
};
//# sourceMappingURL=ecdsa.js.map