"use strict";

/* ------------------------- */
/* SELECTING ELEMENTS        */
/* ------------------------- */

// Sections
const addNotesSec = document.getElementById("add-notes-section");
const notesContainer = document.getElementById("notes-container");
const showNoteSec = document.getElementById("show-full-note");

// Elements
const newNoteBtn = document.getElementById("new-note");
const alertBox = document.querySelector(".alert");
const alertMsg = document.querySelector(".alert-msg");
const noteTitle = document.querySelector("#note-title");
const aside = document.querySelector("aside");

// Input Fields
const newNoteTitle = document.getElementById("title");
const newNoteDiscription = document.getElementById("description");
const reminderTimeInput = document.getElementById("reminder-time");
let searchBar = document.querySelector(".search-bar");
const noteShowBox = document.querySelector(".note-show-box");

// Buttons / controls
const radioBtns = [...document.querySelectorAll(".radio-btn")]; // NodeList -> Array
const radioBtnsBox = document.querySelector(".radio-btn-box");
const addNotesCancelBtn = document.getElementById("add-notes-cancel-btn");
const addNotesSaveBtn = document.getElementById("add-notes-save-btn");
const notesContainerBtn = document.querySelector(".notes");
const trashContainerBtn = document.querySelector(".trash");
const achieveContainerBtn = document.querySelector(".achieve");
const reminderContainerBtn = document.querySelector(".reminder");

/* ------------------- */
/* CONSTANTS           */
/* ------------------- */
const COLOR_CLASSES_600 = ["bg-blue-600", "bg-green-600", "bg-red-600"];
const COLOR_CLASSES_500 = ["bg-blue-500", "bg-green-500", "bg-red-500"];
const COLOR_KEYS = ["blue", "green", "red"]; // supported colors

/* ------------------- */
/* STORAGE HELPERS     */
/* ------------------- */
const setStorage = (name, value) => {
  try {
    localStorage.setItem(name, value);
  } catch (e) {
    // ignore storage errors (private mode)
  }
};

const getStorage = (name) => {
  try {
    return localStorage.getItem(name);
  } catch (e) {
    return null;
  }
};

/* ------------------- */
/* UI HELPER FUNCTIONS */
/* ------------------- */
const toggleClasses = (el, add = [], remove = []) => {
  if (!el) return;
  if (add.length) el.classList.add(...add);
  if (remove.length) el.classList.remove(...remove);
};

const removeClass = (el, cl) => {
  if (!el || !cl) return;
  Array.isArray(cl) ? el.classList.remove(...cl) : el.classList.remove(cl);
};

const clearFields = function (...fields) {
  fields.forEach((field) => field && (field.value = ""));
};

const checkedRadioBtn = function (btns) {
  return btns.find((btn) =>
    [...btn.classList].some((cla) => COLOR_CLASSES_600.includes(cla))
  );
};

const showMsg = function (msg, timeout = 1200) {
  if (!alertBox || !alertMsg) return;
  alertBox.classList.remove("hidden");
  alertMsg.textContent = msg;
  // ensure visible for the duration
  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, timeout);
};

/* ------------------- */
/* DATE & TIME         */
/* ------------------- */
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

/* ------------------- */
/* STATE               */
/* ------------------- */
let tasks = JSON.parse(getStorage("tasks") || "[]");
let deletedTasks = JSON.parse(getStorage("deletedTasks") || "[]");
let achieveTasks = JSON.parse(getStorage("achieveTasks") || "[]");
let reminderTasks = JSON.parse(getStorage("reminderTasks") || "[]");

// 'notes' | 'trash' | 'achieve' | 'reminder'
let curContainer = "notes";

/* ------------------- */
/* STORAGE SAVE        */
/* ------------------- */
const saveTasks = () => {
  setStorage("tasks", JSON.stringify(tasks));
  setStorage("deletedTasks", JSON.stringify(deletedTasks));
  setStorage("achieveTasks", JSON.stringify(achieveTasks));
  setStorage("reminderTasks", JSON.stringify(reminderTasks));
};

