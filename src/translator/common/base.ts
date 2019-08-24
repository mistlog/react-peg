import { Chunk } from "../../chunk/chunk";

export abstract class Translator
{
    abstract translate(chunk: Chunk);
}