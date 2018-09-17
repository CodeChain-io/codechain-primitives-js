/**
 * @hidden
 */
const blake = require("blakejs");
/**
 * @hidden
 */
const ripemd = require("ripemd160");

const toHexByte = (byte: number) =>
    byte < 0x10 ? `0${byte.toString(16)}` : byte.toString(16);

/**
 * Converts buffer to hexadecimal string.
 * @param buffer arbritrary length of data
 * @returns hexadecimal string
 */
export const toHex = (buffer: Buffer): string => {
    return Array.from(buffer)
        .map(toHexByte)
        .join("");
};

/**
 * Gets data's 256 bit blake hash.
 * @param data buffer or hexadecimal string
 * @returns 32 byte hexadecimal string
 */
export const blake256 = (data: Buffer | string): string => {
    if (!(data instanceof Buffer)) {
        data = Buffer.from(data, "hex");
    }
    const context = blake.blake2bInit(32, null);
    blake.blake2bUpdate(context, data);
    return toHex(blake.blake2bFinal(context));
};

/**
 * Gets data's 256 bit blake hash by using the key.
 * @param data buffer or hexadecimal string
 * @param key
 * @returns 32 byte hexadecimal string
 */
export const blake256WithKey = (
    data: Buffer | string,
    key: Uint8Array
): string => {
    if (!(data instanceof Buffer)) {
        data = Buffer.from(data, "hex");
    }
    const context = blake.blake2bInit(32, key);
    blake.blake2bUpdate(context, data);
    return toHex(blake.blake2bFinal(context));
};

/**
 * Gets data's 160 bit RIPEMD hash.
 * @param data buffer or hexadecimal string
 * @returns 20 byte hexadecimal string
 */
export const ripemd160 = (data: Buffer | string): string => {
    if (!(data instanceof Buffer)) {
        data = Buffer.from(data, "hex");
    }
    return new ripemd().update(data).digest("hex");
};
