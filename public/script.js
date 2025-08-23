// ------------------------- //
// SELECTING ELEMENTS
// ------------------------- //

// Sections
const addNotesSec = document.getElementById("add-notes-section");
const notesContainer = document.getElementById("notes-container");

// Elements
const newNoteBtn = document.getElementById("new-note");
const alertBox = document.querySelector(".alert");
const alertMsg = document.querySelector(".alert-msg");
const noteTitle = document.querySelector("#note-title");
aside = document.querySelector("aside");

// Input Fields
const newNoteTitle = document.getElementById("title");
const newNoteDiscription = document.getElementById("description");
searchBar = document.querySelector(".search-bar");

// Buttons
const radioBtns = [...document.querySelectorAll(".radio-btn")]; // NodeList
const radioBtnsBox = document.querySelector(".radio-btn-box");
const addNotesCancelBtn = document.getElementById("add-notes-cancel-btn");
const addNotesSaveBtn = document.getElementById("add-notes-save-btn");

// curContainer
// let curContainer = "notesContainer";

// ///////////////////////////////////////////

// ------------------- //
// HELPER FUNCTIONS
// ------------------- //

const checkedRadioBtn = function (btns) {
  return btns.find((btn) =>
    [...btn.classList].some((cla) =>
      ["bg-green-600", "bg-red-600", "bg-blue-600"].includes(cla)
    )
  );
};

const clearFields = function (...fields) {
  fields.forEach((field) => (field.value = ""));
};

const removeClass = (btn) => {
  btn.classList.remove("bg-blue-600", "bg-green-600", "bg-red-600");
};

const setStorage = (name, value) => {
  localStorage.setItem(name, value);
};

const getStorage = (name) => {
  return localStorage.getItem(name);
};

const showMsg = function (msg) {
  alertBox.classList.remove("hidden");
  alertMsg.textContent = msg;
  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 1000);
};

// DATE & TIME
const currentDate = function (need, ISO = Date.now()) {
  const isoDate = new Date(ISO);
  if (need === "date") {
    return isoDate.toLocaleDateString("default", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } else if (need === "time") {
    return isoDate.toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h24",
    });
  } else {
    return isoDate.toLocaleString("default", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h24",
    });
  }
};

// ------------------- //
// NOTE FORM HANDLING
// ------------------- //

function newNoteCancel() {
  addNotesSec.classList.add("hidden");
  addNotesSec.classList.remove("flex");
  radioBtns.forEach((btn) => removeClass(btn));
  clearFields(newNoteTitle, newNoteDiscription);
}

const noteFormAppear = function () {
  newNoteBtn.addEventListener("click", () => {
    addNotesSec.classList.remove("hidden");
    addNotesSec.classList.add("flex");
  });
  addNotesCancelBtn.addEventListener("click", () => {
    newNoteCancel();
  });
};

function radioBtn() {
  radioBtnsBox.addEventListener("click", (e) => {
    if (!e.target.classList.contains("radio-btn")) return;
    const btnColor = e.target.nextElementSibling.textContent.toLowerCase();
    radioBtns.forEach((btn) => removeClass(btn));
    e.target.classList.add(`bg-${btnColor}-600`);
  });
}

// ------------------- //
// TASK HANDLING
// ------------------- //

let tasks = JSON.parse(getStorage("tasks") || "[]");
let deletedTasks = JSON.parse(getStorage("deletedTasks") || "[]");

const saveTasks = () => {
  setStorage("tasks", JSON.stringify(tasks));
  setStorage("deletedTasks", JSON.stringify(deletedTasks));
};

