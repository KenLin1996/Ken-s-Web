// nav bar 滑動效果
let nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    nav.style.boxShadow = "";
    nav.style.backgroundColor = "transparent";
  } else {
    nav.style.boxShadow = "0px 3px 10px #bababa";
    // nav.style.backgroundColor = "#EFF8FF";
    nav.style.backgroundColor = "rgba(239,248,255,0.99)";
  }
});

// terminal-window 文字特效
const textEles = document.querySelectorAll(".terminal-window p");
textEles.forEach((textEle) => {
  splitText(textEle, { charClass: "char" });
  textEle.addEventListener("mouseenter", (e) => {
    hoverTextAnimation(e, {
      charDelay: 50,
      charFreq: 200,
      randomCharRepeats: 2,
    });
  });
});

function splitText(element, { charClass }) {
  const text = element.innerText;
  let splitArray;

  splitArray = text
    .split("")
    .map((char) => `<span class=${charClass}>${char}</span>`);

  element.innerHTML = splitArray.join("");
}

function hoverTextAnimation(
  e,
  // charDelay：每個字元的延遲時間。
  // charFreq：動畫頻率或間隔時間。
  // randomCharRepeats：隨機字元重複次數。
  { charDelay = 50, charFreq = 200, randomCharRepeats = 2 }
) {
  const text = e.target.closest("p");

  // 用 is-animated 類名，預防重複動畫。
  if (text.classList.contains("is-animated")) return;

  const chars = text.querySelectorAll(".char");
  text.classList.add("is-animated");

  // 遍歷 chars 字元元素，對每個字元調用 createCharAnimation 函數
  chars.forEach((char, index) => {
    createCharAnimation(char, index, {
      charDelay,
      charFreq,
      randomCharRepeats,
    });
  });

  // 計算動畫的總持續時間，並移除 is-animated 類名
  const totalDuration =
    charDelay * (randomCharRepeats + 1) + chars.length * charFreq;

  setTimeout(() => {
    text.classList.remove("is-animated");
  }, totalDuration);
}

function createCharAnimation(
  char,
  index,
  { charDelay, charFreq, randomCharRepeats }
) {
  // initText 用來保存元素的初始內容。
  // delay 是基於 index 的延遲時間，控制每個字元的動畫開始時間。
  const initText = char.innerText;
  const delay = charDelay * index;

  // 先將所有字串變透明
  char.style.setProperty("opacity", 0);
  // 第一個動畫。顯示字串並設定背景
  setTimeout(() => {
    char.style.setProperty("opacity", 1);
    char.style.setProperty("background", "var(--color)");
  }, charFreq - charDelay + delay);

  // 隨機字符串的動畫使用 for 來設置多次隨機字符替換的動畫
  for (let i = 1; i <= randomCharRepeats; i++) {
    setTimeout(() => {
      i == 1 && char.style.setProperty("background", "transparent");
      char.innerText = randomLetterAndSymbol();
    }, charFreq * i + delay);
  }

  // 最後一個動畫將字串變成原來的值
  const totalDuration = charFreq * (randomCharRepeats + 1) + delay;
  setTimeout(() => (char.innerText = initText), totalDuration);
}

function randomLetterAndSymbol() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  return chars.charAt(Math.floor(Math.random() * chars.length));
}
