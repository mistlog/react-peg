import { ReactPeg } from "../index";
import { ITracer } from "./renderer";

export type DigitNode = string;

export function Digit() {
    return (
        <pattern action={({ globalFunction }) => globalFunction.text()}>
            <set>0-9</set>
        </pattern>
    );
}


test("renderer", () => {
    const parser = ReactPeg.render(<Digit />);
    const ast = parser.parse("1");
    expect(ast).toEqual("1");
})


test("renderer.parse", () => {
    const parser = ReactPeg.render(<Digit />);
    expect(() => {
        parser.parse("a")
    }).toThrowErrorMatchingSnapshot();
})


test("renderer.cache-rule", () => {

    function CacheTest() {
        return (
            <pattern action={({ values }) => {
                return values.join("");
            }}>
                <list label="values">
                    <Digit />
                    <Digit />
                </list>
            </pattern>
        );
    }

    const parser = ReactPeg.render(<CacheTest />);
    const ast = parser.parse("12");
    expect(ast).toEqual("12");
})

test("renderer: tracer", () => {
    function TracerTest() {
        return (
            <pattern action={({ values }) => {
                return values.join("");
            }}>
                <list label="values">
                    <Digit />
                    <Digit />
                    <Digit />
                </list>
            </pattern>
        );
    }

    const tracer: ITracer = {
        trace: event => {
            expect(event).toMatchSnapshot();
        }
    };
    const parser = ReactPeg.render(<TracerTest />, { tracer });
    const ast = parser.parse("123");
    expect(ast).toEqual("123");
})

test("renderer.context", () => {

    function ContextTest() {
        return (
            <pattern action={({ digit, globalContext }) => {
                return globalContext.transform(digit);
            }}>
                <Digit label="digit" />
            </pattern>
        );
    }

    const parser = ReactPeg.render(<ContextTest />);
    const ast = parser.parse("1", {
        transform: (digit: string) => `digit value is ${digit}`
    });
    expect(ast).toEqual("digit value is 1");
})