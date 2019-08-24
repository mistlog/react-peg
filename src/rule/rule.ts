import { Chunk } from "../chunk/chunk";

export interface ActionParam
{
    global: { text: Function, location: Function };
    [label: string]: any;
}

export abstract class Rule<Props, AstNode = {}>{
    props: Props;

    constructor(props)
    {
        this.props = props;
    }

    abstract render(): Chunk;
    abstract action(param: ActionParam): AstNode;
}