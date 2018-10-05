import { AssetTransferAddress, PlatformAddress } from "..";

describe("AssetTransferAddress", () => {
    test("import", () => {
        expect(typeof AssetTransferAddress).toBe("function");
    });

    test("require", () => {
        const obj = require("..");
        expect(typeof obj.AssetTransferAddress).toBe("function");
    });

    test.skip("check", done => done.fail("not implemented"));
    test.skip("ensure", done => done.fail("not implemented"));
    test.skip("fromTypeAndPayload", done => done.fail("not implemented"));
    test.skip("fromString", done => done.fail("not implemented"));
    test.skip("toString", done => done.fail("not implemented"));
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
