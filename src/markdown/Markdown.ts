import { JsUtils } from "js-utils-lite";
import {
    MarkdownBaseNode,
    MarkdownBlockQuote,
    MarkdownBold,
    MarkdownBoldItalic,
    MarkdownCode,
    MarkdownCodeBlock,
    MarkdownCodeType,
    MarkdownCompositeNodes,
    MarkdownContent,
    MarkdownImage,
    MarkdownItalic,
    MarkdownLineBreak,
    MarkdownLink,
    MarkdownList,
    MarkdownNewLine,
    MarkdownSeparator,
    MarkdownStrikethrough,
    MarkdownTable,
    MarkdownText,
} from "./MarkdownDeclares";
import { MarkdownTableBuilder } from "./MarkdownTableBuilder";
import { MarkdownListBuilder, MarkdownListItems } from "./MarkdownListBuilder";
import { MarkdownBuilder } from "./MarkdownBuilder";
import { HtmlStyles } from "..";

/**
 * @author mlsm-trl <mlsm@trialent.com>, arnozhang <zyfgood12@163.com>
 */

export const markdown = {
    bold(content: MarkdownContent) {
        return new MarkdownBold(content);
    },

    italic(content: MarkdownContent) {
        return new MarkdownItalic(content);
    },

    boldItalic(content: MarkdownContent) {
        return new MarkdownBoldItalic(content);
    },

    strikethrough(content: MarkdownContent) {
        return new MarkdownStrikethrough(content);
    },

    text(content: MarkdownContent) {
        return new MarkdownText(content);
    },

    blockQuote(content: MarkdownContent) {
        return new MarkdownBlockQuote(content);
    },

    code(content: string) {
        return new MarkdownCode(content);
    },

    codeBlock(codeType: MarkdownCodeType, content: string) {
        return new MarkdownCodeBlock(codeType, content);
    },

    linebreak(count?: number) {
        return new MarkdownLineBreak(count);
    },

    newline() {
        return new MarkdownNewLine();
    },

    separator() {
        return new MarkdownSeparator();
    },

    image(url: string, description?: string) {
        return new MarkdownImage(url, description);
    },

    link(url: string, title?: string) {
        return new MarkdownLink(url, title);
    },

    table(table: MarkdownTableBuilder) {
        return new MarkdownTable(table);
    },

    list(items: MarkdownListItems | MarkdownListBuilder, ordered?: boolean) {
        return new MarkdownList(items, ordered);
    },

    compositeNodes(...nodes: MarkdownBaseNode[]) {
        if (JsUtils.isNotEmpty(nodes)) {
            return new MarkdownCompositeNodes(...nodes);
        }

        return null;
    },

    newBuilder<T extends typeof MarkdownBuilder>(customBuilder?: T): InstanceType<T> {
        return (customBuilder || MarkdownBuilder).newBuilder() as InstanceType<T>;
    },

    newTableBuilder(row: number, col: number) {
        return MarkdownTableBuilder.newBuilder(row, col);
    },

    newListBuilder(items?: MarkdownListItems, ordered?: boolean) {
        return MarkdownListBuilder.newBuilder(items, ordered);
    },

    newHtmlStyles() {
        return HtmlStyles.newStyles();
    },

    defaultHtmlStyles() {
        return HtmlStyles.defaultStyles();
    },
};
