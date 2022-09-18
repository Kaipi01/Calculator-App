export function animationScreen() {
  const screenNumber = document.querySelector(".calculator__screenNumber");
  screenNumber.style.opacity = "0";

  setTimeout(() => {
    screenNumber.style.opacity = "1";
  }, 75);
}

export function animationButton(btn) {
  btn.classList.add("calculator__btn--active");
  setTimeout(() => {
    btn.classList.remove("calculator__btn--active");
  }, 100);
}
