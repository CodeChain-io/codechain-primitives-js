/// <reference types="node" />
import { BigNumber } from "bignumber.js";
export declare type U64Value = U64 | BigNumber | number | string;
/**
 * Handles 64-bit unsigned integers. Used to express nonce, asset amount, etc.
 */
export declare class U64 {
    static MAX_VALUE: U64;
    static plus(lhsValue: U64Value, rhsValue: U64Value): U64;
    static minus(lhsValue: U64Value, rhsValue: U64Value): U64;
    static times(lhsValue: U64Value, rhsValue: U64Value): U64;
    static idiv(lhsValue: U64Value, rhsValue: U64Value): U64;
    static mod(lhsValue: U64Value, rhsValue: U64Value): U64;
    static fromBytes(buffer: Buffer): U64;
    static check(param: any): boolean;
    static ensure(param: U64Value): U64;
    private static checkString;
    readonly value: BigNumber;
    constructor(value: number | string | BigNumber);
    plus(rhsValue: U64Value): U64;
    minus(rhsValue: U64Value): U64;
    times(rhsValue: U64Value): U64;
    idiv(rhsValue: U64Value): U64;
    mod(rhsValue: U64Value): U64;
    toEncodeObject(): string | number;
    rlpBytes(): Buffer;
    isEqualTo(rhs: U64Value): boolean;
    eq(rhs: U64Value): boolean;
    isGreaterThan(rhs: U64Value): boolean;
    gt(rhs: U64Value): boolean;
    isGreaterThanOrEqualTo(rhs: U64Value): boolean;
    gte(rhs: U64Value): boolean;
    isLessThan(rhs: U64Value): boolean;
    lt(rhs: U64Value): boolean;
    isLessThanOrEqualTo(rhs: U64Value): boolean;
    lte(rhs: U64Value): boolean;
    toString(base?: 10 | 16): string;
    toLocaleString(): string;
    toJSON(): string;
}
