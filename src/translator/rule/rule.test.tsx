import { ReactPeg } from "../../index";
import { RuleTranslator } from "./rule";

test("translator.rule", () => {
    function Test() {
        return (
            <text>abc</text>
        )
    }
    const chunk = <Test />;
    const rule = new RuleTranslator().translate(chunk);
    expect(rule).toEqual(`Test = 'abc'`);
})


test("translator.rule.label", () => {
    function Test() {
        return (
            <repeat type="+" label="l">
                <or label="a">
                    <text label="c">a</text>
                    <text label="t">b</text>
                </or>
            </repeat>
        );
    }

    const chunk = <Test />;
    const rule = new RuleTranslator().translate(chunk);
    expect(rule).toMatchSnapshot();
})

test("translator.rule.pattern", () => {

    function Foo() {
        return (
            <text>hi</text>
        );
    }

    function Test() {
        return (
            <list>
                <Foo />
            </list>
        );
    }

    const chunk = <Test />;
    const rule = new RuleTranslator().translate(chunk);
    expect(rule).toEqual(`Test = Foo`);

})

interface ICharProps {
    uppercase?: boolean
}
export function Char(props: ICharProps) {
    const { uppercase = false } = props;

    return (
        <pattern action={({ globalFunction }) => globalFunction.text()}>
            <set>{`${uppercase ? "a-z" : "A-Z"}`}</set>
        </pattern>
    )
}

test("translator.rule.props", () => {
    {
        const chunk = <Char />;
        const rule = new RuleTranslator().translate(chunk);
        expect(rule).toMatchSnapshot();
    }
    {
        const chunk = <Char uppercase />;
        const rule = new RuleTranslator().translate(chunk);
        expect(rule).toMatchSnapshot();
    }
})