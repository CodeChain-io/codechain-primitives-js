import { Buffer } from "buffer";
import * as _ from "lodash";

import { toHex } from "../utility";
import { H160 } from "../value/H160";

import { decode, encode, fromWords, toWords } from "./bech32";

export type PublicKeyHashValue = H160 | string;
export type PublicKeyHash = H160;

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

export type Payload = PublicKeyHash | Multisig;
export type PayloadValue = PublicKeyHashValue | MultisigValue;

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
        payload: PayloadValue,
        options: { networkId: string; version?: number }
    ) {
        const { networkId, version = 1 } = options;

        if (version !== 1) {
            throw Error(
                `Unsupported version for asset transfer address: ${version}`
            );
        }

        if (type < 0x00 || type > 0x03) {
            throw Error(`Unsupported type for asset transfer address: ${type}`);
        }

        const words = toWords(
            Buffer.from([version, type, ...encodePayload(payload)])
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

        if (version !== 1) {
            throw Error(
                `Unsupported version for asset transfer address: ${version}`
            );
        }

        const type = bytes[1];

        if (type < 0x00 || type > 0x03) {
            throw Error(`Unsupported type for asset transfer address: ${type}`);
        }

        if (type < 0x03) {
            const payload = toHex(Buffer.from(bytes.slice(2)));
            return new this(type, new H160(payload), address);
        } else {
            const n = bytes[2];
            const m = bytes[3];
            const payload = Buffer.from(bytes.slice(4));
            const pubkeys = _.chunk(payload, 20).map(chunk =>
                H160.ensure(toHex(Buffer.from(chunk)))
            );
            return new this(type, { n, m, pubkeys }, address);
        }
    }

    public static check(address: any) {
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
        return /^.{2}a[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{42}$/.test(value);
    }

    public readonly type: number;
    public readonly payload: Payload;
    public readonly value: string;

    private constructor(type: number, payload: PayloadValue, address: string) {
        this.type = type;
        if (H160.check(payload)) {
            this.payload = H160.ensure(payload as any);
        } else {
            const { m, n, pubkeys } = payload as Multisig;
            this.payload = {
                m,
                n,
                pubkeys: pubkeys.map(p => H160.ensure(p))
            };
        }
        this.value = address;
    }

    public toString(): string {
        return this.value;
    }
}

function encodePayload(payload: PayloadValue): Buffer {
    if (H160.check(payload)) {
        return Buffer.from(H160.ensure(payload as H160).value, "hex");
    } else {
        const { m, n, pubkeys } = payload as Multisig;
        return Buffer.from([
            n,
            m,
            ...([] as number[]).concat(
                ...pubkeys.map(key => [
                    ...Buffer.from(H160.ensure(key).value, "hex")
                ])
            )
        ]);
    }
}
