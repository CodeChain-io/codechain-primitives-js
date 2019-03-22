"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
const RLP = require("rlp");
/**
 * Handles 512-bit data. Used to express public keys.
 */
class H512 {
    static fromBytes(buffer) {
        const bytes = Array.from(buffer.values());
        const firstByte = bytes.shift();
        const length = bytes.shift();
        if (firstByte !== 0xb8 || length !== 64 || bytes.length !== length) {
            throw Error(`Invalid RLP for H512: ${bytes}`);
        }
        return new H512(bytes
            .map(byte => byte < 0x10
            ? `0${byte.toString(16)}`
            : byte.toString(16))
            .join(""));
    }
    static zero() {
        return new H512("00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
    }
    static check(param) {
        return param instanceof H512 ? true : H512.checkString(param);
    }
    static ensure(param) {
        return param instanceof H512 ? param : new H512(param);
    }
    static checkString(value) {
        return /^(0x)?[0-9a-fA-F]{128}$/.test(value);
    }
    constructor(value) {
        if (!H512.checkString(value)) {
            throw Error(`Expected 64 byte hexstring for creating H512 but found "${value}"`);
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
exports.H512 = H512;
//# sourceMappingURL=H512.js.map