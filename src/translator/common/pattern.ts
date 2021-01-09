import { Chunk } from "../../chunk/chunk";
import { TranslatorTable } from "./translator-table";

export function translate(chunk: Chunk, actions: Map<string, Function> = new Map<string, Function>()) {
    const label = chunk.props.label ? `${chunk.props.label}: ` : "";
    let pattern = "__undefined__";

    if (chunk.tagName) {
        const key = chunk.tagName;
        const Translator = TranslatorTable[key];
        pattern = new Translator().translate(chunk, actions);
    }
    else {
        pattern = chunk.rule.name;
    }

    return `${label}${pattern}`;
}

export function translateChildren(chunk: Chunk, actions: Map<string, Function>) {
    return (chunk.children as Array<Chunk>).map(child => translate(child, actions));
}