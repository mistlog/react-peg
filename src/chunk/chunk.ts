export type RepeatType = "*" | "+";
export type AssertType = "with" | "without";

export interface Chunk {
    //
    tagName?: string;
    rule?: Function;

    //
    props: { label?: string, type?: RepeatType | AssertType };
    children: object[];
}

export function createChunk(from: string | Function, props: object, ...children: object[]): Chunk {
    const chunk: Chunk = { props: props || {}, children };

    if (typeof from === "string") {
        chunk.tagName = from;
    }
    else {
        chunk.rule = from;
    }

    return chunk;
}

export function isChunk(obj: object) {
    return typeof obj !== "string" && "props" in obj && "children" in obj;
}

