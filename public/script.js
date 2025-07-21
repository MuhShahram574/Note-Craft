// ------------------------- //
// SELECTING ELEMENTS
// ------------------------- //

// Sections
const addNotesSec = document.getElementById("add-notes-section");
const notesContainer = document.getElementById("notes-container");
// console.log((notesContainer.innerHTML = ""));

//  Elements
const newNoteBtn = document.getElementById("new-note");
const alertBox = document.querySelector(".alert");
const alertMsg = document.querySelector(".alert-msg");

// Input Fields
const newNoteTitle = document.getElementById("title");
const newNoteDiscription = document.getElementById("description");

// Buttons
const radioBtns = [...document.querySelectorAll(".radio-btn")]; // NodeList
const addNotesCancelBtn = document.getElementById("add-notes-cancel-btn");
const addNotesSaveBtn = document.getElementById("add-notes-save-btn");
// Date Entered by User
const tasks = [];

// ------------------- //
// ADD A NEW NOTE...
// ------------------- //

const checkedRadioBtn = function (btns) {
  const bgColor = btns.find((btn) =>
    [...btn.classList].some(
      (cla) =>
        cla === "bg-green-600" ||
        cla === "bg-yellow-600" ||
        cla === "bg-purple-600"
    )
  );
  return bgColor;
};

const clearFields = function (field_1, field_2) {
  field_1.value = field_2.value = "";
};

const removeClass = (btn) => {
  return btn.classList.remove("bg-yellow-600", "bg-green-600", "bg-purple-600");
};

const showMsg = function (color, msg) {
  alertBox.classList.add(`border-${color}-600`);
  alertBox.classList.remove("hidden");
  alertMsg.textContent = msg;
  setTimeout(() => {
    alertBox.classList.remove(`border-${color}-600`);
    alertBox.classList.add("hidden");
  }, 5000);
};

// Handlers

function newNoteCancel() {
  addNotesSec.classList.add("hidden");
  addNotesSec.classList.remove("flex");
  radioBtns.forEach((btn) => removeClass(btn));
  clearFields(newNoteTitle, newNoteDiscription);
}

// functionality of Radio btns
function radioBtn() {
  radioBtns.forEach((btn) => {
    removeClass(btn);
    btn.addEventListener("click", () => {
      const btnColor = btn.nextElementSibling.textContent.toLocaleLowerCase();
      radioBtns.forEach((btn) => removeClass(btn));
      if (["purple", "green", "yellow"].includes(btnColor)) {
        btn.classList.add(`bg-${btnColor}-600`);
      }

      return btnColor;
    });
  });
}
// Show or Hide Form
const noteFormAppear = function () {
  newNoteBtn.addEventListener("click", () => {
    addNotesSec.classList.remove("hidden");
    addNotesSec.classList.add("flex");
  });
  addNotesCancelBtn.addEventListener("click", () => {
    newNoteCancel();
  });
};

const addData = function (tasks) {
  addNotesSaveBtn.addEventListener("click", () => {
    const title = newNoteTitle.value;
    const description = newNoteDiscription.value;

    if (title === "") {
      showMsg("red", "Enter note title...");
    } else if (description === "") {
      showMsg("red", "Enter note description...");
    } else if (checkedRadioBtn(radioBtns) === undefined) {
      showMsg("red", "Pick a color");
    } else {
      const bgColor =
        checkedRadioBtn(radioBtns).nextElementSibling.textContent.toLowerCase();
      tasks.push({
        title: title,
        description: description,
        bgColor: bgColor,
      });
      newNoteCancel();
      showMsg("green", "Note Created");
    }
  });
};

// Calling Functions
addData(tasks);
noteFormAppear();
radioBtn();
