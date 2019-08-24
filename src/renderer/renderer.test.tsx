import { ReactPeg, ActionParam } from "../index";

export type DigitNode = string;

export class Digit extends ReactPeg.Rule<{}, DigitNode>{

    render()
    {
        return (
            <set>0-9</set>
        );
    }

    action(param: ActionParam)
    {
        return param.global.text();
    }

}

test("renderer", () =>
{
    const parser = ReactPeg.render(<Digit />);
    const ast = parser.parse("1");
    expect(ast).toEqual("1");
})

test("renderer.cache-rule", () =>
{
    interface CacheTestActionParam extends ActionParam
    {
        result: Array<string>;
    }

    class CacheTest extends ReactPeg.Rule<{}>
    {
        render()
        {
            return (
                <list label="result">
                    <Digit />
                    <Digit />
                </list>
            );
        }

        action(param: CacheTestActionParam)
        {
            const { result } = param;
            return result.join("");
        }
    }
    const parser = ReactPeg.render(<CacheTest />);
    const ast = parser.parse("12");
    expect(ast).toEqual("12");
})