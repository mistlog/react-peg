import { Translator } from "../common/base";
import { Chunk, isChunk } from "../../chunk/chunk";
import { translateChildren } from "../common/pattern";

export class PatternTranslator extends Translator {
    translate(chunk: Chunk, actions: Map<string, Function>) {
        const expression = translateChildren(chunk, actions).join(" ");
        const labels = collectLabels(chunk);
        const actionStr = translateAction(chunk.props["action"], labels, actions);
        return `(${expression} ${actionStr})`;
    }
}

function translateAction(action: Function, labels: Array<string>, actions: Map<string, Function>) {
    const labels_param = labels.length === 0 ? "" : `${labels.join(", ")}, `;

    const key = `action${actions.size}`;
    actions.set(key, action);

    const actionStr = `{ 
        return actions.get("${key}")({${labels_param}${["globalFunction", "globalContext"].join(",")}});
    }`;
    return actionStr;
}

function collectLabels(chunk: Chunk): Array<string> {
    if (!isChunk(chunk)) {
        return [];
    }

    const labels = [];

    if (chunk.props.label) {
        labels.push(chunk.props.label);
    }
    else {
        chunk.children.forEach(child => {
            labels.push(...collectLabels(child as Chunk));
        });
    }

    return labels;
}

