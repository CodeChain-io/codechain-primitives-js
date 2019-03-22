import { H160 } from "../value/H160";
export declare type AssetTransferAddressValue = AssetTransferAddress | string;
export declare type PublicKeyHashValue = H160 | string;
export declare type PublicKeyHash = H160;
export interface MultisigValue {
    n: number;
    m: number;
    pubkeys: PublicKeyHashValue[];
}
export interface Multisig {
    n: number;
    m: number;
    pubkeys: PublicKeyHash[];
}
export declare type Payload = PublicKeyHash | Multisig;
export declare type PayloadValue = PublicKeyHashValue | MultisigValue;
/**
 * Substitutes for asset owner data which consists of network id,
 * lockScriptHash, parameters. The network id is represented with prefix
 * "cca"(mainnet) or "tca"(testnet). Currently version 0 exists only.
 *
 * Refer to the spec for the details about AssetTransferAddress.
 * https://github.com/CodeChain-io/codechain/blob/master/spec/CodeChain-Address.md
 */
export declare class AssetTransferAddress {
    static fromTypeAndPayload(type: number, payload: PayloadValue, options: {
        networkId: string;
        version?: number;
    }): AssetTransferAddress;
    static fromString(address: string): AssetTransferAddress;
    static check(address: any): boolean;
    static ensure(address: AssetTransferAddressValue): AssetTransferAddress;
    private static checkString;
    readonly type: number;
    readonly payload: Payload;
    readonly value: string;
    private constructor();
    toString(): string;
}
