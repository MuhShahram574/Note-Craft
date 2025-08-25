const toggleBtn = document.querySelector(".toggle-btn");
const header = document.querySelector("header");
let searchBar = document.querySelector(".search-bar");
const lightIcon = document.querySelector(".light");
const darkIcon = document.querySelector(".dark");

// Dark Theme
function darkTheme() {
  toggleClasses(
    document.body,
    ["bg-dark", "text-gray-100"],
    ["bg-gray-100/50"]
  );

  toggleClasses(addNotesSec, ["bg-dark"], ["bg-white"]);

  toggleClasses(searchBar, ["text-gray-300"], ["text-gray-600"]);

  // toggleClasses(header, ["bg-dark"], ["bg-white"]); // optional
}

// Light Theme
function lightTheme() {
  toggleClasses(
    document.body,
    ["bg-gray-100/50"],
    ["bg-dark", "text-gray-100"]
  );

  toggleClasses(addNotesSec, ["bg-gray-100"], ["bg-dark"]);

  toggleClasses(searchBar, ["text-gray-600"], ["text-gray-300"]);

  // toggleClasses(header, ["bg-white"], ["bg-dark"]); // optional
}

let curTheme = "light";
toggleBtn.addEventListener("click", (e) => {
if (e.target === e.currentTarget) return;
if (e.target.closest("svg")) {
if (curTheme === "light") {
  darkIcon.classList.add("hidden");
  lightIcon.classList.remove("hidden");
  darkTheme();
  curTheme = "dark";
} else {
  darkIcon.classList.remove("hidden");
  lightIcon.classList.add("hidden");
  lightTheme();
  curTheme = "light";
}
}
});
