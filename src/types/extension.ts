import DefaultMarkdown, { MarkdownBuilder } from "..";

type Prototype<T> = { prototype: T };

type SubType<Base, Condition> = Pick<
    Base,
    {
        [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
    }[keyof Base]
>;

type ExtractMethods<T = any> = SubType<T, Function>;

type ExtendsMarkdownBuilder = typeof MarkdownBuilder & Prototype<MarkdownBuilder>;

type StaticBuildable<T extends MarkdownBuilder> = {
    newBuilder(this: T): T;
};

type ChainedMarkdownInstance<T> = ExtractMethods<T> & {
    newBuilder(this: T): T;
};

export type ChainedBuilderInstance<T extends MarkdownBuilder = MarkdownBuilder> = StaticBuildable<T> & Prototype<T> & T;

export type InferMarkdownBuilderInstanceType<T extends ChainedBuilderInstance> = T extends { newBuilder(this: infer R): infer R } ? R : never;

type ExtensionFunctionParams<T> = T extends {
    markdown: infer M;
    Builder: infer B;
}
    ? {
          markdown: ChainedMarkdownInstance<M>;
          Builder: B;
      }
    : T;

type MarkdownExtensionBuilderReturn<B extends MarkdownBuilder, M> = {
    markdown: M;
    Builder: B;
};

export type ExtendedMarkdown<B extends MarkdownBuilder, M> = {
    markdown: ChainedMarkdownInstance<M>;
    Builder: ChainedBuilderInstance<B>;
};

export type MarkdownExtensionBuilder<
    RB extends MarkdownBuilder,
    RM extends M,
    B extends ExtendsMarkdownBuilder = ExtendsMarkdownBuilder,
    M extends typeof DefaultMarkdown = typeof DefaultMarkdown,
    T extends ExtensionFunctionParams<{
        markdown: M;
        Builder: B;
    }> = ExtensionFunctionParams<{
        markdown: M;
        Builder: B;
    }>
> = (props: T) => MarkdownExtensionBuilderReturn<RB, RM>;
