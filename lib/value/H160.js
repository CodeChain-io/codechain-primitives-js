"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
const RLP = require("rlp");
/**
 * Handles 160-bit data. Used to express account addresses.
 */
class H160 {
    static fromBytes(buffer) {
        const bytes = Array.from(buffer.values());
        const length = bytes.shift() - 0x80;
        if (length !== 20 || bytes.length !== length) {
            throw Error(`Invalid RLP for H160: ${bytes}`);
        }
        return new H160(bytes
            .map(byte => byte < 0x10
            ? `0${byte.toString(16)}`
            : byte.toString(16))
            .join(""));
    }
    static zero() {
        return new H160("0000000000000000000000000000000000000000");
    }
    static check(param) {
        return param instanceof H160 ? true : H160.checkString(param);
    }
    static ensure(param) {
        return param instanceof H160 ? param : new H160(param);
    }
    static checkString(value) {
        return /^(0x)?[0-9a-fA-F]{40}$/.test(value);
    }
    constructor(value) {
        if (!H160.checkString(value)) {
            throw Error(`Expected 20 byte hexstring for creating H160 but found "${value}"`);
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
exports.H160 = H160;
//# sourceMappingURL=H160.js.map