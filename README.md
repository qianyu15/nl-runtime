
# NL Runtime

**日本語でブラウザ操作を書くための実験的JavaScriptランタイム**

nl-runtime is an experimental runtime that allows developers to describe
simple web interactions using Japanese natural language sentences.

Instead of writing:

```js
button.addEventListener("click", () => {
  document.body.style.background = "red";
});
````

you can write:

```html
<script type="text/nl">
クリックしたら背景を赤にする
</script>
```

The runtime interprets natural language instructions and converts them
into browser DOM operations.

---

## Why NL Runtime?

Programming languages are precise, but they also create a barrier for beginners.

nl-runtime explores a question:

> Can basic web interactions be expressed in a way closer to human language?

This project is not designed to replace JavaScript.
It is a research-oriented experiment exploring natural language interfaces
for programming.

---

## Demo

[Live Demo](https://qianyu15.github.io/nl-runtime/examples/)

---

## How it works

```
Natural Language
        |
        v
<script type="text/nl">
        |
        v
Parser
        |
        v
Internal Event Mapping
        |
        v
DOM Operations
```

The runtime performs:

1. Detect `<script type="text/nl">` blocks
2. Parse Japanese instruction patterns
3. Convert instructions into browser events/actions
4. Execute generated DOM operations

---

## Supported Examples

### Event handling

```html
<script type="text/nl">
クリックしたら背景を赤にする
</script>
```

Equivalent concept:

```js
element.addEventListener("click", ...)
```

### UI modification

```html
<script type="text/nl">
マウスが乗ったら文字を大きくする
</script>
```

---

## Technical Challenges

Natural language is ambiguous.

For example:

「赤くする」

could mean:

* Change text color
* Change background color
* Change another element

nl-runtime intentionally uses simple rules instead of a full AI model,
making it lightweight and runnable entirely in the browser.

---

## Goals

* Explore natural language programming interfaces
* Make programming concepts easier to visualize
* Provide an educational environment for experimenting with code generation ideas

---

## Non-goals

nl-runtime is not:

* A replacement for JavaScript
* A production framework
* A complete natural language compiler

It is an experimental runtime for exploring the boundary between
human language and programming languages.

---

## Architecture

* Browser-only execution
* No server required
* No external AI API required
* Lightweight parser-based implementation

---

## Status

Experimental project.

The syntax, parser rules, and supported expressions may change as the project evolves.
