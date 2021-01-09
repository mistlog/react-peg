import { Translator } from "../common/base";
import { Chunk, AssertType } from "../../chunk/chunk";
import { translateChildren } from "../common/pattern";

export class AssertTranslator extends Translator {
    translate(chunk: Chunk, actions: Map<string, Function>) {
        const assertType = chunk.props.type as AssertType === "with" ? "&" : "!";
        const expression = translateChildren(chunk, actions).join(" ");
        const pattern = `${assertType}(${expression})`;
        return pattern;
    }
}