/// <reference types="node" />
import { BigNumber } from "bignumber.js";
import { U128, U128Value } from "./U128";
import { U64 } from "./U64";
export declare type U256Value = U256 | U128Value;
/**
 * Handles 256-bit unsigned integers.
 */
export declare class U256 {
    static MAX_VALUE: U256;
    static plus(lhsValue: U256Value, rhsValue: U256Value): U256;
    static minus(lhsValue: U256Value, rhsValue: U256Value): U256;
    static times(lhsValue: U256Value, rhsValue: U256Value): U256;
    static idiv(lhsValue: U256Value, rhsValue: U256Value): U256;
    static mod(lhsValue: U256Value, rhsValue: U256Value): U256;
    static fromBytes(buffer: Buffer): U256;
    static check(param: any): boolean;
    static ensure(param: U256Value): U256;
    private static checkString;
    value: BigNumber;
    constructor(value: number | string | BigNumber | U128 | U64);
    plus(rhsValue: U256Value): U256;
    minus(rhsValue: U256Value): U256;
    times(rhsValue: U256Value): U256;
    idiv(rhsValue: U256Value): U256;
    mod(rhsValue: U256Value): U256;
    /**
     * @deprecated
     */
    increase(): U256;
    toEncodeObject(): string | number;
    rlpBytes(): Buffer;
    isEqualTo(rhs: U256Value): boolean;
    eq(rhs: U256Value): boolean;
    isGreaterThan(rhs: U256Value): boolean;
    gt(rhs: U256Value): boolean;
    isGreaterThanOrEqualTo(rhs: U256Value): boolean;
    gte(rhs: U256Value): boolean;
    isLessThan(rhs: U256Value): boolean;
    lt(rhs: U256Value): boolean;
    isLessThanOrEqualTo(rhs: U256Value): boolean;
    lte(rhs: U256Value): boolean;
    toString(base?: 10 | 16): string;
    toLocaleString(): string;
    toJSON(): string;
}
