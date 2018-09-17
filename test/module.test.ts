import { H128 } from "..";

test("import", () => {
    expect(typeof H128).toBe("function");
});

test("require", () => {
    const obj = require("..");
    expect(typeof obj.H128).toBe("function");
});
