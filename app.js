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
