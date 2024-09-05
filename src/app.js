import "./styles.css";
import rickdom from "./rickdom.jpg";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML += `<img src="${rickdom}">`;
});

function plus(a, b) {
  console.log("ㅎㅇㅎㅇ");
  return a + b;
}
console.log(plus(333, 444));

let env;
console.log("🚀 ~ process.env.NODE_ENV:", process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  env = dev;
} else {
  env = pro;
}
console.log("🚀 ~ env:", env);
console.log("🚀 ~ pw:", pw);
