export interface SchnorrSignature {
    r: string;
    s: string;
}
/**
 * Gets Schnorr signature for message from private key.
 * @param message 32 byte hexademical string
 * @param priv 32 byte hexadecimal string of private key
 * @returns r, s of Schnorr signature
 */
export declare const signSchnorr: (message: string, priv: string) => SchnorrSignature;
/**
 * Checks if the signature from signSchnorr is correct.
 * @param message 32 byte hexademical string
 * @param signature r, s of Schnorr signature
 * @param pub 64 byte hexadecimal string of public key
 * @returns if signature is valid, true. Else false.
 */
export declare const verifySchnorr: (message: string, signature: SchnorrSignature, pub: string) => boolean;
/**
 * Gets public key from the message and Schnorr signature.
 * @param message 32 byte hexademical string
 * @param signature r, s of Schnorr signature
 * @returns 64 byte hexadecimal string public key
 */
export declare const recoverSchnorr: (message: string, signature: SchnorrSignature) => string;
