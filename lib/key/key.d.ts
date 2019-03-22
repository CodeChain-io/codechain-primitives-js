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
