/// <reference types="node" />
export declare type H512Value = H512 | string;
/**
 * Handles 512-bit data. Used to express public keys.
 */
export declare class H512 {
    static fromBytes(buffer: Buffer): H512;
    static zero(): H512;
    static check(param: any): boolean;
    static ensure(param: H512Value): H512;
    private static checkString;
    value: string;
    constructor(value: string);
    toEncodeObject(): string;
    rlpBytes(): Buffer;
    isEqualTo(rhs: H512): boolean;
    toString(): string;
    toJSON(): string;
}
