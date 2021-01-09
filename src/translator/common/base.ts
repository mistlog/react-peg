import { Chunk } from "../../chunk/chunk";

export abstract class Translator {
    abstract translate(chunk: Chunk, actions: Map<string, Function>): string;
}