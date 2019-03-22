/// <reference types="node" />
export declare type H160Value = H160 | string;
/**
 * Handles 160-bit data. Used to express account addresses.
 */
export declare class H160 {
    static fromBytes(buffer: Buffer): H160;
    static zero(): H160;
    static check(param: any): boolean;
    static ensure(param: H160Value): H160;
    private static checkString;
    value: string;
    constructor(value: string);
    toEncodeObject(): string;
    rlpBytes(): Buffer;
    isEqualTo(rhs: H160): boolean;
    toString(): string;
    toJSON(): string;
}
