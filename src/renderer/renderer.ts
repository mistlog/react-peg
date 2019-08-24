import { Chunk, isChunk } from "../chunk/chunk";
import { RuleTranslator } from "../translator/rule/rule";
import { Rule } from "../rule/rule";
import * as peg from "pegjs";

class Renderer
{
    initializer: string;

    start: Chunk;
    grammar: Map<string, string>;
    rules: Map<string, Rule<{}>>;

    constructor(chunk: Chunk)
    {
        this.initializer = `
            {
                const { actions } = options;
                const global = {
                    location,
                    text
                };
            }
        `;

        this.start = chunk;
        this.grammar = new Map<string, string>();
        this.grammar.set("initializer", this.initializer);

        this.rules = new Map<string, Rule<{}>>();
    }

    render()
    {
        this.collectRule(this.start);
        const grammar = [...this.grammar.values()].join("\n\n");
        return grammar;
    }

    collectRule(chunk: Chunk)
    {
        if (!isChunk(chunk))
        {
            return;
        }

        if (chunk.rule)
        {
            //
            const translator = new RuleTranslator();
            const rule = translator.translate(chunk);

            //
            const { name, pattern_chunk, instance } = translator.cache;

            if (this.rules.has(name))
            {
                return;
            }
            
            this.rules.set(name, instance);
            this.grammar.set(name, rule);

            this.collectRule(pattern_chunk);
        }

        chunk.children.forEach(child =>
        {
            this.collectRule(child as Chunk);
        })
    }
}

class Parser
{
    parser: peg.Parser;
    renderer: Renderer;
    actions: Map<string, Function>;
    grammar: string;

    constructor(renderer: Renderer)
    {
        //
        this.renderer = renderer;

        //
        this.grammar = this.renderer.render();
        this.parser = peg.generate(this.grammar);
        this.actions = new Map<string, Function>();
    }

    parse(code: string)
    {
        this.renderer.rules.forEach((rule, name) =>
        {
            this.actions.set(name, rule.action.bind(rule));
        });

        const ast = this.parser.parse(code, { actions: this.actions });
        return ast;
    }
}

export function render(chunk: Chunk)
{
    const renderer = new Renderer(chunk);
    const parser = new Parser(renderer);
    return parser;
}

