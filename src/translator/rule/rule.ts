import { Translator } from "../common/base";
import { Chunk, isChunk } from "../../chunk/chunk";
import { Rule } from "../../rule/rule";
import { translatePattern } from "../common/pattern";

export class RuleTranslator extends Translator
{
    cache: { name: string, pattern_chunk: Chunk, instance: Rule<{}> };

    constructor()
    {
        super();
        this.cache = { name: "__undefined__", pattern_chunk: null, instance: null };
    }

    translate(chunk: Chunk)
    {
        //
        const name = chunk.rule.name;

        //
        const rule_instance = new chunk.rule(chunk.props);
        
        const pattern_chunk = rule_instance.render();
        const pattern = translatePattern(pattern_chunk);

        //
        const labels = collectLabels(pattern_chunk);
        const action = translateAction(name, rule_instance, labels);
        const rule = `${name} = ${pattern} ${action}`;

        //
        this.cache.name = name;
        this.cache.pattern_chunk = pattern_chunk;
        this.cache.instance = rule_instance;

        return rule;
    }
}

function translateAction(name: string, rule: Rule<{}>, labels: Array<string>)
{
    const labels_param = labels.length === 0 ? "" : `${labels.join(", ")}, `;
    const action = `{ return actions.get('${name}')({${labels_param}global}); }`;
    return action;
}

function collectLabels(chunk: Chunk): Array<string>
{
    if (!isChunk(chunk))
    {
        return [];
    }

    const labels = [];

    if (chunk.props.label)
    {
        labels.push(chunk.props.label);
    }
    else
    {
        chunk.children.forEach(child =>
        {
            labels.push(...collectLabels(child as Chunk));
        });
    }

    return labels;
}