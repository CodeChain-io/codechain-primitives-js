"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
const RLP = require("rlp");
/**
 * Handles 128-bit data.
 */
class H128 {
    static fromBytes(buffer) {
        const bytes = Array.from(buffer.values());
        const length = bytes.shift() - 0x80;
        if (length !== 16 || bytes.length !== length) {
            throw Error(`Invalid RLP for H128: ${bytes}`);
        }
        return new H128(bytes
            .map(byte => byte < 0x10
            ? `0${byte.toString(16)}`
            : byte.toString(16))
            .join(""));
    }
    static zero() {
        return new H128("00000000000000000000000000000000");
    }
    static check(param) {
        return param instanceof H128 ? true : H128.checkString(param);
    }
    static ensure(param) {
        return param instanceof H128 ? param : new H128(param);
    }
    static checkString(value) {
        return /^(0x)?[0-9a-fA-F]{32}$/.test(value);
    }
    constructor(value) {
        if (!H128.checkString(value)) {
            throw Error(`Expected 16 byte hexstring for creating H128 but found "${value}"`);
        }
        this.value = value.startsWith("0x")
            ? value.slice(2).toLowerCase()
            : value.toLowerCase();
    }
    toEncodeObject() {
        return `0x${this.value}`;
    }
    rlpBytes() {
        return RLP.encode(this.toEncodeObject());
    }
    isEqualTo(rhs) {
        return this.value === rhs.value;
    }
    toString() {
        return this.value;
    }
    toJSON() {
        return `0x${this.value}`;
    }
}
exports.H128 = H128;
//# sourceMappingURL=H128.js.map