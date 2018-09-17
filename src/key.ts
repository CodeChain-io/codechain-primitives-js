import * as _ from "lodash";

/**
 * @hidden
 */
const EC = require("elliptic").ec;
/**
 * @hidden
 */
const secp256k1 = new EC("secp256k1");

export interface EcdsaSignature {
    r: string;
    s: string;
    v: number;
}

/**
 * Gets signature for message from private key.
 * @param message arbitrary length string
 * @param priv 32 byte hexadecimal string of private key
 * @returns r, s, v of ECDSA signature
 */
export const signEcdsa = (message: string, priv: string): EcdsaSignature => {
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
 * @param message arbitrary length string
 * @param signature r, s, v of ECDSA signature
 * @param pub 64 byte hexadecimal string of public key
 * @returns if signature is valid, true. Else false.
 */
export const verifyEcdsa = (
    message: string,
    signature: EcdsaSignature,
    pub: string
): boolean => {
    const key = secp256k1.keyFromPublic("04" + pub, "hex");
    return key.verify(message, signature);
};

/**
 * Gets public key from the message and signature.
 * @param message arbitrary length string
 * @param signature r, s, v of ECDSA signature
 * @returns 64 byte hexadecimal string public key
 */
export const recoverEcdsa = (
    message: string,
    signature: EcdsaSignature
): string => {
    return secp256k1
        .recoverPubKey(
            secp256k1
                .keyFromPrivate(message, "hex")
                .getPrivate()
                .toString(10),
            signature,
            signature.v
        )
        .encode("hex")
        .slice(2);
};

/**
 * Generates a private key.
 * @returns 32 byte hexadecimal string of private key
 */
export const generatePrivateKey = (): string => {
    return _.padStart(secp256k1.genKeyPair().priv.toString("hex"), 64, "0");
};

/**
 * Gets public key from private key.
 * @param priv 32 byte hexadecimal string of private key
 * @returns 64 byte hexadecimal string of public key
 */
export const getPublicFromPrivate = (priv: string): string => {
    const key = secp256k1.keyFromPrivate(priv);
    // Remove prefix "04" which represents it's uncompressed form.
    return key
        .getPublic()
        .encode("hex")
        .slice(2);
};
