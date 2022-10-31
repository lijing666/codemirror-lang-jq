# codemirror-lang-jq (no release)
CodeMirror 6 language package for [jq](https://stedolan.github.io/jq/manual) json expression

# base usage
```typescript

import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { jq } from 'codemirror-lang-jq';

new EditorView({
  state: EditorState.create({
    doc: `.a | .b | {d, e: .c}`,
    extensions: [basicSetup, jq()],
  }),
  parent: document.querySelector('#editor'),
});
```
# autocomplete settings
```typescript

import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { CompletionContext } from "@codemirror/autocomplete"
import { jq, jqLanguage } from 'codemirror-lang-jq';

// example autocomplete parser
const autocompleteParser = (acContext: CompletionContext) => {
  //match input .
  let identityStr = acContext.matchBefore(/.*\./)
  if (!identityStr) {
    return null
  }
  if (identityStr.from == identityStr.to && !acContext.explicit) {
    return null
  }
  //give some autocomplete words
  return {
    from: identityStr.to,
    options: [
      { label: 'match', type: 'keyword' },
      { label: 'hello', type: 'variable', info: '(World)' },
      { label: 'magic', type: 'text', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro' }
    ]
  }
}
let autoCompletions = jqLanguage.data.of({
  autocomplete: autocompleteParser
});
new EditorView({
  state: EditorState.create({
    doc: `.a | .b | {d, e: .c}`,
    extensions: [basicSetup, jq(autoCompletions)],
  }),
  parent: document.querySelector('#editor'),
});
```



