import { createChunk, Chunk } from "./chunk/chunk";
import { render } from "./renderer/renderer";
import { TextRule, OrRule, ListRule, RepeatRule, SetRule, OptionalRule, AssertRule, PatternRule, AnyCharacterRule } from "./translator/common/type";

export { ActionParam } from "./rule/rule";
export { Chunk } from "./chunk/chunk";

export { PegjsError as SyntaxError } from "pegjs";

export const ReactPeg = {
    createChunk,
    render,
};

declare global {
    namespace JSX {
        interface ElementAttributesProperty {
            props: any;
        }
        interface ElementChildrenAttribute {
            children: null;
        }

        interface Element extends Chunk {

        }

        interface ElementClass {
            render: Function;
        }

        interface IntrinsicElements {
            text: TextRule;
            or: OrRule;
            list: ListRule;
            repeat: RepeatRule;
            set: SetRule;
            opt: OptionalRule;
            assert: AssertRule;
            pattern: PatternRule;
            any: AnyCharacterRule;
        }
    }
}