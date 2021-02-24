import { RepeatType, AssertType } from "../../chunk/chunk";

export interface BuiltInRule {
    label?: string;
}

export interface TextRule extends BuiltInRule {
    children?: string;
}

export interface AnyCharacterRule extends BuiltInRule {
    
}

export interface OrRule extends BuiltInRule {
    children: Array<JSX.Element>;
}

export interface ListRule extends BuiltInRule {
    children: JSX.Element | Array<JSX.Element>;
}

export interface RepeatRule extends BuiltInRule {
    children: JSX.Element | Array<JSX.Element>;
    type: RepeatType;
}

export interface SetRule extends BuiltInRule {
    children: string;
}

export interface OptionalRule extends BuiltInRule {
    children: JSX.Element | Array<JSX.Element>;
}

export interface AssertRule extends BuiltInRule {
    children: JSX.Element;
    type: AssertType;
}

export interface PatternRule extends BuiltInRule {
    children: JSX.Element | Array<JSX.Element>;
    action: Function;
}