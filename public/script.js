const radioBtns = document.querySelectorAll(".radio-btn");
const addNotesSec = document.getElementById("add-notes-section");
const notesFormBtns = document.querySelectorAll(".add-notes-btn");
const newNoteBtn = document.getElementById("new-note");
const newNoteTitle = document.getElementById("title");
const newNoteDiscription = document.getElementById("discription");

const clearFields = function (field_1, field_2) {
  field_1.value = field_2.value = "";
};
//
const removeClass = (btn) =>
  btn.classList.remove("bg-yellow-600", "bg-green-600", "bg-purple-600");

function radioBtn() {
  radioBtns.forEach((btn) => {
    removeClass(btn);
    btn.addEventListener("click", () => {
      const btnColor = btn.nextElementSibling.textContent.toLowerCase();
      radioBtns.forEach((btn) => removeClass(btn));
      if (["purple", "green", "yellow"].includes(btnColor)) {
        btn.classList.add(`bg-${btnColor}-600`);
      }
    });
  });
}
radioBtn();

function addNoteDisappear() {
  notesFormBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      addNotesSec.classList.add("opacity-0");
      addNotesSec.classList.add("hidden");
      addNotesSec.classList.remove("flex");
      radioBtns.forEach((btn) => removeClass(btn));
      clearFields(newNoteTitle, newNoteDiscription);
    });
  });
  newNoteBtn.addEventListener("click", () => {
    addNotesSec.classList.remove("hidden");
    addNotesSec.classList.add("flex");
    addNotesSec.classList.remove("opacity-0");
  });
}
addNoteDisappear();
