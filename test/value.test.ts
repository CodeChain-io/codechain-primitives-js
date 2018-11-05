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

    test("check", () => {
        expect(U256.check(undefined as any)).toBe(false);
        expect(U256.check(null as any)).toBe(false);
        expect(U256.check(-1)).toBe(false);
        expect(U256.check(0.5)).toBe(false);
        expect(U256.check(0.5)).toBe(false);

        expect(U256.check(0)).toBe(true);
        expect(U256.check("0")).toBe(true);
        expect(U256.check("0x0")).toBe(true);
        expect(U256.check(new U256(0))).toBe(true);
    });

    test("ensure", () => {
        expect(() => {
            U256.ensure(undefined as any);
        }).toThrow();
        expect(U256.ensure(10)).toEqual(new U256(10));
        expect(U256.ensure("10")).toEqual(new U256(10));
        expect(U256.ensure("0xA")).toEqual(new U256(10));
        expect(U256.ensure(new U256(10))).toEqual(new U256(10));
    });

    test("fromBytes", () => {
        let a;
        a = new U256(0);
        expect(U256.fromBytes(a.rlpBytes())).toEqual(a);
        a = new U256(255);
        expect(U256.fromBytes(a.rlpBytes())).toEqual(a);
        a = new U256(1000);
        expect(U256.fromBytes(a.rlpBytes())).toEqual(a);
        a = new U256("1000000000000");
        expect(U256.fromBytes(a.rlpBytes())).toEqual(a);
    });

    test("increase", () => {
        const a = new U256(0);
        const b = a.increase();
        expect(a).toEqual(new U256(0));
        expect(b).toEqual(new U256(1));
    });

    test("isEqualTo", () => {
        expect(new U256(0).isEqualTo(new U256(0))).toEqual(true);
        expect(new U256(1000000).isEqualTo(new U256(1000000))).toEqual(true);
        expect(
            new U256("100000000000000000").isEqualTo(
                new U256("100000000000000000")
            )
        ).toEqual(true);
    });

    test("rlpBytes", () => {
        expect(new U256(0).rlpBytes()).toEqual(Buffer.from([0x80]));
        expect(new U256(10).rlpBytes()).toEqual(Buffer.from([0x0a]));
        expect(new U256(255).rlpBytes()).toEqual(Buffer.from([0x81, 0xff]));
        expect(new U256(1000).rlpBytes()).toEqual(
            Buffer.from([0x82, 0x03, 0xe8])
        );
        expect(new U256(100000).rlpBytes()).toEqual(
            Buffer.from([0x83, 0x01, 0x86, 0xa0])
        );
        expect(new U256(10000000).rlpBytes()).toEqual(
            Buffer.from([0x83, 0x98, 0x96, 0x80])
        );
        expect(new U256("1000000000").rlpBytes()).toEqual(
            Buffer.from([0x84, 0x3b, 0x9a, 0xca, 0x00])
        );
        expect(new U256("1000000000000").rlpBytes()).toEqual(
            Buffer.from([0x85, 0xe8, 0xd4, 0xa5, 0x10, 0x00])
        );
    });

    test("toEncodeObject", () => {
        expect(new U256(0).toEncodeObject()).toBe(0);
        expect(new U256(0xf).toEncodeObject()).toBe("0x0f");
        expect(new U256(0xff).toEncodeObject()).toBe("0xff");
        expect(new U256(0xfff).toEncodeObject()).toBe("0x0fff");
    });

    test("toString", () => {
        expect(new U256(0).toString()).toBe("0");
        expect(new U256(0xff).toString()).toBe("255");
    });

    test("plus", () => {
        expect(U256.plus(10, 5)).toEqual(new U256(10 + 5));
        expect(() => {
            U256.plus(U256.MAX_VALUE, 1);
        }).toThrow("overflow");
        expect(() => {
            U256.plus(-1, 0);
        }).toThrow("U256");
    });

    test("minus", () => {
        expect(U256.minus(10, 5)).toEqual(new U256(10 - 5));
        expect(() => {
            U256.minus(5, 10);
        }).toThrow("underflow");
        expect(() => {
            U256.minus(-1, -1);
        }).toThrow("U256");
    });

    test("times", () => {
        expect(U256.times(10, 5)).toEqual(new U256(10 * 5));
        expect(U256.times(U256.MAX_VALUE, 0)).toEqual(new U256(0));
        expect(U256.times(U256.MAX_VALUE, 1)).toEqual(U256.MAX_VALUE);
        expect(() => {
            U256.times(U256.MAX_VALUE, 2);
        }).toThrow("overflow");
        expect(() => {
            U256.times(-1, -1);
        }).toThrow("U256");
    });

    test("idiv", () => {
        expect(U256.idiv(10, 5)).toEqual(new U256(10 / 5));
        expect(U256.idiv(14, 5)).toEqual(new U256(2));
        expect(() => {
            U256.idiv(10, 0);
        }).toThrow("Divided by 0");
        expect(() => {
            U256.idiv(-1, -1);
        }).toThrow("U256");
    });

    test("mod", () => {
        expect(U256.mod(10, 5)).toEqual(new U256(0));
        expect(U256.mod(14, 5)).toEqual(new U256(4));
        expect(() => {
            U256.mod(10, 0);
        }).toThrow("Divided by 0");
        expect(() => {
            U256.mod(-1, -1);
        }).toThrow("U256");
    });

    test("Comparison", () => {
        expect(new U256(11).gt(10)).toBe(true);
        expect(new U256(10).gt(10)).toBe(false);
        expect(new U256(9).gt(10)).toBe(false);
        expect(new U256(11).isGreaterThan(10)).toBe(true);
        expect(new U256(10).isGreaterThan(10)).toBe(false);
        expect(new U256(9).isGreaterThan(10)).toBe(false);

        expect(new U256(11).gte(10)).toBe(true);
        expect(new U256(10).gte(10)).toBe(true);
        expect(new U256(9).gte(10)).toBe(false);
        expect(new U256(11).isGreaterThanOrEqualTo(10)).toBe(true);
        expect(new U256(10).isGreaterThanOrEqualTo(10)).toBe(true);
        expect(new U256(9).isGreaterThanOrEqualTo(10)).toBe(false);

        expect(new U256(11).lt(10)).toBe(false);
        expect(new U256(10).lt(10)).toBe(false);
        expect(new U256(9).lt(10)).toBe(true);
        expect(new U256(11).isLessThan(10)).toBe(false);
        expect(new U256(10).isLessThan(10)).toBe(false);
        expect(new U256(9).isLessThan(10)).toBe(true);

        expect(new U256(11).lte(10)).toBe(false);
        expect(new U256(10).lte(10)).toBe(true);
        expect(new U256(9).lte(10)).toBe(true);
        expect(new U256(11).isLessThanOrEqualTo(10)).toBe(false);
        expect(new U256(10).isLessThanOrEqualTo(10)).toBe(true);
        expect(new U256(9).isLessThanOrEqualTo(10)).toBe(true);
    });
});
