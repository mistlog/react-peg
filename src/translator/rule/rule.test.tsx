import { ReactPeg } from "../../index";
import { RuleTranslator } from "./rule";

test("translator.rule", () =>
{
    class Test extends ReactPeg.Rule<{}>
    {
        render()
        {
            return (
                <text>abc</text>
            );
        }

        action()
        {
            return {};
        }
    }

    const chunk = <Test />;
    const rule = new RuleTranslator().translate(chunk);
    expect(rule).toEqual(`Test = 'abc' { return actions.get('Test')({global}); }`);
})


test("translator.rule.label", () =>
{
    class Test extends ReactPeg.Rule<{}>
    {
        render()
        {
            return (
                <repeat type="+" label="l">
                    <or label="a">
                        <text label="c">a</text>
                        <text label="t">b</text>
                    </or>
                </repeat>
            );
        }

        action()
        {
            return {};
        }
    }

    const chunk = <Test />;
    const rule = new RuleTranslator().translate(chunk);
    expect(rule).toEqual(`Test = l: ( a: ( c: 'a'/t: 'b' ) )+ { return actions.get('Test')({l, global}); }`);
})

test("translator.rule.pattern", () =>
{

    class Foo extends ReactPeg.Rule<{}>{
        render()
        {
            return (
                <text>hi</text>
            );
        }

        action()
        {
            return {};
        }
    }

    class Test extends ReactPeg.Rule<{}>
    {
        render()
        {
            return (
                <list>
                    <Foo />
                </list>
            );
        }

        action()
        {
            return {};
        }
    }

    const chunk = <Test />;
    const rule = new RuleTranslator().translate(chunk);
    expect(rule).toEqual(`Test = Foo { return actions.get('Test')({global}); }`);

})