import { TextTranslator } from "../built-in/text";
import { RuleTranslator } from "../rule/rule";
import { OrTranslator } from "../built-in/or";
import { ListTranslator } from "../built-in/list";
import { RepeatTranslator } from "../built-in/repeat";
import { OptionalTranslator } from "../built-in/opt";
import { AssertTranslator } from "../built-in/assert";
import { SetTranslator } from "../built-in/set";
import { PatternTranslator } from "../built-in/pattern";
import { AnyCharacterTranslator } from "../built-in/any";

export const TranslatorTable =
{
    "rule": RuleTranslator,
    "list": ListTranslator,
    "repeat": RepeatTranslator,
    "set": SetTranslator,
    "opt": OptionalTranslator,
    "assert": AssertTranslator,
    "text": TextTranslator,
    "or": OrTranslator,
    "pattern": PatternTranslator,
    "any": AnyCharacterTranslator
}