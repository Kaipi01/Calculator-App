export function changeTheme(btn) {
  let theme = btn.classList[1].slice(13);

  localStorage.removeItem("themeColor");

  setTheme(theme);
}

export function setTheme(theme = "theme1") {
  const themeSwitch = document.querySelector(".themeSwitch");

  localStorage.setItem("themeColor", theme);
  themeSwitch.className = `themeSwitch themeSwitch--${theme}`;
  document.body.className = `body--${theme}`;
}
