import { Translator } from "../common/base";
import { Chunk } from "../../chunk/chunk";
import { translateChildren } from "../common/pattern";

export class ListTranslator extends Translator {
    translate(chunk: Chunk, actions: Map<string, Function>) {
        const expression = translateChildren(chunk, actions).join(" ");
        if (chunk.props.label) {
            return `(${expression})`;
        }
        return expression;
    }
}