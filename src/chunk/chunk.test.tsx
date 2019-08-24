
import { ReactPeg } from "../index";

test("chunk.tag", () =>
{
    const chunk = <text>abc</text>;
    expect(chunk).toEqual({ props: {}, children: ['abc'], tagName: 'text' });
})

test("chunk.rule", () =>
{
    class Test extends ReactPeg.Rule<{ foo: string }>{
        render()
        {
            return { props: {}, children: [] }
        }

        action()
        {
            return {};
        }
    }

    const chunk = <Test foo="hi"></Test>;
    expect(chunk).toEqual({ props: { foo: 'hi' }, children: [], rule: Test });
})