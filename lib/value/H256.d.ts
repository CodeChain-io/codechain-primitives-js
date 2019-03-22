/// <reference types="node" />
export declare type H256Value = H256 | string;
/**
 * Handles 256-bit data. Used to express block hash, parcel hash, transaction hash, merkle root, etc.
 */
export declare class H256 {
    static fromBytes(buffer: Buffer): H256;
    static zero(): H256;
    static check(param: any): boolean;
    static ensure(param: H256Value): H256;
    private static checkString;
    value: string;
    constructor(value: string);
    toEncodeObject(): string;
    rlpBytes(): Buffer;
    isEqualTo(rhs: H256): boolean;
    toString(): string;
    toJSON(): string;
}
