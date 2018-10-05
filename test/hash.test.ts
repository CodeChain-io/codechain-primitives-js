import {
    blake128,
    blake128WithKey,
    blake160,
    blake160WithKey,
    blake256,
    blake256WithKey,
    ripemd160
} from "..";

test("blake128", () => {
    const hash = blake128("deadbeef");
    expect(/^[0-9a-fA-F]{32}$/.test(hash)).toBe(true);
});

test("blake128WithKey", () => {
    const hash = blake128WithKey("deadbeef", new Uint8Array(16));
    expect(/^[0-9a-fA-F]{32}$/.test(hash)).toBe(true);
});

test("blake160", () => {
    const hash = blake160("deadbeef");
    expect(/^[0-9a-fA-F]{40}$/.test(hash)).toBe(true);
});

test("blake160WithKey", () => {
    const hash = blake160WithKey("deadbeef", new Uint8Array(16));
    expect(/^[0-9a-fA-F]{40}$/.test(hash)).toBe(true);
});

test("blake256", () => {
    const hash = blake256("deadbeef");
    expect(/^[0-9a-fA-F]{64}$/.test(hash)).toBe(true);
});

test("blake256WithKey", () => {
    const hash = blake256WithKey("deadbeef", new Uint8Array(16));
    expect(/^[0-9a-fA-F]{64}$/.test(hash)).toBe(true);
});

test("ripemd160", () => {
    const hash = ripemd160("deadbeef");
    expect(/^[0-9a-fA-F]{40}$/.test(hash)).toBe(true);
});
