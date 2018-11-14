import { H128, H160, H256, H512, U256, U64 } from "..";

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

describe.each([[U64, "U64"], [U256, "U256"]])("%p", (Uxxx, className) => {
    test("import", () => {
        expect(typeof Uxxx).toBe("function");
    });

    test("require", () => {
        const obj = require("..");
        expect(typeof obj[className]).toBe("function");
    });

    test("check", () => {
        expect(Uxxx.check(undefined as any)).toBe(false);
        expect(Uxxx.check(null as any)).toBe(false);
        expect(Uxxx.check(-1)).toBe(false);
        expect(Uxxx.check(0.5)).toBe(false);
        expect(Uxxx.check(0.5)).toBe(false);

        expect(Uxxx.check(0)).toBe(true);
        expect(Uxxx.check("0")).toBe(true);
        expect(Uxxx.check("0x0")).toBe(true);
        expect(Uxxx.check(new Uxxx(0))).toBe(true);
    });

    test("ensure", () => {
        expect(() => {
            Uxxx.ensure(undefined as any);
        }).toThrow();
        expect(Uxxx.ensure(10)).toEqual(new Uxxx(10));
        expect(Uxxx.ensure("10")).toEqual(new Uxxx(10));
        expect(Uxxx.ensure("0xA")).toEqual(new Uxxx(10));
        expect(Uxxx.ensure(new Uxxx(10))).toEqual(new Uxxx(10));
    });

    test("fromBytes", () => {
        let a;
        a = new Uxxx(0);
        expect(Uxxx.fromBytes(a.rlpBytes())).toEqual(a);
        a = new Uxxx(255);
        expect(Uxxx.fromBytes(a.rlpBytes())).toEqual(a);
        a = new Uxxx(1000);
        expect(Uxxx.fromBytes(a.rlpBytes())).toEqual(a);
        a = new Uxxx("1000000000000");
        expect(Uxxx.fromBytes(a.rlpBytes())).toEqual(a);
    });

    if (Uxxx === U256) {
        test("increase", () => {
            const a = new Uxxx(0);
            const b = a.increase();
            expect(a).toEqual(new Uxxx(0));
            expect(b).toEqual(new Uxxx(1));
        });
    }

    test("isEqualTo", () => {
        expect(new Uxxx(0).isEqualTo(new Uxxx(0))).toEqual(true);
        expect(new Uxxx(1000000).isEqualTo(new Uxxx(1000000))).toEqual(true);
        expect(
            new Uxxx("100000000000000000").isEqualTo(
                new Uxxx("100000000000000000")
            )
        ).toEqual(true);
    });

    test("rlpBytes", () => {
        expect(new Uxxx(0).rlpBytes()).toEqual(Buffer.from([0x80]));
        expect(new Uxxx(10).rlpBytes()).toEqual(Buffer.from([0x0a]));
        expect(new Uxxx(255).rlpBytes()).toEqual(Buffer.from([0x81, 0xff]));
        expect(new Uxxx(1000).rlpBytes()).toEqual(
            Buffer.from([0x82, 0x03, 0xe8])
        );
        expect(new Uxxx(100000).rlpBytes()).toEqual(
            Buffer.from([0x83, 0x01, 0x86, 0xa0])
        );
        expect(new Uxxx(10000000).rlpBytes()).toEqual(
            Buffer.from([0x83, 0x98, 0x96, 0x80])
        );
        expect(new Uxxx("1000000000").rlpBytes()).toEqual(
            Buffer.from([0x84, 0x3b, 0x9a, 0xca, 0x00])
        );
        expect(new Uxxx("1000000000000").rlpBytes()).toEqual(
            Buffer.from([0x85, 0xe8, 0xd4, 0xa5, 0x10, 0x00])
        );
    });

    test("toEncodeObject", () => {
        expect(new Uxxx(0).toEncodeObject()).toBe(0);
        expect(new Uxxx(0xf).toEncodeObject()).toBe("0x0f");
        expect(new Uxxx(0xff).toEncodeObject()).toBe("0xff");
        expect(new Uxxx(0xfff).toEncodeObject()).toBe("0x0fff");
    });

    test("toString", () => {
        expect(new Uxxx(0).toString()).toBe("0");
        expect(new Uxxx(0xff).toString()).toBe("255");
    });

    test("plus", () => {
        expect(Uxxx.plus(10, 5)).toEqual(new Uxxx(10 + 5));
        expect(() => {
            Uxxx.plus(Uxxx.MAX_VALUE, 1);
        }).toThrow("overflow");
        expect(() => {
            Uxxx.plus(-1, 0);
        }).toThrow(className);
    });

    test("minus", () => {
        expect(Uxxx.minus(10, 5)).toEqual(new Uxxx(10 - 5));
        expect(() => {
            Uxxx.minus(5, 10);
        }).toThrow("underflow");
        expect(() => {
            Uxxx.minus(-1, -1);
        }).toThrow(className);
    });

    test("times", () => {
        expect(Uxxx.times(10, 5)).toEqual(new Uxxx(10 * 5));
        expect(Uxxx.times(Uxxx.MAX_VALUE, 0)).toEqual(new Uxxx(0));
        expect(Uxxx.times(Uxxx.MAX_VALUE, 1)).toEqual(Uxxx.MAX_VALUE);
        expect(() => {
            Uxxx.times(Uxxx.MAX_VALUE, 2);
        }).toThrow("overflow");
        expect(() => {
            Uxxx.times(-1, -1);
        }).toThrow(className);
    });

    test("idiv", () => {
        expect(Uxxx.idiv(10, 5)).toEqual(new Uxxx(10 / 5));
        expect(Uxxx.idiv(14, 5)).toEqual(new Uxxx(2));
        expect(() => {
            Uxxx.idiv(10, 0);
        }).toThrow("Divided by 0");
        expect(() => {
            Uxxx.idiv(-1, -1);
        }).toThrow(className);
    });

    test("mod", () => {
        expect(Uxxx.mod(10, 5)).toEqual(new Uxxx(0));
        expect(Uxxx.mod(14, 5)).toEqual(new Uxxx(4));
        expect(() => {
            Uxxx.mod(10, 0);
        }).toThrow("Divided by 0");
        expect(() => {
            Uxxx.mod(-1, -1);
        }).toThrow(className);
    });

    test("Comparison", () => {
        expect(new Uxxx(11).gt(10)).toBe(true);
        expect(new Uxxx(10).gt(10)).toBe(false);
        expect(new Uxxx(9).gt(10)).toBe(false);
        expect(new Uxxx(11).isGreaterThan(10)).toBe(true);
        expect(new Uxxx(10).isGreaterThan(10)).toBe(false);
        expect(new Uxxx(9).isGreaterThan(10)).toBe(false);

        expect(new Uxxx(11).gte(10)).toBe(true);
        expect(new Uxxx(10).gte(10)).toBe(true);
        expect(new Uxxx(9).gte(10)).toBe(false);
        expect(new Uxxx(11).isGreaterThanOrEqualTo(10)).toBe(true);
        expect(new Uxxx(10).isGreaterThanOrEqualTo(10)).toBe(true);
        expect(new Uxxx(9).isGreaterThanOrEqualTo(10)).toBe(false);

        expect(new Uxxx(11).lt(10)).toBe(false);
        expect(new Uxxx(10).lt(10)).toBe(false);
        expect(new Uxxx(9).lt(10)).toBe(true);
        expect(new Uxxx(11).isLessThan(10)).toBe(false);
        expect(new Uxxx(10).isLessThan(10)).toBe(false);
        expect(new Uxxx(9).isLessThan(10)).toBe(true);

        expect(new Uxxx(11).lte(10)).toBe(false);
        expect(new Uxxx(10).lte(10)).toBe(true);
        expect(new Uxxx(9).lte(10)).toBe(true);
        expect(new Uxxx(11).isLessThanOrEqualTo(10)).toBe(false);
        expect(new Uxxx(10).isLessThanOrEqualTo(10)).toBe(true);
        expect(new Uxxx(9).isLessThanOrEqualTo(10)).toBe(true);
    });
});
