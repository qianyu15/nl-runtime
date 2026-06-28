(() => {
  const TYPE = "text/nl";

  function compile(nl) {
    let js = nl;

    // 背景操作
    js = js.replace(/背景を(黒|白|赤|青|緑)にする/g, (_, c) => {
      const map = {
        黒: "black",
        白: "white",
        赤: "red",
        青: "blue",
        緑: "green",
      };
      return `document.body.style.background='${map[c]}';`;
    });

    // クリック系
    js = js.replace(/クリックしたら(.+)/g, (_, action) => {
      return `
document.addEventListener("click", () => {
  ${compile(action)};
});
`;
    });

    // 秒間ループ
    js = js.replace(/(\d+)秒ごとに(.+)/g, (_, s, action) => {
      return `
setInterval(() => {
  ${compile(action)};
}, ${s}000);
`;
    });

    return js;
  }

  function run(script) {
    const nl = script.textContent.trim();
    const js = compile(nl);

    console.log("[NL]", nl);
    console.log("[JS]", js);

    new Function(js)();
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
