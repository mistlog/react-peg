import { Translator } from "../common/base";
import { Chunk, AssertType } from "../../chunk/chunk";
import { translatePattern } from "../common/pattern";

export class AssertTranslator extends Translator
{
    translate(chunk: Chunk)
    {
        const type = chunk.props.type as AssertType === "with" ? "&" : "!";
        const pattern = `${type}( ${(chunk.children as Array<Chunk>).map(child => translatePattern(child)).join(" ")} )`;
        return pattern;
    }
}