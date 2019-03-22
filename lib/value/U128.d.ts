/// <reference types="node" />
import { BigNumber } from "bignumber.js";
import { U64, U64Value } from "./U64";
export declare type U128Value = U128 | U64Value;
/**
 * Handles 128-bit unsigned integers. Used to express nonce, asset amount, etc.
 */
export declare class U128 {
    static MAX_VALUE: U128;
    static plus(lhsValue: U128Value, rhsValue: U128Value): U128;
    static minus(lhsValue: U128Value, rhsValue: U128Value): U128;
    static times(lhsValue: U128Value, rhsValue: U128Value): U128;
    static idiv(lhsValue: U128Value, rhsValue: U128Value): U128;
    static mod(lhsValue: U128Value, rhsValue: U128Value): U128;
    static fromBytes(buffer: Buffer): U128;
    static check(param: any): boolean;
    static ensure(param: U128Value): U128;
    private static checkString;
    readonly value: BigNumber;
    constructor(value: number | string | BigNumber | U64);
    plus(rhsValue: U128Value): U128;
    minus(rhsValue: U128Value): U128;
    times(rhsValue: U128Value): U128;
    idiv(rhsValue: U128Value): U128;
    mod(rhsValue: U128Value): U128;
    toEncodeObject(): string | number;
    rlpBytes(): Buffer;
    isEqualTo(rhs: U128Value): boolean;
    eq(rhs: U128Value): boolean;
    isGreaterThan(rhs: U128Value): boolean;
    gt(rhs: U128Value): boolean;
    isGreaterThanOrEqualTo(rhs: U128Value): boolean;
    gte(rhs: U128Value): boolean;
    isLessThan(rhs: U128Value): boolean;
    lt(rhs: U128Value): boolean;
    isLessThanOrEqualTo(rhs: U128Value): boolean;
    lte(rhs: U128Value): boolean;
    toString(base?: 10 | 16): string;
    toLocaleString(): string;
    toJSON(): string;
}
