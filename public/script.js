// ------------------------- //
// SELECTING ELEMENTS
// ------------------------- //

// Sections
const addNotesSec = document.getElementById("add-notes-section");
const notesContainer = document.getElementById("notes-container");

//  Elements
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
const trashIcon = document.querySelector(".trash");

// ///////////////////////////////////////////

// ------------------- //
// ADD A NEW NOTE...
// ------------------- //

const checkedRadioBtn = function (btns) {
  const bgColor = btns.find((btn) =>
    [...btn.classList].some(
      (cla) =>
        cla === "bg-green-600" || cla === "bg-red-600" || cla === "bg-blue-600"
    )
  );
  bgColor;

  return bgColor;
};

const clearFields = function (field_1, field_2) {
  field_1.value = field_2.value = "";
};

const removeClass = (btn) => {
  return btn.classList.remove("bg-blue-600", "bg-green-600", "bg-red-600");
};

const setStorage = function (name, description) {
  localStorage.setItem(name, description);
};

const showMsg = function (msg) {
  alertBox.classList.remove("hidden");
  alertMsg.textContent = msg;
  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 3000);
};

// CREATING DATES AND TIMES WITH ISO...
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
  // radioBtns.forEach((btn) => removeClass(btn));
  radioBtnsBox.addEventListener("click", (e) => {
    const cond = [...e.target.classList].includes("radio-btn");
    if (!cond) return;
    const btnColor =
      e.target.nextElementSibling.textContent.toLocaleLowerCase();
    radioBtns.forEach((btn) => removeClass(btn));
    e.target.classList.add(`bg-${btnColor}-600`);
    return btnColor;
  });
}

// SETTING DATA TO LOCAL STORAGE...
if (!localStorage.getItem("taskNo")) {
  setStorage("taskNo", 1);
  setStorage("deletedTaskNo", 1);
}
let taskNo = +localStorage.getItem("taskNo");
let deletedTaskNo = +localStorage.getItem("deletedTaskNo");

let tasks;
let deletedTasks;
// Updating Tasks Array...
const setTasks = function (arr, length, arrName = "task") {
  arr = [];
  for (let index = 1; index <= length; index++) {
    let item = localStorage.getItem(`${arrName + index}`);
    if (item) {
      let task = JSON.parse(item);
      arr.push(task);
    }
  }
  return arr;
};
// Creating the main task array...
tasks = setTasks(tasks, taskNo);
deletedTasks = setTasks(deletedTasks, deletedTaskNo, "deletedtask");

// Crating a new note...
function createNewNote(arr) {
  notesContainer.innerHTML = "";
  arr.forEach((item, i) => {
    const bgColor = `bg-${item.bgColor}-500`;
    const delay = (i * 0.2).toFixed(1); // Each task delayed by 0.3s
    console.log(item);

    const html = `
    <div
    id="task${item.taskNo}"
    class="task-box shadow-custom-Black w-full break-inside-avoid rounded-lg p-2.5 md:p-5 flex flex-col justify-start gap-3 ${bgColor} relative group animate-fadeIn"
    style="animation-delay: ${delay}s;"
    >
   <div class="delete-btn flex justify-center items-center bg-red-600 hover:bg-red-700 w-fit py-1 px-1.5 rounded-lg transition-all duration-200 shadow-custom-Black -translate-y-1 active:translate-y-0 active:shadow-none cursor-pointer absolute right-0 top-0 opacity-0 group-hover:opacity-100">
      <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="15" viewBox="0 0 384 512">
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
     </div>
    
    <div class="flex flex-col justify-between gap-1">
    <p class="text-sm text-gray-700 ">${item.time}</p>
    <h3 class="text-2xl text-gray-900 font-medium">${item.title}</h3>
    </div>
    <p class="text-lg text-gray-800 line-clamp-6 leading-snug">${item.description}</p>
    </div>
    `;

    notesContainer.insertAdjacentHTML("beforeend", html);
  });
}
const uiUpdate = function () {
  setTasks(tasks, taskNo);
  createNewNote(tasks);
};
// Setting the localStorage
const setLocalStorage = function () {
  addNotesSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = newNoteTitle.value;
    const description = newNoteDiscription.value;

    if (title === "") {
      showMsg("Enter note title...");
    } else if (description === "") {
      showMsg("Enter note description...");
    } else if (checkedRadioBtn(radioBtns) === undefined) {
      showMsg("Pick a color");
    } else {
      const bgColor =
        checkedRadioBtn(radioBtns).nextElementSibling.textContent.toLowerCase();
      setStorage(
        `task${taskNo}`,
        JSON.stringify({
          title: title,
          taskNo: taskNo,
          description: description,
          bgColor: bgColor,
          time: currentDate("date"),
        })
      );
      taskNo++;
      setStorage("taskNo", taskNo);
      newNoteCancel();
      showMsg("Note Created");
      tasks = setTasks(tasks, taskNo);
      uiUpdate();
    }
  });
};
// Deleting a Note
const deleteNotde = function () {
  notesContainer.addEventListener("click", (e) => {
    if (!e.target.closest(".delete-btn")) return;

    const taskId = e.target.closest(".task-box").id;
    const deletedTask = JSON.parse(localStorage.getItem(taskId));
    console.log(deletedTask, taskId);
    console.log(deletedTaskNo);

    setStorage(
      `deletedtask${deletedTaskNo}`,
      JSON.stringify({
        title: deletedTask.title,
        taskNo: deletedTaskNo,
        description: deletedTask.description,
        bgColor: deletedTask.bgColor,
        time: currentDate("date"),
      })
    );
    taskNo--;
    deletedTaskNo++;
    localStorage.removeItem(`task${taskNo}`);
    setStorage("taskNo", taskNo);
    setStorage("deletedTaskNo", deletedTaskNo);
    showMsg("Note Deleted");
    tasks = setTasks(tasks, taskNo);
    deletedTasks = setTasks(deletedTasks, deletedTaskNo, "deletedtask");
    uiUpdate();
  });
};

// Search Functionallity...

const searchtask = function () {
  searchBar.addEventListener("input", (e) => {
    const target = e.target.value.toLowerCase();

    const taskBoxs = Array.from(document.querySelectorAll(".task-box"));
    const taskNames = taskBoxs.map((box) => box.querySelector("h3"));
    taskNames.forEach((taskName) => {
      const taskparent = taskName.closest(".task-box");
      const text = taskName.textContent.toLowerCase();
      text.includes(target)
        ? taskparent.classList.remove("hidden")
        : taskparent.classList.add("hidden");
    });
  });
};
document.addEventListener("DOMContentLoaded", searchtask);

// Trash bin Functionallity...

const asideFunct = function () {
  aside.addEventListener("click", (e) => {
    const target = e.target.closest("div").classList;
    // console.log(target.contains("notes"))

    if (target.contains("notes")) {
      createNewNote(tasks);
      showMsg("Current Notes");
      console.log(e.target);

      noteTitle.textContent = "Notes";
    } else if (target.contains("trash")) {
      createNewNote(deletedTasks);
      showMsg("Deleted Notes");
      noteTitle.textContent = "Trash";
      e.target.closest("div").classList.add("focus:bg-green-400");
      // e.target.closest("div").classList.remove("bg-green-400");
    }
  });
};

// Calling Functions
function run() {
  noteFormAppear();
  radioBtn();
  uiUpdate(addNotesSaveBtn);
  setLocalStorage();
  deleteNotde();
  asideFunct();
}
run();
