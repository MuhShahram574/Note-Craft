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
const aside = document.querySelector("aside");

// Input Fields
const newNoteTitle = document.getElementById("title");
const newNoteDiscription = document.getElementById("description");
searchBar = document.querySelector(".search-bar");

// Buttons
const radioBtns = [...document.querySelectorAll(".radio-btn")]; // NodeList -> Array
const radioBtnsBox = document.querySelector(".radio-btn-box");
const addNotesCancelBtn = document.getElementById("add-notes-cancel-btn");
const addNotesSaveBtn = document.getElementById("add-notes-save-btn");
const notesContainerBtn = document.querySelector(".notes");
const trashContainerBtn = document.querySelector(".trash");
const achieveContainerBtn = document.querySelector(".achieve");
const reminderContainerBtn = document.querySelector(".reminder");

// ------------------- //
// CONSTANTS
// ------------------- //
const COLOR_CLASSES_600 = ["bg-blue-600", "bg-green-600", "bg-red-600"];
const COLOR_KEYS = ["blue", "green", "red"]; // supported colors

// ------------------- //
// HELPER FUNCTIONS
// ------------------- //
const toggleClasses = (el, add = [], remove = []) => {
  if (!el) return;
  if (add.length) el.classList.add(...add);
  if (remove.length) el.classList.remove(...remove);
};

const checkedRadioBtn = function (btns) {
  return btns.find((btn) =>
    [...btn.classList].some((cla) => COLOR_CLASSES_600.includes(cla))
  );
};

const clearFields = function (...fields) {
  fields.forEach((field) => field && (field.value = ""));
};

const removeClass = (el, cl) => {
  if (!el || !cl) return;
  Array.isArray(cl) ? el.classList.remove(...cl) : el.classList.remove(cl);
};

const setStorage = (name, value) => {
  try {
    localStorage.setItem(name, value);
  } catch (e) {
    // ignore storage errors (e.g., private mode)
  }
};

const getStorage = (name) => {
  try {
    return localStorage.getItem(name);
  } catch (e) {
    return null;
  }
};

const showMsg = function (msg, timeout = 1200) {
  if (!alertBox || !alertMsg) return;
  alertBox.classList.remove("hidden");
  alertMsg.textContent = msg;
  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, timeout);
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
// STATE
// ------------------- //
let tasks = JSON.parse(getStorage("tasks") || "[]");
let deletedTasks = JSON.parse(getStorage("deletedTasks") || "[]");

// 'notes' | 'trash' | 'achieve' | 'reminder'
let curContainer = "notes";

// ------------------- //
// UI RENDER
// ------------------- //
const saveTasks = () => {
  setStorage("tasks", JSON.stringify(tasks));
  setStorage("deletedTasks", JSON.stringify(deletedTasks));
};

