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
 * Gets ECDSA signature for message from private key.
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
 * Gets public key from the message and ECDSA signature.
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
