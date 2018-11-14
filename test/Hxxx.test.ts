import * as _ from "lodash";

import { H128, H160, H256, H512 } from "..";

describe.each([
    [H128, "H128", 16],
    [H160, "H160", 20],
    [H256, "H256", 32],
    [H512, "H512", 64]
])("%p", (Hxxx, className, byteLength) => {
    test("import", () => {
        expect(typeof Hxxx).toBe("function");
    });

    test("require", () => {
        const obj = require("..");
        expect(typeof obj[className]).toBe("function");
    });

    test("check", () => {
        const zero = _.repeat("00", byteLength);
        expect(Hxxx.check(new Hxxx(zero))).toBe(true);
        expect(Hxxx.check(zero)).toBe(true);
        expect(Hxxx.check(zero.substr(1) + "F")).toBe(true);
        expect(Hxxx.check(zero.substr(1) + "f")).toBe(true);
        expect(Hxxx.check(zero.substr(1) + "g")).toBe(false);
        expect(Hxxx.check(zero.substr(1) + "g")).toBe(false);
        expect(Hxxx.check(zero + "0")).toBe(false);
    });

    test.skip("ensure", done => done.fail("not implemented"));
    test.skip("fromBytes", done => done.fail("not implemented"));
    test.skip("isEqualTo", done => done.fail("not implemented"));
    test.skip("rlpBytes", done => done.fail("not implemented"));
    test.skip("toEncodeObject", done => done.fail("not implemented"));
});