const createNewNote = function (arr, showRestoreBtn = false) {
  if (!notesContainer) return;
  notesContainer.innerHTML = "";

  arr.forEach((item) => {
    const bgColor = `bg-${item.bgColor}-500`;

    const html = `
      <div
        id="${item.id}"
        class="task-box shadow-custom-Black w-full break-inside-avoid rounded-lg p-2.5 md:p-5 flex flex-col justify-start gap-3 ${bgColor} relative group"
      >
        <div class="delete-btn flex justify-center items-center bg-red-600 hover:bg-red-700 w-fit py-1 px-1.5 rounded-lg transition-all duration-200 shadow-custom-Black -translate-y-1 active:translate-y-0 active:shadow-none cursor-pointer absolute right-0 top-0 opacity-0 group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="16" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
          </svg>
        </div>
        <div class="restore-btn ${
          showRestoreBtn ? "" : "hidden"
        } justify-center items-center bg-green-600 hover:bg-green-700 w-fit py-1 px-1.5 rounded-lg transition-all duration-200 shadow-custom-Black -translate-y-1 active:translate-y-0 active:shadow-none cursor-pointer absolute right-7 top-0 opacity-0 group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="16" viewBox="0 0 640 640">
            <path d="M263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9C237.1 56.8 249.3 48 263.1 48zM128 208L512 208L490.9 531.1C489.3 556.4 468.3 576 443 576L197 576C171.7 576 150.7 556.4 149.1 531.1L128 208zM337 287C327.6 277.6 312.4 277.6 303.1 287L231.1 359C221.7 368.4 221.7 383.6 231.1 392.9C240.5 402.2 255.7 402.3 265 392.9L296 361.9L296 464C296 477.3 306.7 488 320 488C333.3 488 344 477.3 344 464L344 361.9L375 392.9C384.4 402.3 399.6 402.3 408.9 392.9C418.2 383.5 418.3 368.3 408.9 359L336.9 287z"/>
          </svg>
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
};

const uiUpdate = (arr, showRestore = false) => {
  saveTasks();
  createNewNote(arr, showRestore);
};

// ------------------- //
// NOTE FORM HANDLING
// ------------------- //
const noteFormAppear = function () {
  if (!newNoteBtn || !addNotesCancelBtn) return;

  newNoteBtn.addEventListener("click", () => {
    toggleClasses(addNotesSec, ["flex"], ["hidden"]);
  });

  addNotesCancelBtn.addEventListener("click", newNoteCancel);
};

const newNoteCancel = function () {
  toggleClasses(addNotesSec, ["hidden"], ["flex"]);
  radioBtns.forEach((btn) => removeClass(btn, COLOR_CLASSES_600));
  clearFields(newNoteTitle, newNoteDiscription);
};

// ------------------- //
// RADIO BUTTONS (COLOR)
// ------------------- //
function radioBtn() {
  if (!radioBtnsBox) return;

  radioBtnsBox.addEventListener("click", (e) => {
    const target = e.target.closest(".radio-btn");
    if (!target) return;

    // prefer data-color, fallback to sibling label text
    const dataColor = target.dataset?.color?.toLowerCase();
    const textColor = target.nextElementSibling?.textContent
      ?.trim()
      ?.toLowerCase();
    const btnColor = COLOR_KEYS.includes(dataColor)
      ? dataColor
      : COLOR_KEYS.includes(textColor)
      ? textColor
      : null;

    // Clear previous selected color classes
    radioBtns.forEach((btn) => removeClass(btn, COLOR_CLASSES_600));

    if (btnColor) {
      target.classList.add(`bg-${btnColor}-600`);
    } else {
      showMsg("Invalid color option");
    }
  });
}

// ------------------- //
// LOCAL STORAGE HANDLING (ADD NEW)
// ------------------- //
const setLocalStorage = function () {
  if (!addNotesSaveBtn) return;

  addNotesSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = newNoteTitle.value.trim();
    const description = newNoteDiscription.value.trim();

    if (!title) return showMsg("Enter note title...");
    if (!description) return showMsg("Enter note description...");

    const selected = checkedRadioBtn(radioBtns);
    if (!selected) return showMsg("Pick a color");

    const fallbackText =
      selected.nextElementSibling?.textContent?.trim()?.toLowerCase() || "";
    const selectedData = selected.dataset?.color?.toLowerCase();
    const bgColor = COLOR_KEYS.includes(selectedData)
      ? selectedData
      : COLOR_KEYS.includes(fallbackText)
      ? fallbackText
      : "blue"; // default safe color

    const newTask = {
      id: Date.now(),
      title,
      description,
      bgColor,
      time: currentDate("date"),
    };

    tasks.push(newTask);
    if (curContainer === "notes") uiUpdate(tasks);
    newNoteCancel();
    showMsg("Note Created");
  });
};

// ------------------- //
// CENTRALIZED CLICK HANDLING (DELETE / RESTORE / PERMA-DELETE)
// ------------------- //
function wireNoteActions() {
  if (!notesContainer) return;

  notesContainer.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-btn");
    const restoreBtn = e.target.closest(".restore-btn");
    const taskBox = e.target.closest(".task-box");
    if (!taskBox) return;

    const taskId = +taskBox.id;

    // NOTES VIEW: delete => move to trash
    if (curContainer === "notes" && deleteBtn) {
      const idx = tasks.findIndex((t) => t.id === taskId);
      if (idx !== -1) {
        const removed = tasks.splice(idx, 1)[0];
        deletedTasks.push(removed);
        uiUpdate(tasks, false);
        showMsg("Note Deleted...");
      }
      return;
    }

    // TRASH VIEW: restore => move back to notes
    if (curContainer === "trash" && restoreBtn) {
      const idx = deletedTasks.findIndex((t) => t.id === taskId);
      if (idx !== -1) {
        const restored = deletedTasks.splice(idx, 1)[0];
        tasks.push(restored);
        uiUpdate(deletedTasks, true);
        showMsg("Note Restored...");
      }
      return;
    }

    // TRASH VIEW: delete-btn => permanent delete
    if (curContainer === "trash" && deleteBtn) {
      const idx = deletedTasks.findIndex((t) => t.id === taskId);
      if (idx !== -1) {
        deletedTasks.splice(idx, 1);
        uiUpdate(deletedTasks, true);
        showMsg("Note Permanently Deleted...");
      }
      return;
    }
  });
}

// ------------------- //
// SEARCH HANDLING
// ------------------- //
const searchTask = function () {
  if (!searchBar) return;

  searchBar.addEventListener("input", (e) => {
    const target = e.target.value.toLowerCase();
    const taskBoxes = document.querySelectorAll(".task-box");

    taskBoxes.forEach((box) => {
      const title = box.querySelector("h3")?.textContent?.toLowerCase() || "";
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
const fixClass = function (e) {
  const asideRoot = e.currentTarget.closest("aside");
  if (!asideRoot) return;
  const elements = asideRoot.querySelectorAll(".aside-child");
  elements.forEach((el) => removeClass(el, "bg-purple-600/30"));
  e.currentTarget.classList.add("bg-purple-600/30");
};

function appperNotes() {
  if (!notesContainerBtn) return;
  notesContainerBtn.addEventListener("click", (e) => {
    if (curContainer === "notes") return;
    fixClass(e);
    curContainer = "notes";
    noteTitle.textContent = "Current Notes";
    createNewNote(tasks, false);
    showMsg("Current Notes");
  });
}

function appperDeletedNotes() {
  if (!trashContainerBtn) return;
  trashContainerBtn.addEventListener("click", (e) => {
    if (curContainer === "trash") return;
    fixClass(e);
    curContainer = "trash";
    noteTitle.textContent = "Trash";
    createNewNote(deletedTasks, true);
    showMsg("Deleted Notes");
  });
}

function appperAchievedNotes() {
  if (!achieveContainerBtn) return;
  achieveContainerBtn.addEventListener("click", (e) => {
    if (curContainer === "achieve") return;
    fixClass(e);
    curContainer = "achieve";
    notesContainer.innerHTML = "";
    noteTitle.textContent = "Achieve Coming Soon...";
    showMsg("Achieve Notes");
  });
}

function appperReminderNotes() {
  if (!reminderContainerBtn) return;
  reminderContainerBtn.addEventListener("click", (e) => {
    if (curContainer === "reminder") return;
    fixClass(e);
    curContainer = "reminder";
    notesContainer.innerHTML = "";
    noteTitle.textContent = "Reminder Coming Soon...";
    showMsg("Reminder Notes");
  });
}

// ------------------- //
// INIT
// ------------------- //
function init() {
  noteFormAppear();
  radioBtn();
  uiUpdate(tasks, false);
  setLocalStorage();
  wireNoteActions(); // one-time, centralized listener
  appperNotes();
  appperDeletedNotes();
  appperAchievedNotes();
  appperReminderNotes();
}
init();
