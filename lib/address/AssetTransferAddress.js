"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
const _ = require("lodash");
const utility_1 = require("../utility");
const H160_1 = require("../value/H160");
const bech32_1 = require("./bech32");
/**
 * Substitutes for asset owner data which consists of network id,
 * lockScriptHash, parameters. The network id is represented with prefix
 * "cca"(mainnet) or "tca"(testnet). Currently version 0 exists only.
 *
 * Refer to the spec for the details about AssetTransferAddress.
 * https://github.com/CodeChain-io/codechain/blob/master/spec/CodeChain-Address.md
 */
class AssetTransferAddress {
    static fromTypeAndPayload(type, payload, options) {
        const { networkId, version = 1 } = options;
        if (version !== 1) {
            throw Error(`Unsupported version for asset transfer address: ${version}`);
        }
        if (type < 0x00 || type > 0x03) {
            throw Error(`Unsupported type for asset transfer address: ${type}`);
        }
        const words = bech32_1.toWords(buffer_1.Buffer.from([version, type, ...encodePayload(payload)]));
        const address = bech32_1.encode(networkId + "a", words);
        return new AssetTransferAddress(type, payload, address);
    }
    static fromString(address) {
        if (address.charAt(2) !== "a") {
            throw Error(`The prefix is unknown for asset transfer address: ${address}`);
        }
        const { words } = bech32_1.decode(address, address.substr(0, 3));
        const bytes = bech32_1.fromWords(words);
        const version = bytes[0];
        if (version !== 1) {
            throw Error(`Unsupported version for asset transfer address: ${version}`);
        }
        const type = bytes[1];
        if (type < 0x00 || type > 0x03) {
            throw Error(`Unsupported type for asset transfer address: ${type}`);
        }
        if (type < 0x03) {
            const payload = utility_1.toHex(buffer_1.Buffer.from(bytes.slice(2)));
            return new this(type, new H160_1.H160(payload), address);
        }
        else {
            const n = bytes[2];
            const m = bytes[3];
            const payload = buffer_1.Buffer.from(bytes.slice(4));
            const pubkeys = _.chunk(payload, 20).map(chunk => H160_1.H160.ensure(utility_1.toHex(buffer_1.Buffer.from(chunk))));
            return new this(type, { n, m, pubkeys }, address);
        }
    }
    static check(address) {
        return address instanceof AssetTransferAddress
            ? true
            : AssetTransferAddress.checkString(address);
    }
    static ensure(address) {
        return address instanceof AssetTransferAddress
            ? address
            : AssetTransferAddress.fromString(address);
    }
    static checkString(value) {
        // FIXME: verify checksum
        return /^.{2}a[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{42}$/.test(value);
    }
    constructor(type, payload, address) {
        this.type = type;
        if (H160_1.H160.check(payload)) {
            this.payload = H160_1.H160.ensure(payload);
        }
        else {
            const { m, n, pubkeys } = payload;
            this.payload = {
                m,
                n,
                pubkeys: pubkeys.map(p => H160_1.H160.ensure(p))
            };
        }
        this.value = address;
    }
    toString() {
        return this.value;
    }
}
exports.AssetTransferAddress = AssetTransferAddress;
function encodePayload(payload) {
    if (H160_1.H160.check(payload)) {
        return buffer_1.Buffer.from(H160_1.H160.ensure(payload).value, "hex");
    }
    else {
        const { m, n, pubkeys } = payload;
        return buffer_1.Buffer.from([
            n,
            m,
            ...[].concat(...pubkeys.map(key => [
                ...buffer_1.Buffer.from(H160_1.H160.ensure(key).value, "hex")
            ]))
        ]);
    }
}
//# sourceMappingURL=AssetTransferAddress.js.map