
import { ReactPeg } from "../index";

test("chunk.tag", () => {
    const chunk = <text>abc</text>;
    expect(chunk).toEqual({ props: {}, children: ['abc'], tagName: 'text' });
})

test("chunk.rule", () => {
    function Test() {
        return (
            { props: {}, children: [] }
        )
    }

    const chunk = <Test foo="hi"></Test>;
    expect(chunk).toEqual({ props: { foo: 'hi' }, children: [], rule: Test });
})