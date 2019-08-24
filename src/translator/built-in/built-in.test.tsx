import { ReactPeg } from "../../index";
import { translatePattern } from "../common/pattern";

test("translator.text", () =>
{
    const chunk = <text>abc</text>;
    const pattern = translatePattern(chunk);
    expect(pattern).toEqual(`'abc'`);
})

test("translator.or", () =>
{
    const chunk = (
        <or>
            <text>a</text>
            <text>b</text>
        </or>
    );
    const pattern = translatePattern(chunk);
    expect(pattern).toEqual(`( 'a'/'b' )`);
})

test("translator.list", () =>
{
    const chunk = (
        <list>
            <text>a</text>
            <text>b</text>
        </list>
    );
    const pattern = translatePattern(chunk);
    expect(pattern).toEqual(`'a' 'b'`);
})

test("translator.repeat.zero-or-more", () =>
{
    const chunk = (
        <repeat type="*">
            <text>a</text>
        </repeat>
    );

    const pattern = translatePattern(chunk);
    expect(pattern).toEqual("( 'a' )*");
})

test("translator.repeat.one-or-more", () =>
{
    const chunk = (
        <repeat type="+">
            <text>a</text>
        </repeat>
    );

    const pattern = translatePattern(chunk);
    expect(pattern).toEqual("( 'a' )+");
});

test("translator.set", () =>
{
    const chunk = (
        <set>a-z0-9A-Z</set>
    );

    const pattern = translatePattern(chunk);
    expect(pattern).toEqual("[a-z0-9A-Z]");
})

test("translator.optional", () =>
{
    const chunk = (
        <list>
            <opt>
                <text>a</text>
            </opt>
            <text>a</text>
        </list>
    );
    const pattern = translatePattern(chunk);
    expect(pattern).toEqual(`( 'a' )? 'a'`);
})

test("translator.assert.with", () =>
{
    const chunk = (
        <list>
            <text>a</text>
            <assert type="with">
                <text>cd</text>
            </assert>
            <text>cdab</text>
        </list>
    );
    const pattern = translatePattern(chunk);
    expect(pattern).toEqual(`'a' &( 'cd' ) 'cdab'`);
})

test("translator.assert.without", () =>
{
    const chunk = (
        <list>
            <text>a</text>
            <assert type="without">
                <text>cd</text>
            </assert>
            <text>cdab</text>
        </list>
    );
    const pattern = translatePattern(chunk);
    expect(pattern).toEqual(`'a' !( 'cd' ) 'cdab'`);
})

test("translator.text.label", () =>
{
    const chunk = <text label="t">abc</text>;
    const pattern = translatePattern(chunk);
    expect(pattern).toEqual(`t: 'abc'`);
})