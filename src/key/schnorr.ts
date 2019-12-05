import BN = require("bn.js");
import { md } from "node-forge";

/**
 * @hidden
 */
const EC = require("elliptic").ec;
/**
 * @hidden
 */
const secp256k1 = new EC("secp256k1");
/**
 * @hidden
 */
const HmacDRBG = require("hmac-drbg");

/**
 * (Experimental)
 */
export interface SchnorrSignature {
    r: string;
    s: string;
}

/**
 * @hidden
 */
export function schnorrHash(r: BN, msg: BN): string {
    // codechain-sdk is now importing a library from bitcore.
    // But the library monkey patches bn.js so that the method parametrization changes when imported.
    // toBuffer("be", 32) does not guarantee the buffer length to be 32 if overridden.
    // In the bitcore library, the correct usage is toBuffer({endian: "big", size: 32}).
    // So padStart guarantees the rString and mString to have length 32 by not omitting front null bytes.
    // FIXME when https://github.com/bitpay/bitcore/issues/2190 is resolved.

    const rString = r
        .toBuffer("be", 32)
        .toString("binary")
        .padStart(32, "\x00");
    const mString = msg
        .toBuffer("be", 32)
        .toString("binary")
        .padStart(32, "\x00");
    const sha256 = md.sha256.create();
    sha256.update(rString).update(mString);
    return sha256.digest().toHex();
}

/**
 * (Experimental) Gets Schnorr signature for message from private key.
 * @param message 32 byte hexademical string
 * @param priv 32 byte hexadecimal string of private key
 * @returns r, s of Schnorr signature
 */
export const signSchnorr = (
    message: string,
    priv: string
): SchnorrSignature => {
    if (!/^[0-9a-fA-F]{64}$/.test(message)) {
        throw new Error(`invalid message: ${message}`);
    }
    if (!/^[0-9a-fA-F]{64}$/.test(priv)) {
        throw new Error(`invalid private key: ${priv}`);
    }
    const msg = new BN(message, 16);
    const key = secp256k1.keyFromPrivate(priv);
    const nonce = msg.gte(secp256k1.n) ? msg.sub(secp256k1.n) : msg;
    const algo = "Schnorr+SHA256  ";
    const pers = Array.from(algo).map(v => v.charCodeAt(0));
    const drbg = new HmacDRBG({
        hash: secp256k1.hash,
        entropy: key.getPrivate().toArray("be", 32),
        nonce: nonce.toArray("be", 32),
        pers
    });

    while (true) {
        let k = new BN(drbg.generate(32));
        if (k.gte(secp256k1.n)) {
            k = k.sub(secp256k1.n);
        }
        if (k.cmpn(1) <= 0) {
            continue;
        }

        const R = secp256k1.g.mul(k);
        if (R.isInfinity()) {
            continue;
        }

        const r = R.x;
        if (R.y.isOdd()) {
            k = k.neg().umod(secp256k1.n);
        }

        const hashString = schnorrHash(r, msg);
        const h = new BN(hashString, 16);
        if (h.isZero() || h.gte(secp256k1.n)) {
            continue;
        }

        const s = k
            .sub(
                key
                    .getPrivate()
                    .mul(h)
                    .umod(secp256k1.n)
            )
            .umod(secp256k1.n);
        return {
            r: r.toString("hex"),
            s: s.toString("hex")
        };
    }
};

/**
 * (Experimental) Checks if the signature from signSchnorr is correct.
 * @param message 32 byte hexademical string
 * @param signature r, s of Schnorr signature
 * @param pub 64 byte hexadecimal string of public key
 * @returns if signature is valid, true. Else false.
 */
export const verifySchnorr = (
    message: string,
    signature: SchnorrSignature,
    pub: string
): boolean => {
    if (!/^[0-9a-fA-F]{64}$/.test(message)) {
        throw new Error(`invalid message: ${message}`);
    }
    if (
        !/^[0-9a-fA-F]{1,64}$/.test(signature.r) ||
        !/^[0-9a-fA-F]{1,64}$/.test(signature.s)
    ) {
        throw new Error(`invalid signature: ${signature}`);
    }
    if (!/^[0-9a-fA-F]{128}$/.test(pub)) {
        throw new Error(`invalid public key: ${pub}`);
    }
    const key = secp256k1.keyFromPublic("04" + pub, "hex");
    if (!key.validate().result) {
        return false;
    }

    const r = new BN(signature.r, 16);
    const s = new BN(signature.s, 16);
    if (s.gte(secp256k1.n)) {
        return false;
    }

    const msg = new BN(message, 16);
    const hashString = schnorrHash(r, msg);
    const h = new BN(hashString, 16);
    if (h.isZero() || h.gte(secp256k1.n)) {
        return false;
    }

    const Rv = secp256k1.g.mulAdd(s, key.getPublic(), h);
    if (Rv.y.isOdd() || Rv.isInfinity()) {
        return false;
    }

    return Rv.x.eq(r);
};

/**
 * (Experimental) Gets public key from the message and Schnorr signature.
 * @param message 32 byte hexademical string
 * @param signature r, s of Schnorr signature
 * @returns 64 byte hexadecimal string public key
 */
export const recoverSchnorr = (
    message: string,
    signature: SchnorrSignature
): string => {
    if (!/^[0-9a-fA-F]{64}$/.test(message)) {
        throw new Error(`invalid message: ${message}`);
    }
    if (
        !/^[0-9a-fA-F]{1,64}$/.test(signature.r) ||
        !/^[0-9a-fA-F]{1,64}$/.test(signature.s)
    ) {
        throw new Error(`invalid signature: ${signature}`);
    }
    const r = new BN(signature.r, 16);
    const s = new BN(signature.s, 16);
    if (s.gte(secp256k1.n)) {
        throw new Error("invalid s value");
    }

    const msg = new BN(message, 16);
    const hashString = schnorrHash(r, msg);
    const h = new BN(hashString, 16);
    if (h.isZero() || h.gte(secp256k1.n)) {
        throw new Error("invalid hash value");
    }

    const hInv = h.invm(secp256k1.n);
    const k = s
        .neg()
        .umod(secp256k1.n)
        .mul(hInv)
        .umod(secp256k1.n);
    try {
        const R = secp256k1.curve.pointFromX(r, 0);
        const pubkey = secp256k1.g.mulAdd(k, R, hInv);
        if (pubkey.isInfinity()) {
            throw new Error("recovered public key value is infinity");
        }
        return pubkey.encode("hex").slice(2);
    } catch (e) {
        if (e.message === "invalid point") {
            throw new Error("invalid r value");
        } else {
            throw e;
        }
    }
};
