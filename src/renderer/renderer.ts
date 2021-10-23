import { Chunk, isChunk } from "../chunk/chunk";
import { RuleTranslator } from "../translator/rule/rule";
import * as peg from "pegjs";

export interface ITraceEvent {
    type: "rule.enter" | "rule.fail" | "rule.match"
    rule: string
    location: peg.LocationRange
}
export interface ITracer {
    trace: (event: ITraceEvent) => void
}

class Renderer {
    initializer: string;

    start: Chunk;
    grammar: Map<string, string>;
    rules: Map<string, Function>;
    actions: Map<string, Function>;
    tracer: ITracer = null;

    constructor(chunk: Chunk) {
        this.initializer = `
            {
                const { actions, context } = options;
                const globalFunction = {
                    location,
                    text
                };
                const globalContext = context || {};
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
        this.parser = peg.generate(this.grammar, { trace: Boolean(renderer.tracer) });
    }

    parse(code: string, context = {}) {
        try {
            const options: peg.ParserOptions = { actions: this.renderer.actions, context };
            if (this.renderer.tracer) {
                /**
                 * Tracing with peg.js: https://gist.github.com/mistlog/3ac6fdf7de3e7af2da15b339b4bb5187
                 */
                options.tracer = this.renderer.tracer;
            }
            const ast = this.parser.parse(code, options);
            return ast;
        } catch (error) {
            throw { message: error.message, location: error.location, stack: error.stack };
        }
    }
}

export interface IRenderConfig {
    tracer?: ITracer
}

export function render(chunk: Chunk, config: IRenderConfig = {}) {
    const renderer = new Renderer(chunk);
    if (config.tracer) {
        renderer.tracer = config.tracer;
    }
    const parser = new Parser(renderer);
    return parser;
}

