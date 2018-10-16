import { AssetTransferAddress, PlatformAddress } from "..";

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
        [3, "0000000000000000000000000000000000000000", "tc", 1, true]
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
