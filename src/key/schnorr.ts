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

export interface SchnorrSignature {
    r: string;
    s: string;
}

/**
 * @hidden
 */
function schnorrHash(r: BN, msg: BN): string {
    const rString = r.toBuffer("be", 32).toString("binary");
    const mString = msg.toBuffer("be", 32).toString("binary");
    const sha256 = md.sha256.create();
    sha256.update(rString).update(mString);
    return sha256.digest().toHex();
}

/**
 * Gets Schnorr signature for message from private key.
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
    const privN = new BN(priv, 16);
    while (true) {
        const nonceKey = secp256k1.genKeyPair();
        const R = nonceKey.getPublic();
        const r = R.x;
        let k = nonceKey.priv;
        if (R.y.isOdd()) {
            k = k.neg().umod(secp256k1.n);
        }

        const hashString = schnorrHash(r, msg);
        const h = new BN(hashString, 16);
        if (h.isZero() || h.gte(secp256k1.n)) {
            continue;
        }

        const s = k.sub(privN.mul(h).umod(secp256k1.n)).umod(secp256k1.n);
        return {
            r: r.toString("hex"),
            s: s.toString("hex")
        };
    }
};

/**
 * Checks if the signature from signSchnorr is correct.
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
 * Gets public key from the message and Schnorr signature.
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
