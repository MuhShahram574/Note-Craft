// ------------------------- //
// SELECTING ELEMENTS
// ------------------------- //
const toggleBtn = document.querySelector(".toggle-btn");
const header = document.querySelector("header");
const light = document.querySelector(".light");
const dark = document.querySelector(".dark");

// ------------------------- //
// THEMES
// ------------------------- //
function darkTheme() {
  toggleClasses(
    document.body,
    ["bg-dark", "text-gray-100"],
    ["bg-gray-100/50"]
  );
  toggleClasses(addNotesSec, ["bg-dark"], ["bg-gray-100", "bg-white"]);
  toggleClasses(searchBar, ["text-gray-300"], ["text-gray-600"]);
}

function lightTheme() {
  toggleClasses(
    document.body,
    ["bg-gray-100/50"],
    ["bg-dark", "text-gray-100"]
  );
  toggleClasses(addNotesSec, ["bg-gray-100", "bg-white"], ["bg-dark"]);
  toggleClasses(searchBar, ["text-gray-600"], ["text-gray-300"]);
}

// ------------------------- //
// LOCAL STORAGE
// ------------------------- //
let curTheme = localStorage.getItem("curTheme");

// If no theme is saved, default to light
if (!curTheme) {
  curTheme = "light";
  localStorage.setItem("curTheme", "light");
}

// Apply theme on page load
function applyTheme(theme) {
  if (theme === "dark") {
    darkTheme();
    light.classList.remove("hidden");
    dark.classList.add("hidden");
  } else {
    lightTheme();
    dark.classList.remove("hidden");
    light.classList.add("hidden");
  }
}

applyTheme(curTheme);

// ------------------------- //
// SET THEME FUNCTION
// ------------------------- //
function setTheme(theme) {
  localStorage.setItem("curTheme", theme);
  curTheme = theme;
  applyTheme(theme);
}

// ------------------------- //
// EVENT LISTENER
// ------------------------- //
toggleBtn.addEventListener("click", () => {
  if (curTheme === "light") {
    setTheme("dark");
  } else {
    setTheme("light");
  }
});
