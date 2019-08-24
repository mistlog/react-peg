import { Translator } from "../common/base";
import { Chunk } from "../../chunk/chunk";
import { translatePattern } from "../common/pattern";

export class RepeatTranslator extends Translator
{
    translate(chunk: Chunk)
    {
        const pattern = `( ${(chunk.children as Array<Chunk>).map(child => translatePattern(child)).join(" ")} )${chunk.props.type}`;
        return pattern;
    }
}