/* ------------------- */
/* SVG / BUTTON SELECTOR*/
/* ------------------- */
const selectSVG = function (btn) {
  // Return the requested control button markup depending on btn type.
  if (btn === "achieveBtn") {
    return `
    <div class="btn achieve-btn justify-center items-center bg-blue-600 hover:bg-blue-700 w-fit py-1 px-1.5
        rounded-lg transition-all duration-200 shadow-custom-Black -translate-y-1 active:translate-y-0
        active:shadow-none cursor-pointer absolute right-7 top-0 opacity-0 group-hover:opacity-100 border
        border-blue-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" height='16'>
            <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
            <path fill-rule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
        </svg>
    </div>
    `;
  }

  if (btn === "restoreBtn") {
    return `
    <div class="btn restore-btn justify-center items-center bg-green-600 hover:bg-green-700 w-fit py-1
        px-1.5 rounded-lg transition-all duration-200 shadow-custom-Black -translate-y-1 active:translate-y-0
        active:shadow-none cursor-pointer absolute right-7 top-0 opacity-0 group-hover:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="16" viewBox="0 0 640 640">
            <path d="M263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9C237.1 56.8 249.3 48 263.1 48zM128 208L512 208L490.9 531.1C489.3 556.4 468.3 576 443 576L197 576C171.7 576 150.7 556.4 149.1 531.1L128 208zM337 287C327.6 277.6 312.4 277.6 303.1 287L231.1 359C221.7 368.4 221.7 383.6 231.1 392.9C240.5 402.2 255.7 402.3 265 392.9L296 361.9L296 464C296 477.3 306.7 488 320 488C333.3 488 344 477.3 344 464L344 361.9L375 392.9C384.4 402.3 399.6 402.3 408.9 392.9C418.2 383.5 418.3 368.3 408.9 359L336.9 287z"/>
        </svg>
    </div>
    `;
  }

  if (btn === "unAchieveBtn") {
    return `
    <div class="btn unachieve-btn justify-center items-center bg-blue-600 hover:bg-blue-700 w-fit py-1 px-1.5
        rounded-lg transition-all duration-200 shadow-custom-Black -translate-y-1 active:translate-y-0
        active:shadow-none cursor-pointer absolute right-7 top-0 opacity-0 group-hover:opacity-100 border
        border-blue-500/20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height='16'>
            <path
                d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
            <path fill-rule="evenodd"
                d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                clip-rule="evenodd" />
        </svg>


    </div>
    `;
  }

  // default: nothing
  return "";
};

