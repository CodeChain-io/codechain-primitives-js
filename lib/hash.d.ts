/// <reference types="node" />
/**
 * Gets data's 256 bit blake hash.
 * @param data buffer or hexadecimal string
 * @returns 32 byte hexadecimal string
 */
export declare const blake256: (data: string | Buffer) => string;
/**
 * Gets data's 256 bit blake hash by using the key.
 * @param data buffer or hexadecimal string
 * @param key
 * @returns 32 byte hexadecimal string
 */
export declare const blake256WithKey: (data: string | Buffer, key: Uint8Array) => string;
/**
 * Gets data's 160 bit blake hash.
 * @param data buffer or hexadecimal string
 * @returns 20 byte hexadecimal string
 */
export declare const blake160: (data: string | Buffer) => string;
/**
 * Gets data's 160 bit blake hash by using the key.
 * @param data buffer or hexadecimal string
 * @param key
 * @returns 20 byte hexadecimal string
 */
export declare const blake160WithKey: (data: string | Buffer, key: Uint8Array) => string;
/**
 * Gets data's 128 bit blake hash.
 * @param data buffer or hexadecimal string
 * @returns 16 byte hexadecimal string
 */
export declare const blake128: (data: string | Buffer) => string;
/**
 * Gets data's 128 bit blake hash by using the key.
 * @param data buffer or hexadecimal string
 * @param key
 * @returns 16 byte hexadecimal string
 */
export declare const blake128WithKey: (data: string | Buffer, key: Uint8Array) => string;
/**
 * Gets data's 160 bit RIPEMD hash.
 * @param data buffer or hexadecimal string
 * @returns 20 byte hexadecimal string
 */
export declare const ripemd160: (data: string | Buffer) => string;
