import { H160, PlatformAddress } from "../";

describe("fromAccountId", () => {
    const accountId = new H160("7b5e0ee8644c6f585fc297364143280a45844502");

    test("mainnet", () => {
        const address = PlatformAddress.fromAccountId(accountId, {
            networkId: "cc"
        });
        expect(address.value).toBe(
            "cccq9a4urhgv3xx7kzlc2tnvs2r9q9ytpz9qgs7q0a7"
        );
    });

    test("testnet", () => {
        const address = PlatformAddress.fromAccountId(accountId, {
            networkId: "tc"
        });
        expect(address.value).toBe(
            "tccq9a4urhgv3xx7kzlc2tnvs2r9q9ytpz9qgcejvw8"
        );
    });

    test("Valid version", () => {
        expect(() => {
            PlatformAddress.fromAccountId(accountId, {
                networkId: "tc",
                version: 1
            });
        }).not.toThrow();
    });

    test("Invalid version", done => {
        try {
            PlatformAddress.fromAccountId(accountId, {
                networkId: "tc",
                version: 99
            });
            done.fail();
        } catch (e) {
            expect(e.toString()).toContain("version");
            done();
        }
    });

    test("Invalid networkId", done => {
        try {
            PlatformAddress.fromAccountId(accountId, {
                version: 1,
                networkId: "x"
            });
            done.fail();
        } catch (e) {
            expect(e.toString()).toContain("networkId");
            expect(e.toString()).toContain("x");
            done();
        }
    });

    test("Invalid accountId", done => {
        try {
            PlatformAddress.fromAccountId("xxx", { networkId: "tc" });
            done.fail();
        } catch (e) {
            expect(e.toString()).toContain("accountId");
            expect(e.toString()).toContain("xxx");
            done();
        }
    });
});

describe("fromString", () => {
    const accountId = "7b5e0ee8644c6f585fc297364143280a45844502";
    const mainnetAddress = "cccq9a4urhgv3xx7kzlc2tnvs2r9q9ytpz9qgs7q0a7";
    const testnetAddress = "tccq9a4urhgv3xx7kzlc2tnvs2r9q9ytpz9qgcejvw8";

    test("mainnet", () => {
        const address = PlatformAddress.fromString(mainnetAddress);
        expect(address.accountId).toEqual(new H160(accountId));
    });

    test("testnet", () => {
        const address = PlatformAddress.fromString(testnetAddress);
        expect(address.accountId).toEqual(new H160(accountId));
    });

    test("Invalid checksum", done => {
        const invalidChecksumAddress =
            "cccqpa4urhgv3xx7kzlc2tnvs2r9q9ytpz9qgqqqqqq";
        try {
            PlatformAddress.fromString(invalidChecksumAddress);
            done.fail();
        } catch (e) {
            expect(e.toString()).toContain("checksum");
            done();
        }
    });
});
