import { Translator } from "../common/base";
import { Chunk } from "../../chunk/chunk";

export class AnyCharacterTranslator extends Translator {
    translate(chunk: Chunk) {
        return `.`;
    }
}