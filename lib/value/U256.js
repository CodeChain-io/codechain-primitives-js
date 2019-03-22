"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bignumber_js_1 = require("bignumber.js");
const utility_1 = require("../utility");
const U128_1 = require("./U128");
const U64_1 = require("./U64");
/**
 * @hidden
 */
const RLP = require("rlp");
/**
 * Handles 256-bit unsigned integers.
 */
class U256 {
    constructor(value) {
        this.value = new bignumber_js_1.BigNumber(value instanceof U128_1.U128 || value instanceof U64_1.U64 ? value.value : value);
        if (!this.value.isInteger() || this.value.isNegative()) {
            throw Error(`U256 must be a positive integer but found ${value}`);
        }
        else if (this.value.toString(16).length > 64) {
            this.value = U256.MAX_VALUE.value;
        }
    }
    static plus(lhsValue, rhsValue) {
        const lhs = U256.ensure(lhsValue);
        const rhs = U256.ensure(rhsValue);
        const result = lhs.value.plus(rhs.value);
        if (result.isGreaterThan(U256.MAX_VALUE.value)) {
            throw Error(`Integer overflow`);
        }
        return new U256(result);
    }
    static minus(lhsValue, rhsValue) {
        const lhs = U256.ensure(lhsValue);
        const rhs = U256.ensure(rhsValue);
        if (lhs.isLessThan(rhs)) {
            throw Error(`Integer underflow`);
        }
        return new U256(lhs.value.minus(rhs.value));
    }
    static times(lhsValue, rhsValue) {
        const lhs = U256.ensure(lhsValue);
        const rhs = U256.ensure(rhsValue);
        const result = lhs.value.times(rhs.value);
        if (result.isGreaterThan(U256.MAX_VALUE.value)) {
            throw Error(`Integer overflow`);
        }
        return new U256(result);
    }
    static idiv(lhsValue, rhsValue) {
        const lhs = U256.ensure(lhsValue);
        const rhs = U256.ensure(rhsValue);
        if (rhs.isEqualTo(0)) {
            throw Error(`Divided by 0`);
        }
        return new U256(lhs.value.idiv(rhs.value));
    }
    static mod(lhsValue, rhsValue) {
        const lhs = U256.ensure(lhsValue);
        const rhs = U256.ensure(rhsValue);
        if (rhs.isEqualTo(0)) {
            throw Error(`Divided by 0`);
        }
        return new U256(lhs.value.mod(rhs.value));
    }
    static fromBytes(buffer) {
        const bytes = Array.from(buffer.values());
        const length = bytes.shift() - 0x80;
        if (bytes.length !== length) {
            throw Error(`Invalid RLP for U256: ${bytes}`);
        }
        else if (length > 32) {
            throw Error("Buffer for U256 must be less than or equal to 32");
        }
        else if (length === 0) {
            return new U256(0);
        }
        return new U256("0x" +
            bytes
                .map(byte => byte < 0x10
                ? `0${byte.toString(16)}`
                : byte.toString(16))
                .join(""));
    }
    static check(param) {
        if (param instanceof U256 ||
            param instanceof U128_1.U128 ||
            param instanceof U64_1.U64) {
            return true;
        }
        else if (param instanceof bignumber_js_1.BigNumber) {
            return param.isInteger() && !param.isNegative();
        }
        else if (typeof param === "number") {
            return Number.isInteger(param) && param >= 0;
        }
        else {
            return U256.checkString(param);
        }
    }
    static ensure(param) {
        return param instanceof U256
            ? param
            : new U256(param instanceof U128_1.U128 || param instanceof U64_1.U64
                ? param.value
                : param);
    }
    static checkString(param) {
        if (typeof param !== "string") {
            return false;
        }
        const num = new bignumber_js_1.BigNumber(param);
        return num.isInteger() && !num.isNegative();
    }
    plus(rhsValue) {
        return U256.plus(this, rhsValue);
    }
    minus(rhsValue) {
        return U256.minus(this, rhsValue);
    }
    times(rhsValue) {
        return U256.times(this, rhsValue);
    }
    idiv(rhsValue) {
        return U256.idiv(this, rhsValue);
    }
    mod(rhsValue) {
        return U256.mod(this, rhsValue);
    }
    /**
     * @deprecated
     */
    increase() {
        console.warn("U256 increase() is deprecated. Use U256.plus() instead.");
        return new U256(this.value.plus(1));
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
        return this.value.isEqualTo(U256.ensure(rhs).value);
    }
    eq(rhs) {
        return this.isEqualTo(rhs);
    }
    isGreaterThan(rhs) {
        return this.value.isGreaterThan(U256.ensure(rhs).value);
    }
    gt(rhs) {
        return this.isGreaterThan(rhs);
    }
    isGreaterThanOrEqualTo(rhs) {
        return this.value.isGreaterThanOrEqualTo(U256.ensure(rhs).value);
    }
    gte(rhs) {
        return this.isGreaterThanOrEqualTo(rhs);
    }
    isLessThan(rhs) {
        return this.value.isLessThan(U256.ensure(rhs).value);
    }
    lt(rhs) {
        return this.isLessThan(rhs);
    }
    isLessThanOrEqualTo(rhs) {
        return this.value.isLessThanOrEqualTo(U256.ensure(rhs).value);
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
U256.MAX_VALUE = new U256(new bignumber_js_1.BigNumber("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"));
exports.U256 = U256;
//# sourceMappingURL=U256.js.map