import { AssetTransferAddress, PlatformAddress } from "..";
import { Multisig } from "../lib/address/AssetTransferAddress";

describe("AssetTransferAddress", () => {
    const validAddressString = "ccaqyqjmvml2hdp8s8xzqnr57r8ywtduy2u6gcq89vffl";
    const validAddress = AssetTransferAddress.fromString(validAddressString);
    // Invalid length
    const invalidAddressString = "ccaqyqjmvml2hdp8s8xzqnr57r8ywtduy2u6gcq89vff";

    test("import", () => {
        expect(typeof AssetTransferAddress).toBe("function");
    });

    test("require", () => {
        const obj = require("..");
        expect(typeof obj.AssetTransferAddress).toBe("function");
    });

    test("check", () => {
        expect(AssetTransferAddress.check(validAddressString)).toBe(true);
        expect(AssetTransferAddress.check(validAddress)).toBe(true);
        expect(AssetTransferAddress.check(invalidAddressString)).toBe(false);
    });

    test("ensure", () => {
        expect(AssetTransferAddress.ensure(validAddress)).toBe(validAddress);
        expect(AssetTransferAddress.ensure(validAddressString)).toEqual(
            validAddress
        );
    });

    test.each([
        [0, "0000000000000000000000000000000000000000", "tc", 1, false],
        [1, "0000000000000000000000000000000000000000", "tc", 1, false],
        [2, "0000000000000000000000000000000000000000", "tc", 1, false],
        [0, "0000000000000000000000000000000000000000", "tc", 0, true],
        [-1, "0000000000000000000000000000000000000000", "tc", 1, true],
        [4, "0000000000000000000000000000000000000000", "tc", 1, true],
        [255, "0000000000000000000000000000000000000000", "tc", 1, true]
    ])(
        "fromTypeAndPayload type = %p payload = %p networkId = %p version = %p",
        (type, payload, networkId, version, shouldThrow) => {
            if (shouldThrow) {
                expect(() => {
                    AssetTransferAddress.fromTypeAndPayload(type, payload, {
                        networkId,
                        version
                    });
                }).toThrow();
            } else {
                expect(() => {
                    AssetTransferAddress.fromTypeAndPayload(type, payload, {
                        networkId,
                        version
                    });
                }).not.toThrow();
            }
        }
    );

    test("fromTypeAndPayload multisig", () => {
        expect(
            AssetTransferAddress.fromTypeAndPayload(
                3,
                {
                    m: 1,
                    n: 2,
                    pubkeys: [
                        "1111111111111111111111111111111111111111",
                        "2222222222222222222222222222222222222222"
                    ]
                },
                {
                    networkId: "tc"
                }
            ).value
        ).toEqual(
            "tcaqypsyqg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyfzyg3zyg3zyg3zyg3zyg3zyg3zyg3zygsn28hf0"
        );
    });

    test("fromString multisig", () => {
        const address = AssetTransferAddress.fromString(
            "tcaqypsyqg3zyg3zyg3zyg3zyg3zyg3zyg3zyg3zyfzyg3zyg3zyg3zyg3zyg3zyg3zyg3zygsn28hf0"
        );
        const { payload, type } = address;
        expect(type).toBe(3);
        const { n, m, pubkeys } = payload as Multisig;
        expect(n).toBe(2);
        expect(m).toBe(1);
        expect(pubkeys[0].value).toBe(
            "1111111111111111111111111111111111111111"
        );
        expect(pubkeys[1].value).toBe(
            "2222222222222222222222222222222222222222"
        );
    });

    test("fromString", () => {
        expect(AssetTransferAddress.fromString(validAddressString)).toEqual(
            validAddress
        );

        expect(() => {
            AssetTransferAddress.fromString(
                "cccqyqjmvml2hdp8s8xzqnr57r8ywtduy2u6gcq89vff"
            );
        }).toThrow();

        // FIXME: wrong version, wrong type
    });

    test("toString", () => {
        expect(validAddress.toString()).toEqual(validAddressString);
    });
});

describe("PlatformAddress", () => {
    test("import", () => {
        expect(typeof PlatformAddress).toBe("function");
    });

    test("require", () => {
        const obj = require("..");
        expect(typeof obj.PlatformAddress).toBe("function");
    });

    test.skip("check", done => done.fail("not implemented"));
    test.skip("ensure", done => done.fail("not implemented"));
    test.skip("ensureAccount", done => done.fail("not implemented"));
    test.skip("fromAccountId", done => done.fail("not implemented"));
    test.skip("fromPublic", done => done.fail("not implemented"));
    test.skip("fromString", done => done.fail("not implemented"));
    test.skip("toString", done => done.fail("not implemented"));
});
