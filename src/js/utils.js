const screenNumber = document.querySelector(".calculator__screenNumber");

export function getArrayOfScreenNumber() {
  return Array.from(screenNumber.textContent);
}

export function resizeFont() {
  const numberLength = getArrayOfScreenNumber().length;

  if (numberLength < 10) {
    setScreenFontSize("big");
  } else if (numberLength >= 10 && numberLength < 17) {
    setScreenFontSize("small");
  } else if (numberLength >= 17) {
    setScreenFontSize("smaller");
  }
}

export function getBtnByText(text) {
  let btnToFind;

  document.querySelectorAll(".calculator__btn").forEach((btn) => {
    if (btn.textContent === text) {
      btnToFind = btn;
    }
  });
  return btnToFind;
}

export function setScreenFontSize(size) {
  screenNumber.classList.remove("calculator__screenNumber--big");
  screenNumber.classList.remove("calculator__screenNumber--small");
  screenNumber.classList.remove("calculator__screenNumber--smaller");
  screenNumber.classList.add(`calculator__screenNumber--${size}`);
}
