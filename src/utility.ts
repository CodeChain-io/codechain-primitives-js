const toHexByte = (byte: number) =>
    byte < 0x10 ? `0${byte.toString(16)}` : byte.toString(16);

/**
 * Converts buffer to hexadecimal string.
 * @param buffer arbritrary length of data
 * @returns hexadecimal string
 */
export const toHex = (buffer: Buffer): string => {
    return Array.from(buffer)
        .map(toHexByte)
        .join("");
};
