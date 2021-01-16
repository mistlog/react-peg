import { ReactPeg } from "../index";

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