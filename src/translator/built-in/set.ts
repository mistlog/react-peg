import { Translator } from "../common/base";
import { Chunk } from "../../chunk/chunk";

export class SetTranslator extends Translator {
    translate(chunk: Chunk) {
        const pattern = `[${chunk.children.join("")}]`;
        return pattern;
    }
}