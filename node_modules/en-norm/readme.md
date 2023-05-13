# English Sentence Normalizer

## Functions

- Contractions resolver: `I'm` -> `I am`
- Confusable characters replacements: `”` -> to `"`
- Uppercasing and all-caps normalizer: `HOW IS ALEX` -> `how is Alex`

## Installation

```
npm i --save en-norm
```

## Usage

```typescript

import {normalizeCaps, replaceConfusables, resolveContractions} from "en-norm";

console.log(resolveContractions("I'd be happy to do that"));
console.log(replaceConfusables("He’s there"));
console.log(normalizeCaps(["MY","NAME","IS","ALEX"])); // must be an array of tokens

```

The above example would output:

```
"I would happy to do that"
"He's there"
["my","name","is","alex"]
```