/* ------------------- */
/* CREATE NOTES MARKUP */
/* ------------------- */
const createNewNote = function (arr, btn) {
  if (!notesContainer) return;
  notesContainer.innerHTML = "";

  arr.forEach((item) => {
    // safe fallback for bgColor
    const colorKey = COLOR_KEYS.includes(item.bgColor) ? item.bgColor : "blue";
    const bgColorClass = `bg-${colorKey}-500`;

    const html = `
<div id="${item.id}"
    class="task-box shadow-custom-Black w-full break-inside-avoid rounded-lg p-2.5 md:p-5 flex flex-col justify-start gap-3 ${bgColorClass} relative group cursor-context-menu">
    <div class="btn delete-btn flex justify-center items-center bg-red-600 hover:bg-red-700 w-fit py-1 px-1.5 rounded-lg transition-all duration-200 shadow-custom-Black -translate-y-1 active:translate-y-0 active:shadow-none cursor-pointer absolute right-0 top-0 opacity-0 group-hover:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="16" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
    </div>
    ${selectSVG(btn)}
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

/* ------------------- */
/* UI UPDATE wrapper   */
/* ------------------- */
const uiUpdate = (arr, btn) => {
  // save state first
  saveTasks();
  // then re-render
  createNewNote(arr, btn);
};

/* ------------------- */
/* NOTE FORM HANDLING  */
/* ------------------- */
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
  clearFields(newNoteTitle, newNoteDiscription, reminderTimeInput);
};

/* ------------------- */
/* RADIO BUTTONS (COLOR)*/
/* ------------------- */
function radioBtn() {
  if (!radioBtnsBox) return;

  radioBtnsBox.addEventListener("click", (e) => {
    const target = e.target.closest(".radio-btn");
    if (!target) return;

    // prefer data-color, fallback to sibling label text
    const textColor = target.nextElementSibling?.textContent
      ?.trim()
      ?.toLowerCase();
    const btnColor = COLOR_KEYS.includes(textColor) ? textColor : null;

    // Clear previous selected color classes
    radioBtns.forEach((btn) => removeClass(btn, COLOR_CLASSES_600));

    if (btnColor) {
      target.classList.add(`bg-${btnColor}-600`);
    } else {
      showMsg("Invalid color option");
    }
  });
}

/* ------------------- */
/* ADD NEW NOTE (local)*/
/* ------------------- */
const setLocalStorageHandler = function () {
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
    const selectedData = (selected.dataset?.color || "").toLowerCase();
    const bgColor = COLOR_KEYS.includes(selectedData)
      ? selectedData
      : COLOR_KEYS.includes(fallbackText)
      ? fallbackText
      : "blue"; // default safe color

    const reminderTime = reminderTimeInput.value;
    
    const newTask = {
      id: Date.now(),
      title,
      description,
      bgColor,
      time: currentDate("date"),
      reminderTime: reminderTime || null,
    };
    
    if (reminderTime) {
      reminderTasks.push({...newTask});
      scheduleReminder(newTask);
    }

    tasks.push(newTask);
    if (curContainer === "notes") uiUpdate(tasks, "achieveBtn");
    newNoteCancel();
    showMsg("Note Created");
  });
};
// End...

/* ------------------------------------------------------------------------- */
/* CLICK HANDLING (DELETE / RESTORE / PERMA-DELETE / ACHIEVE / UNACHIEVE) */
/* ------------------------------------------------------------------------- */
function wireNoteActions() {
  if (!notesContainer) return;
  notesContainer.addEventListener("click", (e) => {
    const achieveBtn =
      e.target.closest(".achieve-btn") || e.target.closest(".unachieve-btn");
    const restoreBtn = e.target.closest(".restore-btn");
    const deleteBtn = e.target.closest(".delete-btn");
    const taskBox = e.target.closest(".task-box");
    if (!taskBox) return;

    const taskId = +taskBox.id;

    // ------------------ NOTES VIEW ------------------ //
    if (curContainer === "notes") {
      if (deleteBtn) {
        const idx = tasks.findIndex((t) => t.id === taskId);
        if (idx !== -1) {
          const removed = tasks.splice(idx, 1)[0];
          deletedTasks.push(removed);
          uiUpdate(tasks, "achieveBtn");
          showMsg("Note Moved to Trash...");
        }
        return;
      }

      if (achieveBtn) {
        // Achieve from notes
        const idx = tasks.findIndex((t) => t.id === taskId);
        if (idx !== -1) {
          const removed = tasks.splice(idx, 1)[0];
          achieveTasks.push(removed);
          uiUpdate(tasks, "achieveBtn");
          showMsg("Note Achieved...");
        }
        return;
      }
    }

    // ------------------ TRASH VIEW ------------------ //
    if (curContainer === "trash") {
      if (restoreBtn) {
        const idx = deletedTasks.findIndex((t) => t.id === taskId);
        if (idx !== -1) {
          const restored = deletedTasks.splice(idx, 1)[0];
          tasks.push(restored);
          uiUpdate(deletedTasks, "restoreBtn");
          showMsg("Note Restored from Trash...");
        }
        return;
      }
      if (deleteBtn) {
        const idx = deletedTasks.findIndex((t) => t.id === taskId);
        if (idx !== -1) {
          deletedTasks.splice(idx, 1);
          uiUpdate(deletedTasks, "restoreBtn");
          showMsg("Note Permanently Deleted...");
        }
        return;
      }
    }

    // ------------------ ACHIEVE VIEW ------------------ //
    if (curContainer === "achieve") {
      if (deleteBtn) {
        const idx = achieveTasks.findIndex((t) => t.id === taskId);
        if (idx !== -1) {
          const removed = achieveTasks.splice(idx, 1)[0];
          deletedTasks.push(removed);
          uiUpdate(achieveTasks, "unAchieveBtn");
          showMsg("Achieved Note Moved to Trash...");
        }
        return;
      }
      if (achieveBtn) {
        // un-achieve (restore from achieve to notes)
        const idx = achieveTasks.findIndex((t) => t.id === taskId);
        if (idx !== -1) {
          const restored = achieveTasks.splice(idx, 1)[0];
          tasks.push(restored);
          uiUpdate(achieveTasks, "unAchieveBtn");
          showMsg("Note Restored from Achieve...");
        }
        return;
      }
    }
  });
}
// End...

/* ------------------- */
/* SEARCH HANDLING     */
/* ------------------- */
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
// End...

/* ------------------- */
/* ASIDE HANDLING      */
/* ------------------- */
const fixClass = function (e) {
  const asideRoot = e.currentTarget.closest("aside");
  if (!asideRoot) return;
  const elements = asideRoot.querySelectorAll(".aside-child");
  elements.forEach((el) => removeClass(el, "bg-purple-600/30"));
  e.currentTarget.classList.add("bg-purple-600/30");
};
// End...

/* ------------------- */
/* Full Task View      */
/* ------------------- */
const showTask = function () {
  // close on ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !showNoteSec.classList.contains("hidden")) {
      showNoteSec.classList.add("hidden");
    }
  });

  // close on outside click
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".task-box") &&
      !showNoteSec.classList.contains("hidden") &&
      e.target.closest(".note-show-box") !== noteShowBox
    ) {
      showNoteSec.classList.add("hidden");
    }
  });

  const viewTask = function (e) {
    const taskBox = e.target.closest(".task-box");
    if (taskBox && !e.target.closest(".btn")) {
      const taskId = +taskBox.id;
      let arr = [];
      if (curContainer === "notes") arr = tasks;
      else if (curContainer === "trash") arr = deletedTasks;
      else if (curContainer === "achieve") arr = achieveTasks;

      const obj = arr.find((t) => t.id === taskId);
      if (!obj) return;

      const title = showNoteSec.querySelector(".full-note-title");
      const description = showNoteSec.querySelector(".full-note-description");
      const noteBox = showNoteSec.querySelector(".note-show-box");
      // prepare content
      title.textContent = obj.title;
      description.textContent = obj.description;
      removeClass(noteBox, COLOR_CLASSES_500);
      const colorKey = COLOR_KEYS.includes(obj.bgColor) ? obj.bgColor : "blue";
      noteBox.classList.add(`bg-${colorKey}-500`);
      toggleClasses(showNoteSec, ["flex"], ["hidden"]);
    }
  };

  notesContainer.addEventListener("click", (e) => {
    viewTask(e);
  });
};
// End...

/* ------------------- */
/* ASIDE NAV HANDLERS  */
/* ------------------- */
function appperNotes() {
  if (!notesContainerBtn) return;
  notesContainerBtn.addEventListener("click", (e) => {
    if (curContainer === "notes") return;
    fixClass(e);
    curContainer = "notes";
    noteTitle.textContent = "Current Notes";
    createNewNote(tasks, "achieveBtn");
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
    createNewNote(deletedTasks, "restoreBtn");
    showMsg("Deleted Notes");
  });
}

function appperAchievedNotes() {
  if (!achieveContainerBtn) return;
  achieveContainerBtn.addEventListener("click", (e) => {
    if (curContainer === "achieve") return;
    fixClass(e);
    curContainer = "achieve";
    noteTitle.textContent = "Achieved Notes";
    createNewNote(achieveTasks, "unAchieveBtn");
    showMsg("Achieve Notes");
  });
}

function appperReminderNotes() {
  if (!reminderContainerBtn) return;
  reminderContainerBtn.addEventListener("click", (e) => {
    if (curContainer === "reminder") return;
    fixClass(e);
    curContainer = "reminder";
    noteTitle.textContent = "Reminders";
    createNewNote(reminderTasks, "achieveBtn");
    showMsg("Reminder Notes");
  });
}
// End...

/* ------------------- */
/* REMINDER FUNCTIONS  */
/* ------------------- */
const scheduleReminder = (task) => {
  const reminderTime = new Date(task.reminderTime).getTime();
  const now = Date.now();
  const delay = reminderTime - now;
  
  if (delay > 0) {
    setTimeout(() => {
      showReminderNotification(task);
      playReminderSound();
    }, delay);
  }
};

const showReminderNotification = (task) => {
  if (Notification.permission === 'granted') {
    new Notification(`Reminder: ${task.title}`, {
      body: task.description,
      icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="%237048e8" d="M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/></svg>'
    });
  }
  showMsg(`Reminder: ${task.title}`);
};

const playReminderSound = () => {
  const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
  audio.play().catch(() => {});
};

const requestNotificationPermission = () => {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
};

const loadActiveReminders = () => {
  reminderTasks.forEach(task => {
    if (task.reminderTime && new Date(task.reminderTime) > new Date()) {
      scheduleReminder(task);
    }
  });
};

/* ------------------- */
/* INIT                */
/* ------------------- */
function init() {
  noteFormAppear();
  radioBtn();
  setLocalStorageHandler();
  uiUpdate(tasks, "achieveBtn"); // initial render
  wireNoteActions(); // one centralized listener
  appperNotes();
  appperDeletedNotes();
  appperAchievedNotes();
  appperReminderNotes();
  showTask();
  searchTask();
  requestNotificationPermission();
  loadActiveReminders();
}

// run
init();
