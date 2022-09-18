import { animationButton } from "./animations";
import { getBtnByText } from "./utils";
import * as calculator from "./calculator";

const deleteBtn = document.querySelector(".calculator__btnDelete"),
  resultBtn = document.querySelector(".calculator__btnResult"),
  resetBtn = document.querySelector(".calculator__btnReset"),
  addDotBtn = document.querySelector(".calculator__btnAddDot"),
  numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  operators = ["+", "=", ".", "-", "*", "/", "Enter", "Backspace", "c", "r"];

export default function bindKey(e) {
  const isKeyOperator = operators.some((x) => x === e.key);
  const isKeyNumber = numbers.some((x) => x === e.key);

  if (isKeyOperator) {
    switch (e.key) {
      case "*":
        calculator.showOperatorIcon("x");
        animationButton(getBtnByText("x"));
        break;
      case "Enter":
        calculator.showResult();
        animationButton(resultBtn);
        break;
      case "=":
        calculator.showResult();
        animationButton(resultBtn);
        break;
      case "Backspace":
        calculator.deleteNumber();
        animationButton(deleteBtn);
        break;
      case ".":
        calculator.addDot();
        animationButton(addDotBtn);
        break;
      case "c":
        calculator.calculatorReset();
        animationButton(resetBtn);
        break;
      case "r":
        calculator.calculatorReset();
        animationButton(resetBtn);
        break;
      default:
        calculator.showOperatorIcon(e.key);
        animationButton(getBtnByText(e.key));
        break;
    }
  } else if (isKeyNumber) {
    calculator.displayNumber(e.key);
    animationButton(getBtnByText(e.key));
  }
}
