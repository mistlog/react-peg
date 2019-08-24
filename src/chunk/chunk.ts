import { Rule } from "../rule/rule";

interface RuleConstructor<Props={}>
{
    new(props: object): Rule<Props>
}
export type RepeatType = "*" | "+";
export type AssertType = "with" | "without";

export interface Chunk
{
    //
    tagName?: string;
    rule?: RuleConstructor;

    //
    props: { label?: string, type?: RepeatType | AssertType };
    children: object[];
}

export function createChunk(from: string | RuleConstructor, props: object, ...children: object[]): Chunk
{
    const chunk: Chunk = { props: props || {}, children };

    if (typeof from === "string")
    {
        chunk.tagName = from;
    }
    else
    {
        chunk.rule = from;
    }

    return chunk;
}

export function isChunk(obj: object)
{
    return typeof obj !== "string" && "props" in obj && "children" in obj;
}

