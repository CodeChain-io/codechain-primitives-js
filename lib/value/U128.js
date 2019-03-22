"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = require("bignumber.js");
const utility_1 = require("../utility");
const U64_1 = require("./U64");
/**
 * @hidden
 */
const RLP = require("rlp");
/**
 * Handles 128-bit unsigned integers. Used to express nonce, asset amount, etc.
 */
class U128 {
    constructor(value) {
        this.value = new bignumber_js_1.BigNumber(value instanceof U64_1.U64 ? value.value : value);
        if (!this.value.isInteger() || this.value.isNegative()) {
            throw Error(`U128 must be a positive integer but found ${value}`);
        }
        else if (this.value.toString(16).length > 32) {
            this.value = U128.MAX_VALUE.value;
        }
    }
    static plus(lhsValue, rhsValue) {
        const lhs = U128.ensure(lhsValue);
        const rhs = U128.ensure(rhsValue);
        const result = lhs.value.plus(rhs.value);
        if (result.isGreaterThan(U128.MAX_VALUE.value)) {
            throw Error(`Integer overflow`);
        }
        return new U128(result);
    }
    static minus(lhsValue, rhsValue) {
        const lhs = U128.ensure(lhsValue);
        const rhs = U128.ensure(rhsValue);
        if (lhs.isLessThan(rhs)) {
            throw Error(`Integer underflow`);
        }
        return new U128(lhs.value.minus(rhs.value));
    }
    static times(lhsValue, rhsValue) {
        const lhs = U128.ensure(lhsValue);
        const rhs = U128.ensure(rhsValue);
        const result = lhs.value.times(rhs.value);
        if (result.isGreaterThan(U128.MAX_VALUE.value)) {
            throw Error(`Integer overflow`);
        }
        return new U128(result);
    }
    static idiv(lhsValue, rhsValue) {
        const lhs = U128.ensure(lhsValue);
        const rhs = U128.ensure(rhsValue);
        if (rhs.isEqualTo(0)) {
            throw Error(`Divided by 0`);
        }
        return new U128(lhs.value.idiv(rhs.value));
    }
    static mod(lhsValue, rhsValue) {
        const lhs = U128.ensure(lhsValue);
        const rhs = U128.ensure(rhsValue);
        if (rhs.isEqualTo(0)) {
            throw Error(`Divided by 0`);
        }
        return new U128(lhs.value.mod(rhs.value));
    }
    static fromBytes(buffer) {
        const bytes = Array.from(buffer.values());
        const length = bytes.shift() - 0x80;
        if (bytes.length !== length) {
            throw Error(`Invalid RLP for U128: ${bytes}`);
        }
        else if (length > 16) {
            throw Error("Buffer for U128 must be less than or equal to 16");
        }
        else if (length === 0) {
            return new U128(0);
        }
        return new U128("0x" +
            bytes
                .map(byte => byte < 0x10
                ? `0${byte.toString(16)}`
                : byte.toString(16))
                .join(""));
    }
    static check(param) {
        if (param instanceof U128 || param instanceof U64_1.U64) {
            return true;
        }
        else if (param instanceof bignumber_js_1.BigNumber) {
            return param.isInteger() && !param.isNegative();
        }
        else if (typeof param === "number") {
            return Number.isInteger(param) && param >= 0;
        }
        else {
            return U128.checkString(param);
        }
    }
    static ensure(param) {
        return param instanceof U128 ? param : new U128(param);
    }
    static checkString(param) {
        if (typeof param !== "string") {
            return false;
        }
        const num = new bignumber_js_1.BigNumber(param);
        return num.isInteger() && !num.isNegative();
    }
    plus(rhsValue) {
        return U128.plus(this, rhsValue);
    }
    minus(rhsValue) {
        return U128.minus(this, rhsValue);
    }
    times(rhsValue) {
        return U128.times(this, rhsValue);
    }
    idiv(rhsValue) {
        return U128.idiv(this, rhsValue);
    }
    mod(rhsValue) {
        return U128.mod(this, rhsValue);
    }
    toEncodeObject() {
        const hex = this.value.toString(16);
        // NOTE: workaround that RLP.encode("0x0") results to 00
        if (hex === "0") {
            return 0;
        }
        else {
            return hex.length % 2 === 0 ? `0x${hex}` : `0x0${hex}`;
        }
    }
    rlpBytes() {
        return RLP.encode(this.toEncodeObject());
    }
    isEqualTo(rhs) {
        return this.value.isEqualTo(U128.ensure(rhs).value);
    }
    eq(rhs) {
        return this.isEqualTo(rhs);
    }
    isGreaterThan(rhs) {
        return this.value.isGreaterThan(U128.ensure(rhs).value);
    }
    gt(rhs) {
        return this.isGreaterThan(rhs);
    }
    isGreaterThanOrEqualTo(rhs) {
        return this.value.isGreaterThanOrEqualTo(U128.ensure(rhs).value);
    }
    gte(rhs) {
        return this.isGreaterThanOrEqualTo(rhs);
    }
    isLessThan(rhs) {
        return this.value.isLessThan(U128.ensure(rhs).value);
    }
    lt(rhs) {
        return this.isLessThan(rhs);
    }
    isLessThanOrEqualTo(rhs) {
        return this.value.isLessThanOrEqualTo(U128.ensure(rhs).value);
    }
    lte(rhs) {
        return this.isLessThanOrEqualTo(rhs);
    }
    toString(base) {
        return this.value.toString(base || 10);
    }
    toLocaleString() {
        return utility_1.toLocaleString(this.value);
    }
    toJSON() {
        return `0x${this.value.toString(16)}`;
    }
}
U128.MAX_VALUE = new U128(new bignumber_js_1.BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"));
exports.U128 = U128;
//# sourceMappingURL=U128.js.map