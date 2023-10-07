import DefaultMarkdown, { MarkdownBuilder } from "../";
import { ExtendedMarkdown } from "../types/extension";

function extend<RB extends MarkdownBuilder, RM extends M, M extends typeof DefaultMarkdown = typeof DefaultMarkdown>(extensions: { runner: any }[]): ExtendedMarkdown<RB, RM> {
    return extensions.reduce((previousValue, extension) => extension.runner(previousValue as any) as any, {
        markdown: DefaultMarkdown,
        Builder: MarkdownBuilder,
    });
}

export default extend;
