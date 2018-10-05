import { H128, H160, H256, H512, U256 } from "..";

describe("H128", () => {
    test("import", () => {
        expect(typeof H128).toBe("function");
    });

    test("require", () => {
        const obj = require("..");
        expect(typeof obj.H128).toBe("function");
    });

    test("check", () => {
        const obj = new H128("00000000000000000000000000000000");
        expect(H128.check(obj)).toBe(true);
        expect(H128.check("00000000000000000000000000000000")).toBe(true);
        expect(H128.check("0000000000000000000000000000000g")).toBe(false);
        expect(H128.check("0000000000000000000000000000000")).toBe(false);
        expect(H128.check("000000000000000000000000000000000")).toBe(false);
    });

    test.skip("ensure", done => done.fail("not implemented"));
    test.skip("fromBytes", done => done.fail("not implemented"));
    test.skip("isEqualTo", done => done.fail("not implemented"));
    test.skip("rlpBytes", done => done.fail("not implemented"));
    test.skip("toEncodeObject", done => done.fail("not implemented"));
});

describe("H160", () => {
    test("import", () => {
        expect(typeof H160).toBe("function");
    });

    test("require", () => {
        const obj = require("..");
        expect(typeof obj.H160).toBe("function");
    });

    test.skip("check", done => done.fail("not implemented"));
    test.skip("ensure", done => done.fail("not implemented"));
    test.skip("fromBytes", done => done.fail("not implemented"));
    test.skip("rlpBytes", done => done.fail("not implemented"));
    test.skip("toEncodeObject", done => done.fail("not implemented"));
});

describe("H256", () => {
    test("import", () => {
        expect(typeof H256).toBe("function");
    });

    test("require", () => {
        const obj = require("..");
        expect(typeof obj.H256).toBe("function");
    });

    test.skip("check", done => done.fail("not implemented"));
    test.skip("ensure", done => done.fail("not implemented"));
    test.skip("fromBytes", done => done.fail("not implemented"));
    test.skip("isEqualTo", done => done.fail("not implemented"));
    test.skip("rlpBytes", done => done.fail("not implemented"));
    test.skip("toEncodeObject", done => done.fail("not implemented"));
});

describe("H512", () => {
    test("import", () => {
        expect(typeof H512).toBe("function");
    });

    test("require", () => {
        const obj = require("..");
        expect(typeof obj.H512).toBe("function");
    });

    test.skip("check", done => done.fail("not implemented"));
    test.skip("ensure", done => done.fail("not implemented"));
    test.skip("fromBytes", done => done.fail("not implemented"));
    test.skip("rlpBytes", done => done.fail("not implemented"));
    test.skip("toEncodeObject", done => done.fail("not implemented"));
});

describe("U256", () => {
    test("import", () => {
        expect(typeof U256).toBe("function");
    });

    test("require", () => {
        const obj = require("..");
        expect(typeof obj.U256).toBe("function");
    });

    test.skip("check", done => done.fail("not implemented"));
    test.skip("ensure", done => done.fail("not implemented"));
    test.skip("fromBytes", done => done.fail("not implemented"));
    test.skip("increase", done => done.fail("not implemented"));
    test.skip("isEqualTo", done => done.fail("not implemented"));
    test.skip("rlpBytes", done => done.fail("not implemented"));
    test.skip("toEncodeObject", done => done.fail("not implemented"));
    test.skip("toString", done => done.fail("not implemented"));
});
