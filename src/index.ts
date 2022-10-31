import {parser} from "./syntax.grammar"
import {LRLanguage, LanguageSupport} from "@codemirror/language"
import {Extension} from "@codemirror/state"
import {styleTags, tags as t} from "@lezer/highlight"

export const jqLanguage = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        Identifier: t.variableName,
        Boolean: t.bool,
        Number: t.number,
        String: t.string,
        Channel: t.controlKeyword,
        Identity: t.keyword,
        Colon: t.controlKeyword,
        Comma: t.separator,
        Optional: t.controlOperator,
        MathOperators: t.controlOperator,
        "( )": t.paren,
        "{ }": t.brace,
        "[ ]": t.squareBracket
      })
    ]
  }),
  languageData: {
  }
})

export function jq(support?: Extension) {
  return new LanguageSupport(jqLanguage, support)
}
