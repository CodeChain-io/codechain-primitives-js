import { Buffer } from "buffer";
import _ from "lodash";

import { blake160 } from "../hash";
import { toHex } from "../utility";
import { H160 } from "../value/H160";
import { H512 } from "../value/H512";

import { decode, encode, fromWords, toWords } from "./bech32";

export type PlatformAddressValue = PlatformAddress | string;

/**
 * The bech32 form of account id. The human readable part(HRP) is used to
 * represent the network. For platform address, the HRP is "ccc" for mainnet or
 * "tcc" for testnet.
 *
 * Refer to the spec for the details about PlatformAddress.
 * https://github.com/CodeChain-io/codechain/blob/master/spec/CodeChain-Address.md
 */
export class PlatformAddress {
    public static fromPublic(
        publicKey: H512 | string,
        options: { networkId: string; version?: number }
    ): PlatformAddress {
        if (!H512.check(publicKey)) {
            throw Error(
                `Invalid public key for creating PlatformAddress: ${publicKey}`
            );
        }
        return PlatformAddress.fromAccountId(
            getAccountIdFromPublic(H512.ensure(publicKey).value),
            options
        );
    }

    public static fromAccountId(
        accountId: H160 | string,
        options: { networkId: string; version?: number }
    ) {
        const { networkId, version = 1 } = options;

        if (!H160.check(accountId)) {
            throw Error(
                `Invalid accountId for creating PlatformAddress: "${accountId}"`
            );
        }
        if (version !== 1) {
            throw Error(
                `Unsupported version for PlatformAddress: "${version}"`
            );
        }
        if (typeof networkId !== "string" || networkId.length !== 2) {
            throw Error(
                `Unsupported networkId for PlatformAddress: "${networkId}"`
            );
        }

        const words = toWords(
            Buffer.from(
                _.padStart(version.toString(16), 2, "0") +
                    H160.ensure(accountId).value,
                "hex"
            )
        );
        return new PlatformAddress(
            H160.ensure(accountId),
            encode(networkId + "c", words)
        );
    }

    public static fromString(address: string) {
        if (typeof address !== "string") {
            throw Error(
                `Expected PlatformAddress string but found: "${address}"`
            );
        } else if (address.charAt(2) !== "c") {
            throw Error(`Unknown prefix for PlatformAddress: ${address}`);
        }

        const { words } = decode(address, address.substr(0, 3));
        const bytes = fromWords(words);
        const version = bytes[0];

        if (version !== 1) {
            throw Error(`Unsupported version for PlatformAddress: ${version}`);
        }

        const accountId = toHex(Buffer.from(bytes.slice(1)));
        return new PlatformAddress(new H160(accountId), address);
    }

    public static check(address: any): boolean {
        return address instanceof PlatformAddress
            ? true
            : PlatformAddress.checkString(address);
    }

    public static ensure(address: PlatformAddressValue): PlatformAddress {
        if (address instanceof PlatformAddress) {
            return address;
        } else if (typeof address === "string") {
            return PlatformAddress.fromString(address);
        } else {
            throw Error(
                `Expected either PlatformAddress or string but found ${address}`
            );
        }
    }

    public static ensureAccount(
        address: PlatformAddress | H160 | string
    ): H160 {
        if (address instanceof PlatformAddress) {
            // FIXME: verify network id
            return address.getAccountId();
        } else if (address instanceof H160) {
            return address;
        } else if (address.match(`^(0x)?[a-fA-F0-9]{40}$`)) {
            return new H160(address);
        } else {
            return PlatformAddress.fromString(address).getAccountId();
        }
    }

    private static checkString(value: string): boolean {
        // FIXME: verify checksum
        return /^.{2}c[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{40}$/.test(value);
    }

    public readonly accountId: H160;
    public readonly value: string;

    private constructor(accountId: H160, address: string) {
        this.accountId = accountId;
        this.value = address;
    }

    public toString(): string {
        return this.value;
    }

    public getAccountId(): H160 {
        return this.accountId;
    }
}

function getAccountIdFromPublic(publicKey: string): string {
    if (typeof publicKey !== "string") {
        throw Error(
            `Unexpected parameter for getAccountIdFromPublic: ${publicKey}`
        );
    }
    // FIXME: Check 512-bit hexstring
    return blake160(publicKey);
}
