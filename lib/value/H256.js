"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @hidden
 */
const RLP = require("rlp");
/**
 * Handles 256-bit data. Used to express block hash, parcel hash, transaction hash, merkle root, etc.
 */
class H256 {
    static fromBytes(buffer) {
        const bytes = Array.from(buffer.values());
        const length = bytes.shift() - 0x80;
        if (length !== 32 || bytes.length !== length) {
            throw Error(`Invalid RLP for H256: ${bytes}`);
        }
        return new H256(bytes
            .map(byte => byte < 0x10
            ? `0${byte.toString(16)}`
            : byte.toString(16))
            .join(""));
    }
    static zero() {
        return new H256("0000000000000000000000000000000000000000000000000000000000000000");
    }
    static check(param) {
        return param instanceof H256 ? true : H256.checkString(param);
    }
    static ensure(param) {
        return param instanceof H256 ? param : new H256(param);
    }
    static checkString(value) {
        return /^(0x)?[0-9a-fA-F]{64}$/.test(value);
    }
    constructor(value) {
        if (!H256.checkString(value)) {
            throw Error(`Expected 32 byte hexstring for creating H256 but found "${value}"`);
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
exports.H256 = H256;
//# sourceMappingURL=H256.js.map