import { Chunk, isChunk } from "../chunk/chunk";
import { RuleTranslator } from "../translator/rule/rule";
import * as peg from "pegjs";

class Renderer {
    initializer: string;

    start: Chunk;
    grammar: Map<string, string>;
    rules: Map<string, Function>;
    actions: Map<string, Function>;

    constructor(chunk: Chunk) {
        this.initializer = `
            {
                const { actions } = options;
                const globalFunction = {
                    location,
                    text
                };
            }
        `;

        this.start = chunk;
        this.grammar = new Map<string, string>();
        this.grammar.set("initializer", this.initializer);
        this.rules = new Map<string, Function>();
        this.actions = new Map<string, Function>();
    }

    render() {
        this.collectRule(this.start);
        const grammar = [...this.grammar.values()].join("\n\n");
        return grammar;
    }

    collectRule(chunk: Chunk) {
        if (!isChunk(chunk)) {
            return;
        }

        if (chunk.rule) {
            const translator = new RuleTranslator();
            const ruleStr = translator.translate(chunk, this.actions);
            const { name, chunkOutput, rule } = translator.cache;

            if (this.rules.has(name)) {
                return;
            }

            this.rules.set(name, rule);
            this.grammar.set(name, ruleStr);
            this.collectRule(chunkOutput);
        }

        chunk.children.forEach(child => {
            this.collectRule(child as Chunk);
        })
    }
}

class Parser {
    parser: peg.Parser;
    renderer: Renderer;
    grammar: string;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.grammar = this.renderer.render();
        this.parser = peg.generate(this.grammar);
    }

    parse(code: string) {
        try {
            const ast = this.parser.parse(code, { actions: this.renderer.actions });
            return ast;
        } catch (error) {
            throw { message: error.message, location: error.location, stack: error.stack };
        }
    }
}

export function render(chunk: Chunk) {
    const renderer = new Renderer(chunk);
    const parser = new Parser(renderer);
    return parser;
}

