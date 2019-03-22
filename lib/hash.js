"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("./utility");
/**
 * @hidden
 */
const blake = require("blakejs");
/**
 * @hidden
 */
const ripemd = require("ripemd160");
/**
 * Gets data's 256 bit blake hash.
 * @param data buffer or hexadecimal string
 * @returns 32 byte hexadecimal string
 */
exports.blake256 = (data) => {
    if (!(data instanceof Buffer)) {
        data = Buffer.from(data, "hex");
    }
    const context = blake.blake2bInit(32, null);
    blake.blake2bUpdate(context, data);
    return utility_1.toHex(blake.blake2bFinal(context));
};
/**
 * Gets data's 256 bit blake hash by using the key.
 * @param data buffer or hexadecimal string
 * @param key
 * @returns 32 byte hexadecimal string
 */
exports.blake256WithKey = (data, key) => {
    if (!(data instanceof Buffer)) {
        data = Buffer.from(data, "hex");
    }
    const context = blake.blake2bInit(32, key);
    blake.blake2bUpdate(context, data);
    return utility_1.toHex(blake.blake2bFinal(context));
};
/**
 * Gets data's 160 bit blake hash.
 * @param data buffer or hexadecimal string
 * @returns 20 byte hexadecimal string
 */
exports.blake160 = (data) => {
    if (!(data instanceof Buffer)) {
        data = Buffer.from(data, "hex");
    }
    const context = blake.blake2bInit(20, null);
    blake.blake2bUpdate(context, data);
    return utility_1.toHex(blake.blake2bFinal(context));
};
/**
 * Gets data's 160 bit blake hash by using the key.
 * @param data buffer or hexadecimal string
 * @param key
 * @returns 20 byte hexadecimal string
 */
exports.blake160WithKey = (data, key) => {
    if (!(data instanceof Buffer)) {
        data = Buffer.from(data, "hex");
    }
    const context = blake.blake2bInit(20, key);
    blake.blake2bUpdate(context, data);
    return utility_1.toHex(blake.blake2bFinal(context));
};
/**
 * Gets data's 128 bit blake hash.
 * @param data buffer or hexadecimal string
 * @returns 16 byte hexadecimal string
 */
exports.blake128 = (data) => {
    if (!(data instanceof Buffer)) {
        data = Buffer.from(data, "hex");
    }
    const context = blake.blake2bInit(16, null);
    blake.blake2bUpdate(context, data);
    return utility_1.toHex(blake.blake2bFinal(context));
};
/**
 * Gets data's 128 bit blake hash by using the key.
 * @param data buffer or hexadecimal string
 * @param key
 * @returns 16 byte hexadecimal string
 */
exports.blake128WithKey = (data, key) => {
    if (!(data instanceof Buffer)) {
        data = Buffer.from(data, "hex");
    }
    const context = blake.blake2bInit(16, key);
    blake.blake2bUpdate(context, data);
    return utility_1.toHex(blake.blake2bFinal(context));
};
/**
 * Gets data's 160 bit RIPEMD hash.
 * @param data buffer or hexadecimal string
 * @returns 20 byte hexadecimal string
 */
exports.ripemd160 = (data) => {
    if (!(data instanceof Buffer)) {
        data = Buffer.from(data, "hex");
    }
    return new ripemd().update(data).digest("hex");
};
//# sourceMappingURL=hash.js.map