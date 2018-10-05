import {
    signEcdsa,
    verifyEcdsa,
    recoverEcdsa,
    generatePrivateKey,
    getPublicFromPrivate
} from "..";

test("generatePrivateKey", () => {
    const priv = generatePrivateKey();
    expect(/^[0-9a-fA-F]{64}$/.test(priv)).toBe(true);
});

test("getPublicFromPrivate", () => {
    const priv = generatePrivateKey();
    const pub = getPublicFromPrivate(priv);
    expect(/^[0-9a-fA-F]{128}$/.test(pub)).toBe(true);
});

test("sign & verify ECDSA", () => {
    const msg = "CodeChain";
    const priv = generatePrivateKey();
    const pub = getPublicFromPrivate(priv);
    const sig = signEcdsa(msg, priv);
    expect(verifyEcdsa(msg, sig, pub)).toBe(true);
});

test("sign & recover ECDSA", () => {
    const msg = "CodeChain";
    const priv = generatePrivateKey();
    const pub = getPublicFromPrivate(priv);
    const sig = signEcdsa(msg, priv);
    expect(recoverEcdsa(msg, sig)).toBe(pub);
});
