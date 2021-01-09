import { Translator } from "../common/base";
import { Chunk } from "../../chunk/chunk";
import { translateChildren } from "../common/pattern";

export class OptionalTranslator extends Translator {
    translate(chunk: Chunk, actions: Map<string, Function>) {
        const expression = translateChildren(chunk, actions).join(" ");
        const pattern = `(${expression})?`;
        return pattern;
    }
}