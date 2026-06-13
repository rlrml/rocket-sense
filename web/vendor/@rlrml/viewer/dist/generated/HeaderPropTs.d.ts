export type HeaderPropTs = {
    "Array": Array<Array<[string, HeaderPropTs]>>;
} | {
    "Bool": boolean;
} | {
    "Byte": {
        kind: string;
        value: string | null;
    };
} | {
    "Float": number;
} | {
    "Int": number;
} | {
    "Name": string;
} | {
    "QWord": string;
} | {
    "Str": string;
} | {
    "Struct": {
        name: string;
        fields: Array<[string, HeaderPropTs]>;
    };
};
//# sourceMappingURL=HeaderPropTs.d.ts.map