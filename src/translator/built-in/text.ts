import { Translator } from "../common/base";
import { Chunk } from "../../chunk/chunk";

export class TextTranslator extends Translator
{
    translate(chunk: Chunk)
    {
        const text = chunk.children.join("");
        const pattern = `'${text}'`;
        return pattern;
    }
}