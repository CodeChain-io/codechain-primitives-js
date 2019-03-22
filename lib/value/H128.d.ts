/// <reference types="node" />
export declare type H128Value = H128 | string;
/**
 * Handles 128-bit data.
 */
export declare class H128 {
    static fromBytes(buffer: Buffer): H128;
    static zero(): H128;
    static check(param: any): boolean;
    static ensure(param: H128Value): H128;
    private static checkString;
    value: string;
    constructor(value: string);
    toEncodeObject(): string;
    rlpBytes(): Buffer;
    isEqualTo(rhs: H128): boolean;
    toString(): string;
    toJSON(): string;
}
