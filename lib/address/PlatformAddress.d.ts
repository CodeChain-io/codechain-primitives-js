import { H160 } from "../value/H160";
import { H512 } from "../value/H512";
export declare type PlatformAddressValue = PlatformAddress | string;
/**
 * The bech32 form of account id. The human readable part(HRP) is used to
 * represent the network. For platform address, the HRP is "ccc" for mainnet or
 * "tcc" for testnet.
 *
 * Refer to the spec for the details about PlatformAddress.
 * https://github.com/CodeChain-io/codechain/blob/master/spec/CodeChain-Address.md
 */
export declare class PlatformAddress {
    static fromPublic(publicKey: H512 | string, options: {
        networkId: string;
        version?: number;
    }): PlatformAddress;
    static fromAccountId(accountId: H160 | string, options: {
        networkId: string;
        version?: number;
    }): PlatformAddress;
    static fromString(address: string): PlatformAddress;
    static check(address: any): boolean;
    static ensure(address: PlatformAddressValue): PlatformAddress;
    static ensureAccount(address: PlatformAddress | H160 | string): H160;
    private static checkString;
    readonly accountId: H160;
    readonly value: string;
    private constructor();
    toString(): string;
    getAccountId(): H160;
}
