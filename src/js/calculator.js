import { animationScreen } from "./animations";
import { getArrayOfScreenNumber, resizeFont, setScreenFontSize } from "./utils";

const screenNumber = document.querySelector(".calculator__screenNumber");
const screenOperator = document.querySelector(".calculator__screenOperator");

let operator,
  firstNumber,
  secondNumber,
  result,
  isFirstNumBeenSave = false;

export function showOperatorIcon(symbol) {
  if (isError()) return;
  operator = symbol;
  screenOperator.textContent = operator;
  animationScreen();

  if (result) {
    result = undefined;
  }

  firstNumber = Number(screenNumber.textContent);
  isFirstNumBeenSave = true;
}

export function showResult() {
  if (isError()) return;
  else if (!secondNumber || screenOperator.textContent !== "=") {
    secondNumber = Number(screenNumber.textContent);
  }

  const isOperator = Boolean(operator);
  const isSecondNumberNotNaN = !isNaN(secondNumber);
  const isFirstNumberNotNaN = !isNaN(firstNumber);

  if (isFirstNumberNotNaN && isSecondNumberNotNaN && isOperator) {
    result = getResult(firstNumber, secondNumber, operator);
    screenNumber.textContent = result;
    screenOperator.textContent = "=";
    firstNumber = result;

    animationScreen();
    resizeFont();
  }
}

export function displayNumber(number) {
  const arrayFromNumber = getArrayOfScreenNumber(),
    isNumLenLessThan19 = arrayFromNumber.length <= 18,
    isDot = arrayFromNumber.includes("."),
    isContent0AndNumberIs0 =
      screenNumber.textContent === "0" && number === "0" && !isDot,
    isContent0AndNumberNot0 =
      screenNumber.textContent === "0" && number !== "0" && !isDot;

  if (isContent0AndNumberIs0) {
    return;
  } else if (
    isError() ||
    isFirstNumBeenSave ||
    isContent0AndNumberNot0 ||
    result
  ) {
    screenNumber.textContent = number;
    isFirstNumBeenSave = false;
    screenOperator.textContent = "";
    result = undefined;
  } else if (isNumLenLessThan19) {
    screenNumber.textContent += number;
  }

  resizeFont();
}

export function isError() {
  return (
    screenNumber.textContent === "Division by zero!" ||
    screenNumber.textContent === "Overflow!"
  );
}

export function getResult(a, b, operator) {
  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "/":
      result = a / b;
      break;
    case "x":
      result = a * b;
      break;
  }

  const isError = getErrors(b, operator, result).isError;
  const errorMessage = getErrors(b, operator, result).errorMessage;

  if (isError) {
    result = errorMessage;
  }

  return result;
}

export function getErrors(b, operator, result) {
  const isTryDivideBy0 = b === 0 && operator === "/";
  const isResultInfinity = result === Infinity;
  let errorMessage = null;
  let isError = false;

  if (isTryDivideBy0) {
    errorMessage = "Division by zero!";
    isError = true;
  } else if (isResultInfinity) {
    errorMessage = "Overflow!";
    isError = true;
  }

  return {
    isError: isError,
    errorMessage: errorMessage,
  };
}

export function addDot() {
  if (isError()) return;

  const arrayFromNumbers = getArrayOfScreenNumber();

  if (!arrayFromNumbers.includes(".")) {
    screenNumber.textContent += ".";
  }
}

export function deleteNumber() {
  if (isError()) return;

  const arrayFromNumbers = getArrayOfScreenNumber();
  arrayFromNumbers.pop();

  if (arrayFromNumbers.length === 0) {
    screenNumber.textContent = "0";
  } else {
    screenNumber.textContent = arrayFromNumbers.join("");
  }
  resizeFont();
}

export function calculatorReset() {
  operator = undefined;
  firstNumber = undefined;
  secondNumber = undefined;
  isFirstNumBeenSave = false;
  result = undefined;

  screenOperator.textContent = "";
  screenNumber.textContent = "0";

  setScreenFontSize("big");
}
