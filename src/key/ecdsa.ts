import * as _ from "lodash";

/**
 * @hidden
 */
const EC = require("elliptic").ec;
/**
 * @hidden
 */
const secp256k1 = new EC("secp256k1");

export type EcdsaSignature = string;

/**
 * Gets ECDSA signature for message from private key.
 * @param message 32 byte hexademical string
 * @param priv 32 byte hexadecimal string of private key
 * @returns 65 byte hexadecimal string of ECDSA signature
 */
export const signEcdsa = (message: string, priv: string): EcdsaSignature => {
    if (!/^[0-9a-fA-F]{64}$/.test(message)) {
        throw new Error(`invalid message: ${message}`);
    }
    if (!/^[0-9a-fA-F]{64}$/.test(priv)) {
        throw new Error(`invalid private key: ${priv}`);
    }
    const key = secp256k1.keyFromPrivate(priv);
    const { r, s, recoveryParam: v } = key.sign(message, { canonical: true });
    const paddedR = _.padStart(r.toString(16), 64, "0");
    const paddedS = _.padStart(s.toString(16), 64, "0");
    const paddedV = _.padStart(v.toString(16), 2, "0");
    return `${paddedR}${paddedS}${paddedV}`;
};

/**
 * Checks if the signature from signEcdsa is correct.
 * @param message 32 byte hexademical string
 * @param signature 65 byte hexadecimal string of ECDSA signature
 * @param pub 64 byte hexadecimal string of public key
 * @returns if signature is valid, true. Else false.
 */
export const verifyEcdsa = (
    message: string,
    signature: EcdsaSignature,
    pub: string
): boolean => {
    if (!/^[0-9a-fA-F]{64}$/.test(message)) {
        throw new Error(`invalid message: ${message}`);
    }
    if (!/^(0x)?[0-9a-fA-F]{130}$/.test(signature)) {
        throw new Error(`invalid signature: ${signature}`);
    }
    if (signature.startsWith("0x")) {
        signature = signature.substr(2);
    }
    const r = `${signature.substr(0, 64)}`;
    const s = `${signature.substr(64, 64)}`;
    const v = Number.parseInt(signature.substr(128, 2), 16);
    if (v < 0 || v > 3) {
        throw new Error(`invalid recoveryParam v: ${v}`);
    }
    if (!/^[0-9a-fA-F]{128}$/.test(pub)) {
        throw new Error(`invalid public key: ${pub}`);
    }
    const key = secp256k1.keyFromPublic("04" + pub, "hex");
    return key.verify(message, { r, s, v });
};

/**
 * Gets public key from the message and ECDSA signature.
 * @param message 32 byte hexademical string
 * @param signature 65 byte hexadecimal string of ECDSA signature
 * @returns 64 byte hexadecimal string public key
 */
export const recoverEcdsa = (
    message: string,
    signature: EcdsaSignature
): string => {
    if (!/^[0-9a-fA-F]{64}$/.test(message)) {
        throw new Error(`invalid message: ${message}`);
    }
    if (!/^(0x)?[0-9a-fA-F]{130}$/.test(signature)) {
        throw new Error(`invalid signature: ${signature}`);
    }
    if (signature.startsWith("0x")) {
        signature = signature.substr(2);
    }
    const r = `${signature.substr(0, 64)}`;
    const s = `${signature.substr(64, 64)}`;
    const v = Number.parseInt(signature.substr(128, 2), 16);
    if (v < 0 || v > 3) {
        throw new Error(`invalid recoveryParam v: ${v}`);
    }
    return secp256k1
        .recoverPubKey(
            secp256k1
                .keyFromPrivate(message, "hex")
                .getPrivate()
                .toString(10),
            { r, s, v },
            v
        )
        .encode("hex")
        .slice(2);
};
