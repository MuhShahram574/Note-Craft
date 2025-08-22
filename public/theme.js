const toggleBtn = document.querySelector(".toggle-btn");
const header = document.querySelector("header");
let searchBar = document.querySelector(".search-bar");
let aside = document.querySelector("aside div");
const lightIcon = document.querySelector(".light");
const darkIcon = document.querySelector(".dark");

const removeCl = function (el, clName) {
  el.classList.remove(`${clName}`);
};
const addCl = function (el, clName) {
  el.classList.add(clName);
};
/////////////////////////////////////////////////
function darkTheme() {
  addCl(document.body, "bg-dark");
  addCl(document.body, "bg-dark");
  addCl(document.body, "text-gray-100");
  addCl(addNotesSec, "bg-dark");
  addCl(header, "bg-dark");
  addCl(aside, "bg-dark");
  addCl(searchBar, "text-gray-300");
  removeCl(aside, "bg-white");
  removeCl(header, "bg-white");
  removeCl(searchBar, "text-gray-600");
  removeCl(document.body, "bg-gray-100/50");
  removeCl(addNotesSec, "bg-white");
}
function lightTheme() {
  removeCl(document.body, "bg-dark");
  removeCl(document.body, "bg-dark");
  removeCl(document.body, "text-gray-100");
  removeCl(addNotesSec, "bg-dark");
  removeCl(header, "bg-dark");
  removeCl(aside, "bg-dark");
  removeCl(searchBar, "text-gray-300");
  addCl(aside, "bg-white");
  addCl(header, "bg-white");
  addCl(searchBar, "text-gray-600");
  addCl(document.body, "bg-gray-100/50");
  addCl(addNotesSec, "bg-white");
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
if (curTheme === "light") {
  addCl(darkIcon, "hidden");
  removeCl(lightIcon, "hidden");
  darkTheme();
  curTheme = "dark";
} else {
  removeCl(darkIcon, "hidden");
  add(lightIcon, "hidden");
  lightTheme();
  curTheme = "light";
}
