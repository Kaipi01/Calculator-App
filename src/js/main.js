const numberBtns = document.querySelectorAll(".calculator__btnNumber"),
  opratorBtns = document.querySelectorAll(".calculator__btnOperator"),
  screenNumber = document.querySelector(".calculator__screenNumber"),
  screenOperator = document.querySelector(".calculator__screenOperator"),
  deleteBtn = document.querySelector(".calculator__btnDelete"),
  resultBtn = document.querySelector(".calculator__btnResult"),
  resetBtn = document.querySelector(".calculator__btnReset"),
  addDotBtn = document.querySelector(".calculator__btnAddDot"),
  themeSwitch = document.querySelector(".themeSwitch"),
  themeBtns = document.querySelectorAll(".themeSwitch__theme");

let operator,
  firstNumber,
  secondNumber,
  isFirstNumber = false,
  theme = localStorage.getItem("themeColor");

if (!theme) {
  theme = "theme1";
  localStorage.setItem("themeColor", theme);
}
themeSwitch.className = `themeSwitch themeSwitch--${theme}`
document.body.className = `body--${theme}`;

resetBtn.addEventListener("click", calculatorReset);

resultBtn.addEventListener("click", showResult);

deleteBtn.addEventListener("click", deleteNumber);

addDotBtn.addEventListener("click", addDot);

themeBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    changeTheme(btn);
  })
);

numberBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    displayNumber(btn.textContent);
  })
);

opratorBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    operator = btn.textContent;
    screenOperator.textContent = operator;
    animationScreen();

    //firstNumber = Number(screenNumber.textContent);

    if (!firstNumber) {
      firstNumber = Number(screenNumber.textContent);
      isFirstNumber = true;
    }
  })
);

function showResult() {
  secondNumber = Number(screenNumber.textContent);
  console.log("firstnumber: " + firstNumber);
  console.log("secondnumber: " + secondNumber);
  console.log("operator: " + operator);
  if (
    typeof firstNumber === "number" &&
    typeof secondNumber === "number" &&
    operator
  ) {
    const result = getResult(firstNumber, secondNumber, operator);
    screenNumber.textContent = result;
    screenOperator.textContent = "=";

    console.log("result: " + result);

    animationScreen();
    resizeFont();
  }
}

function getResult(a, b, operator) {
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

  const isError = catchErrors(b, operator, result).isError;
  const errorMessage = catchErrors(b, operator, result).errorMessage;
  console.log(result);
  console.log(isError);
  console.log(errorMessage);

  if (isError) {
    result = errorMessage;
  }

  return result;
}

function catchErrors(b, operator, result) {
  let errorMessage = null;
  let isError = false;

  if (b === 0 && operator === "/") {
    errorMessage = "Division by zero!";
    isError = true;
  } else if (result === Infinity) {
    errorMessage = "Overflow!";
    isError = true;
  }

  return {
    isError: isError,
    errorMessage: errorMessage,
  };
}

function displayNumber(number) {
  if (
    (screenNumber.textContent === "0" && number !== "0") ||
    screenNumber.textContent === "Division by zero!" ||
    screenNumber.textContent === "Overflow!" ||
    isFirstNumber
  ) {
    screenNumber.textContent = number;
    isFirstNumber = false;
  } else {
    screenNumber.textContent += number;
    resizeFont();
  }
}

function resizeFont() {
  const numberLength = Array.from(screenNumber.textContent).length;

  if (numberLength < 10) {
    setScreenFontSize("big");
  } else if (numberLength >= 10 && numberLength < 20) {
    setScreenFontSize("small");
  } else if (numberLength >= 20) {
    setScreenFontSize("smaller");
  }
}

function addDot() {
  const arrayFromNumbers = Array.from(screenNumber.textContent);

  if (!arrayFromNumbers.includes(".")) {
    screenNumber.textContent += ".";
  }
}

function deleteNumber() {
  const arrayFromNumbers = Array.from(screenNumber.textContent);
  arrayFromNumbers.pop();

  if (arrayFromNumbers.length === 0) {
    screenNumber.textContent = "0";
  } else {
    screenNumber.textContent = arrayFromNumbers.join("");
  }
  resizeFont();
}

function calculatorReset() {
  operator = undefined;
  firstNumber = undefined;
  secondNumber = undefined;
  isFirstNumber = false;

  screenOperator.textContent = "";
  screenNumber.textContent = "0";

  setScreenFontSize("big");
}

function animationScreen() {
  screenNumber.style.opacity = "0";

  setTimeout(() => {
    screenNumber.style.opacity = "1";
  }, 75);
}

function setScreenFontSize(size) {
  screenNumber.classList.remove("calculator__screenNumber--big");
  screenNumber.classList.remove("calculator__screenNumber--small");
  screenNumber.classList.remove("calculator__screenNumber--smaller");
  screenNumber.classList.add(`calculator__screenNumber--${size}`);
}

function changeTheme(btn) {
  theme = btn.classList[1].slice(13);
  
  localStorage.removeItem("themeColor");
  localStorage.setItem("themeColor", theme);

  themeSwitch.className = `themeSwitch themeSwitch--${theme}`
  document.body.className = `body--${theme}`;
}