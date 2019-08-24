import { Chunk } from "../../chunk/chunk";
import { TranslatorTable } from "./translator-table";

export function translatePattern(chunk: Chunk)
{
    const label = chunk.props.label ? `${chunk.props.label}: ` : "";
    let pattern = "__undefined__";

    if (chunk.tagName)
    {
        const key = chunk.tagName;
        const Translator = TranslatorTable[key];
        pattern = new Translator().translate(chunk);
    }
    else
    {
        pattern = chunk.rule.name;
    }

    return `${label}${pattern}`;
}