function createNewNote(arr, isDeleted = false) {
  notesContainer.innerHTML = "";
  arr.forEach((item, i) => {
    const bgColor = `bg-${item.bgColor}-500`;
    const delay = (i * 0.2).toFixed(1);
    const html = `
      <div
        id="${item.id}"
        class="task-box shadow-custom-Black w-full break-inside-avoid rounded-lg p-2.5 md:p-5 flex flex-col justify-start gap-3 ${bgColor} relative group animate-fadeIn"
        style="animation-delay: ${delay}s;"
      >
      <div class="${
        isDeleted ? "restore" : "delete-btn"
      } flex justify-center items-center bg-red-600 hover:bg-red-700 w-fit py-1 px-1.5 rounded-lg transition-all duration-200 shadow-custom-Black -translate-y-1 active:translate-y-0 active:shadow-none cursor-pointer absolute right-0 top-0 opacity-0 group-hover:opacity-100 ${
      isDeleted ? "restore" : ""
    }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="16" viewBox="0 0 384 512">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
      </div>
      <div class="${
        isDeleted ? "delete-btn" : "restore"
      } flex justify-center items-center bg-green-600 hover:bg-green-700 w-fit py-1 px-1.5 rounded-lg transition-all duration-200 shadow-custom-Black -translate-y-1 active:translate-y-0 active:shadow-none cursor-pointer absolute right-7 top-0 opacity-0 group-hover:opacity-100 ${
      isDeleted ? "" : "hidden"
    }">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="16" viewBox="0 0 640 640">
        <path d="M263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9C237.1 56.8 249.3 48 263.1 48zM128 208L512 208L490.9 531.1C489.3 556.4 468.3 576 443 576L197 576C171.7 576 150.7 556.4 149.1 531.1L128 208zM337 287C327.6 277.6 312.4 277.6 303.1 287L231.1 359C221.7 368.4 221.7 383.6 231.1 392.9C240.5 402.2 255.7 402.3 265 392.9L296 361.9L296 464C296 477.3 306.7 488 320 488C333.3 488 344 477.3 344 464L344 361.9L375 392.9C384.4 402.3 399.6 402.3 408.9 392.9C418.2 383.5 418.3 368.3 408.9 359L336.9 287z"/></svg>
      </div>
        <div class="flex flex-col justify-between gap-1">
          <p class="text-sm text-gray-700">${item.time}</p>
          <h3 class="text-2xl text-gray-900 font-medium">${item.title}</h3>
        </div>
        <p class="text-lg text-gray-800 line-clamp-6 leading-snug">${
          item.description
        }</p>
      </div>
    `;
    notesContainer.insertAdjacentHTML("beforeend", html);
  });
}

const uiUpdate = (arr) => {
  saveTasks();
  createNewNote(arr);
};

// ------------------- //
// LOCAL STORAGE HANDLING
// ------------------- //

const setLocalStorage = function () {
  addNotesSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = newNoteTitle.value.trim();
    const description = newNoteDiscription.value.trim();

    if (!title) return showMsg("Enter note title...");
    if (!description) return showMsg("Enter note description...");
    if (!checkedRadioBtn(radioBtns)) return showMsg("Pick a color");

    const bgColor =
      checkedRadioBtn(radioBtns).nextElementSibling.textContent.toLowerCase();

    const newTask = {
      id: Date.now(), // unique id
      title,
      description,
      bgColor,
      time: currentDate("date"),
    };

    tasks.push(newTask);
    uiUpdate(tasks);
    newNoteCancel();
    showMsg("Note Created");
  });
};

// ------------------- //
// DELETE HANDLING
// ------------------- //

const restoreNotes = function (cutarr, setarr) {
  notesContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-btn");
    if (!btn) return;

    const taskBox = btn.closest(".task-box");
    const taskId = +taskBox.id;

    const taskIndex = cutarr.findIndex((t) => t.id === taskId);
    if (taskIndex === -1) return;

    // Move to deleted tasks
    const deletedTask = cutarr.splice(taskIndex, 1)[0];
    setarr.push(deletedTask);

    uiUpdate(cutarr);
    showMsg("Note Deleted");
  });
};

// ------------------- //
// SEARCH HANDLING
// ------------------- //

const searchTask = function () {
  searchBar.addEventListener("input", (e) => {
    const target = e.target.value.toLowerCase();
    const taskBoxes = document.querySelectorAll(".task-box");

    taskBoxes.forEach((box) => {
      const title = box.querySelector("h3").textContent.toLowerCase();
      title.includes(target)
        ? box.classList.remove("hidden")
        : box.classList.add("hidden");
    });
  });
};
document.addEventListener("DOMContentLoaded", searchTask);

// ------------------- //
// ASIDE HANDLING
// ------------------- //

const asideHandler = function () {
  aside.addEventListener("click", (e) => {
    const target = e.target.closest("div");
    if (!target) return;

    if (target.classList.contains("notes")) {
      createNewNote(tasks);
      showMsg("Current Notes");
      noteTitle.textContent = "Current Notes";
      restoreNotes(tasks, deletedTasks);
    } else if (target.classList.contains("trash")) {
      createNewNote(deletedTasks, true);
      // curContainer = "trash";
      showMsg("Deleted Notes");
      noteTitle.textContent = "Trash";
      restoreNotes(deletedTasks, tasks);
    } else if (target.classList.contains("Reminder")) {
      showMsg("Reminder Notes");
      notesContainer.innerHTML = "";
      noteTitle.textContent = "Coming Soon...";
    } else if (target.classList.contains("Achieve")) {
      notesContainer.innerHTML = "";
      showMsg("Achieve Notes");
      noteTitle.textContent = "Coming Soon...";
    }
  });
};

// ------------------- //
// INIT
// ------------------- //

function init() {
  noteFormAppear();
  radioBtn();
  uiUpdate(tasks);
  setLocalStorage();
  restoreNotes(tasks, deletedTasks);
  asideHandler();
}
init();
