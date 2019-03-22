/**
 * @hidden
 */
export declare function encode(prefix: any, words: any, LIMIT?: any): any;
/**
 * @hidden
 */
export declare function decode(str: string, prefix: string, LIMIT?: number): {
    prefix: string;
    words: number[];
};
/**
 * @hidden
 */
export declare function toWords(bytes: any): number[];
/**
 * @hidden
 */
export declare function fromWords(words: any): number[];
