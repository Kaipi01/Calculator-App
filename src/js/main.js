import { setTheme, changeTheme } from "./theme";
import bindKey from "./bindKey";
import * as calculator from "./calculator";

const numberBtns = document.querySelectorAll(".calculator__btnNumber"),
  opratorBtns = document.querySelectorAll(".calculator__btnOperator"),
  deleteBtn = document.querySelector(".calculator__btnDelete"),
  resultBtn = document.querySelector(".calculator__btnResult"),
  resetBtn = document.querySelector(".calculator__btnReset"),
  addDotBtn = document.querySelector(".calculator__btnAddDot"),
  themeBtns = document.querySelectorAll(".themeSwitch__theme");

let theme = localStorage.getItem("themeColor");

setTheme(theme);

resetBtn.addEventListener("click", calculator.calculatorReset);
resultBtn.addEventListener("click", calculator.showResult);
deleteBtn.addEventListener("click", calculator.deleteNumber);
addDotBtn.addEventListener("click", calculator.addDot);

themeBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    changeTheme(btn);
  })
);

numberBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    calculator.displayNumber(btn.textContent);
  })
);

opratorBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    calculator.showOperatorIcon(btn.textContent);
  })
);

window.addEventListener("keydown", (e) => {
  bindKey(e);
});
