export interface EcdsaSignature {
    r: string;
    s: string;
    v: number;
}
/**
 * Gets ECDSA signature for message from private key.
 * @param message 32 byte hexademical string
 * @param priv 32 byte hexadecimal string of private key
 * @returns r, s, v of ECDSA signature
 */
export declare const signEcdsa: (message: string, priv: string) => EcdsaSignature;
/**
 * Checks if the signature from signEcdsa is correct.
 * @param message 32 byte hexademical string
 * @param signature r, s, v of ECDSA signature
 * @param pub 64 byte hexadecimal string of public key
 * @returns if signature is valid, true. Else false.
 */
export declare const verifyEcdsa: (message: string, signature: EcdsaSignature, pub: string) => boolean;
/**
 * Gets public key from the message and ECDSA signature.
 * @param message 32 byte hexademical string
 * @param signature r, s, v of ECDSA signature
 * @returns 64 byte hexadecimal string public key
 */
export declare const recoverEcdsa: (message: string, signature: EcdsaSignature) => string;
