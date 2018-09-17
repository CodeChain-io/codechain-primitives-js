import { Buffer } from "buffer";

import { H256 } from "../value/H256";
import { toHex } from "../hash";

import { decode, encode, fromWords, toWords } from "./bech32";

/**
 * Substitutes for asset owner data which consists of network id,
 * lockScriptHash, parameters. The network id is represented with prefix
 * "cca"(mainnet) or "tca"(testnet). Currently version 0 exists only.
 *
 * Refer to the spec for the details about AssetTransferAddress.
 * https://github.com/CodeChain-io/codechain/blob/master/spec/CodeChain-Address.md
 */
export class AssetTransferAddress {
    public static fromTypeAndPayload(
        type: number,
        payload: H256 | string,
        options: { networkId?: string; version?: number } = {}
    ) {
        const { networkId = "tc", version = 0 } = options;

        if (version !== 0) {
            throw Error(
                `Unsupported version for asset transfer address: ${version}`
            );
        }

        if (type < 0x00 || type > 0x02) {
            throw Error(`Unsupported type for asset transfer address: ${type}`);
        }

        const words = toWords(
            Buffer.from([
                version,
                type,
                ...Buffer.from(H256.ensure(payload).value, "hex")
            ])
        );
        const address = encode(networkId + "a", words);
        return new AssetTransferAddress(type, payload, address);
    }

    public static fromString(address: string) {
        if (address.charAt(2) !== "a") {
            throw Error(
                `The prefix is unknown for asset transfer address: ${address}`
            );
        }

        const { words } = decode(address, address.substr(0, 3));
        const bytes = fromWords(words);
        const version = bytes[0];

        if (version !== 0) {
            throw Error(
                `Unsupported version for asset transfer address: ${version}`
            );
        }

        const type = bytes[1];

        if (type < 0x00 || type > 0x02) {
            throw Error(`Unsupported type for asset transfer address: ${type}`);
        }

        const payload = toHex(Buffer.from(bytes.slice(2)));
        return new this(type, new H256(payload), address);
    }

    public static check(address: AssetTransferAddress | string) {
        return address instanceof AssetTransferAddress
            ? true
            : AssetTransferAddress.checkString(address);
    }

    public static ensure(address: AssetTransferAddress | string) {
        return address instanceof AssetTransferAddress
            ? address
            : AssetTransferAddress.fromString(address);
    }

    private static checkString(value: string): boolean {
        // FIXME: verify checksum
        return /^.{2}a[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{61}$/.test(value);
    }

    public type: number;
    public payload: H256;
    public value: string;

    private constructor(type: number, payload: H256 | string, address: string) {
        this.type = type;
        this.payload = H256.ensure(payload);
        this.value = address;
    }

    public toString(): string {
        return this.value;
    }
}
