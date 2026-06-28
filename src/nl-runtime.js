export function compile(nl) {
  let js = nl;

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

  js = js.replace(/クリックしたら(.+)/g, (_, action) => {
    return `
document.addEventListener("click", () => {
  ${compile(action)};
});
`;
  });

  return js;
}
