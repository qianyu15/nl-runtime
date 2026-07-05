(() => {
  const TYPE = "text/nl";

  const mapColor = {
    黒: "black",
    白: "white",
    赤: "red",
    青: "blue",
    緑: "green",
  };

  const context = {
    vars: {},
  };

  function compile(nl) {
    let js = nl;

    // 変数: xを10にする
    js = js.replace(/(\w+)を(\d+)にする/g, (_, name, value) => {
      return `context.vars["${name}"] = ${value};`;
    });

    // 背景
    js = js.replace(/背景を(黒|白|赤|青|緑)にする/g, (_, c) => {
      return `document.body.style.background='${mapColor[c]}';`;
    });

    // クリック
    js = js.replace(/(.+?)をクリックしたら(.+)/g, (_, target, action) => {
      return `
document.querySelector("${target}")?.addEventListener("click", () => {
  ${compile(action)};
});
`;
    });

    // 秒ループ
    js = js.replace(/(\d+)秒ごとに(.+)/g, (_, s, action) => {
      return `
setInterval(() => {
  ${compile(action)};
}, ${s}000);
`;
    });

    // 画面に表示
    js = js.replace(/「(.+?)」を表示/g, (_, text) => {
      return `
const el = document.createElement("div");
el.textContent = "${text}";
document.body.appendChild(el);
`;
    });

    // consoleログ
    js = js.replace(/(.+?)を出力/g, (_, text) => {
      return `console.log(${JSON.stringify(text)});`;
    });
    // 条件分岐: もしAならBする
js = js.replace(/もし(.+?)なら(.+)/g, (_, cond, action) => {
  return `
if (${compileCondition(cond)}) {
  ${compile(action)};
}
`;
});

    return js;
  }

  function run(script) {
    const nl = script.textContent.trim();
    const js = compile(nl);

    console.log("[NL]", nl);
    console.log("[JS]", js);

    const fn = new Function("context", js);
    fn(context);
  }

  function init() {
    document
      .querySelectorAll(`script[type="${TYPE}"]`)
      .forEach(run);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
