import { Translator } from "../common/base";
import { Chunk } from "../../chunk/chunk";
import { translate } from "../common/pattern";

export class RuleTranslator extends Translator {
    cache: { name: string, chunkOutput: Chunk, rule: Function };

    constructor() {
        super();
        this.cache = { name: "__undefined__", chunkOutput: null, rule: null };
    }

    translate(chunkInput: Chunk, actions: Map<string, Function> = new Map<string, Function>()) {
        //
        const name = chunkInput.rule.name;
        const chunkOutput = Reflect.apply(chunkInput.rule, null, [chunkInput.props]);
        const pattern = translate(chunkOutput, actions);

        //
        this.cache.name = name;
        this.cache.chunkOutput = chunkOutput;
        this.cache.rule = chunkInput.rule;

        //
        const rule = `${name} "${name}" = ${pattern}`;
        return rule;
    }
}