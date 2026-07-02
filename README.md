# NL Runtime

**Natural Language JavaScript Runtime for the Browser**

A browser-based runtime that executes JavaScript logic written in Japanese natural language sentences.

---

## Overview

nl-runtime is an experimental JavaScript runtime that allows developers to describe simple UI interactions using Japanese natural language instead of traditional JavaScript syntax.

It parses natural language sentences embedded in `<script type="text/nl">` and converts them into executable DOM operations in the browser.

---

## Example

```html
<script src="https://qianyu15.github.io/nl-runtime/main.js"></script>

<script type="text/nl">
クリックしたら背景を赤にする
</script>

<script type="text/nl">
ボタンを押したらアラートを表示する
</script>

<script type="text/nl">
マウスが乗ったら文字を大きくする
</script>
```

---

## What it does

nl-runtime translates Japanese natural language instructions into JavaScript DOM operations at runtime.

Examples of supported patterns:

* Click events
* Mouse events
* Basic DOM manipulation
* Simple UI interactions

---

## Design Philosophy

The goal of nl-runtime is not to replace JavaScript, but to explore a more accessible way of expressing basic browser interactions using natural language.

It is designed for:

* Rapid prototyping
* Educational experimentation
* Exploring natural language programming interfaces

---

## Limitations

* Only supports a limited subset of UI interactions
* Not intended for production use
* Experimental parsing rules
* Ambiguous natural language inputs may lead to undefined behavior

---

## Architecture

* Runs entirely in the browser
* Parses `<script type="nl">` blocks
* Converts sentences into internal event-action mappings
* Executes mapped JavaScript DOM operations

---

## Use cases

* Teaching basic programming concepts
* Prototyping UI behavior quickly
* Experimenting with natural language interfaces for code generation

---

## Status

This project is experimental and under active development.
API and supported language patterns may change without notice.

---

## CDN

```html
<script src="https://qianyu15.github.io/nl-runtime/main.js"></script>
```

---

## Notes

Natural language programming is inherently ambiguous.
nl-runtime prioritizes simplicity over completeness.
