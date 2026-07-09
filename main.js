(() => {
  const TYPE = "text/nl";

  const mapColor = {
    黒: "black",
    白: "white",
    赤: "red",
    青: "blue",
    緑: "green",
    黄: "yellow"
  };

  const context = {
    vars: {}
  };

  function compileCondition(cond) {
    // 例: xが10
    const match = cond.match(/(.+?)が(\d+)$/);

    if (match) {
      const name = match[1];
      const value = match[2];

      return `context.vars["${name}"] == ${value}`;
    }

    // 未対応条件はfalse
    return "false";
  }


  function compile(nl) {
    let js = nl.trim();

    // 変数: xを10にする
    js = js.replace(
      /^(\w+)を(\d+)にする$/,
      (_, name, value) => {
        return `context.vars["${name}"] = ${value};`;
      }
    );


    // 背景色
    js = js.replace(
      /背景を(黒|白|赤|青|緑|黄)にする/,
      (_, c) => {
        return `document.body.style.background="${mapColor[c]}";`;
      }
    );


    // クリックイベント
    js = js.replace(
      /(.+?)をクリックしたら(.+)/,
      (_, target, action) => {
        return `
const el = document.querySelector("${target}");
if (el) {
  el.addEventListener("click", () => {
    ${compile(action)}
  });
}
`;
      }
    );


    // 秒ごと
    js = js.replace(
      /(\d+)秒ごとに(.+)/,
      (_, sec, action) => {
        return `
setInterval(() => {
  ${compile(action)}
}, ${sec} * 1000);
`;
      }
    );


    // 表示
    js = js.replace(
      /「(.+?)」を表示/,
      (_, text) => {
        return `
const div = document.createElement("div");
div.textContent = ${JSON.stringify(text)};
document.body.appendChild(div);
`;
      }
    );


    // console出力
    js = js.replace(
      /(.+?)を出力/,
      (_, text) => {
        return `console.log(${JSON.stringify(text)});`;
      }
    );


    // 条件分岐
    js = js.replace(
      /もし(.+?)なら(.+)/,
      (_, cond, action) => {
        return `
if (${compileCondition(cond)}) {
  ${compile(action)}
}
`;
      }
    );


    return js;
  }


  function run(script) {
    const nl = script.textContent.trim();

    const js = compile(nl);

    console.log("[NL]", nl);
    console.log("[JS]", js);

    try {
      const fn = new Function(
        "context",
        js
      );

      fn(context);

    } catch (e) {
      console.error("NL Runtime Error:", e);
    }
  }


  function init() {
    document
      .querySelectorAll(`script[type="${TYPE}"]`)
      .forEach(run);
  }


  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init
    );
  } else {
    init();
  }

})();
