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
export declare const signEcdsa: (message: string, priv: string) => EcdsaSignature;
/**
 * Checks if the signature from signEcdsa is correct.
 * @param message arbitrary length string
 * @param signature r, s, v of ECDSA signature
 * @param pub 64 byte hexadecimal string of public key
 * @returns if signature is valid, true. Else false.
 */
export declare const verifyEcdsa: (message: string, signature: EcdsaSignature, pub: string) => boolean;
/**
 * Gets public key from the message and signature.
 * @param message arbitrary length string
 * @param signature r, s, v of ECDSA signature
 * @returns 64 byte hexadecimal string public key
 */
export declare const recoverEcdsa: (message: string, signature: EcdsaSignature) => string;
/**
 * Generates a private key.
 * @returns 32 byte hexadecimal string of private key
 */
export declare const generatePrivateKey: () => string;
/**
 * Gets public key from private key.
 * @param priv 32 byte hexadecimal string of private key
 * @returns 64 byte hexadecimal string of public key
 */
export declare const getPublicFromPrivate: (priv: string) => string;
