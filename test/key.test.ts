import {
    signEcdsa,
    verifyEcdsa,
    recoverEcdsa,
    SchnorrSignature,
    signSchnorr,
    verifySchnorr,
    recoverSchnorr,
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

// Examples are generated from libsecp256k1
describe.each([
    [
        "2730417b940503dfc8dddfe5dfdbfc029b269fec9bc0170a156bcfe30f5afda8",
        "c61e7bde9bb280bc0ea1d29dd868f34c97a93feda56d174338775a6a4fcb3cff",
        "2a7c03d513c820c6cee1cc4a7c00d350d8ee6bb8a032615af040e0930c0d2ac8cea327ff6f044cee1499ac04e1b4b0406eacd1f606cbeec5c2535562f25f05f1"
    ],
    [
        "52d9ec33be855d9f27e1459dabf195266e1c4ca2bd1f44bbc7c6c0c2ebd0b280",
        "f61dbea29a861e0ff61f209f8824a4deadec80cad4d7b6cf3672c4140d82349d",
        "42236cd3b8e8a24d4a4db3eabf059d2f977c04d4ff6422cc5b99e9bcc913fd83f1d39993b651c420990d696ce8aac7c2bcc89a41b45dbe7241bbda50ca2be92a"
    ],
    [
        "44fd4a087cbf2a0ef6762cd7de0f3020fd71b11f13afa014741dcf3f098e1de1",
        "7e1ac454dd8b2068d15020f16680ab22ac94ea38d0e2dc006fa2bdf9f200112b",
        "9858a21134e15a0b04e21aaa6391bfb8e94de18497810ae24d88920e2cf45e9bd681235551493d9e3f740086e8be5ba19c763f7b27536fc75e159e2dc08763dd"
    ],
    [
        "3d52843f74e47b24edd77fcf0b2041ba1b57984eb20a4a17144c08c9588d2a0a",
        "0d0ee35bec4b04d8c97b23357d66ead5d1486bdfcad56949c4c69291af532276",
        "b4c29459031b740da8a20d75a948344c908ff576bcc16e50f1d1af335c321923a6416a13c152cc1e0fbb30bd568e033f919b4e548fc79996bc7c5e1a68f5dd48"
    ],
    [
        "99a819048cc03500e0ad3debeb9beace8e26e5960f7045a551fa5c14247b8805",
        "353d8f4a3d139a57bdf9b1c3a836f3a380fe8ba558356cd344766c97990b923b",
        "74cb307814a2f43ed0974dc278d6fc42f04c9d682e2df6a4a449bf628c4a3a03bbf6558b4c4a8e4148322cff3b2ce11eb96b0a9c76395054550ba307eed98573"
    ]
])("verify & recover Schnorr with example: %p", (msgStr, priv, sigStr) => {
    const msg = new Buffer(msgStr, "hex").toString("binary");
    const sig: SchnorrSignature = {
        r: sigStr.substr(0, 64),
        s: sigStr.substr(64, 64)
    };
    const pub = getPublicFromPrivate(priv);

    test("verify", () => {
        expect(verifySchnorr(msg, sig, pub)).toBe(true);
    });
    test("recover", () => {
        expect(recoverSchnorr(msg, sig)).toBe(pub);
    });
});

test("sign & verify Schnorr", () => {
    const msg = "CodeChain";
    const priv = generatePrivateKey();
    const pub = getPublicFromPrivate(priv);
    const sig = signSchnorr(msg, priv);
    expect(verifySchnorr(msg, sig, pub)).toBe(true);
});

test("sign & recover Schnorr", () => {
    const msg = "CodeChain";
    const priv = generatePrivateKey();
    const pub = getPublicFromPrivate(priv);
    const sig = signSchnorr(msg, priv);
    expect(recoverSchnorr(msg, sig)).toBe(pub);
});
