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

// Input Fields
const newNoteTitle = document.getElementById("title");
const newNoteDiscription = document.getElementById("description");

// Buttons
const radioBtns = [...document.querySelectorAll(".radio-btn")]; // NodeList
const addNotesCancelBtn = document.getElementById("add-notes-cancel-btn");
const addNotesSaveBtn = document.getElementById("add-notes-save-btn");
const deleteBtn = document.querySelector(".delete-btn");
// Date Entered by User

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
  alertBox.classList.remove("hidden");
  alertBox.classList.add("border-b-2", `border-${color}-600`);
  alertMsg.textContent = msg;
  setTimeout(() => {
    alertBox.classList.remove("border-b-2", `border-${color}-600`);
    alertBox.classList.add("hidden");
  }, 1000);
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

// SETTING DATA TO LOCAL STORAGE...
if (!localStorage.getItem("taskN0")) {
  localStorage.setItem("taskN0", 1);
}
let taskN0 = +localStorage.getItem("taskN0");

// Updating Tasks Array...
const setTasks = function () {
  let tasks = [];
  for (let index = 1; index <= taskN0; index++) {
    const item = localStorage.getItem(`task${index}`);
    if (item) {
      let task = JSON.parse(item);
      tasks.push(task);
    }
  }
  return tasks;
};
// Creating the main task array...
let tasks = setTasks();

// Crating a new note...
function createNewNote(tasks) {
  notesContainer.innerHTML = "";
  tasks.forEach((task) => {
    const bgColor = `bg-${task.bgColor}-500`;
    const html = `
    <div
    id="task${task.taskN0}"
    class="task-box shadow-custom-Black w-full break-inside-avoid rounded-lg p-5 flex flex-col justify-start gap-3 ${bgColor} relative group"
    >
 <div class="delete-btn flex justify-center items-center bg-red-600 w-fit py-1 px-1.5 rounded-lg transition-all duration-75 shadow-custom-Black -translate-y-1 active:translate-y-0 active:shadow-none cursor-pointer absolute right-0 top-0 opacity-0 group-hover:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="15" viewBox="0 0 384 512">
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
     </div>
    
    <div class="flex flex-col justify-between gap-1">
    <p class="text-sm text-gray-700">${task.time}</p>
    <h3 class="text-2xl text-gray-900 font-medium">${task.title}</h3>
    </div>
    <p class="text-lg text-gray-900 line-clamp-6 leading-snug">${task.description}</p>
    </div>
    `;

    notesContainer.insertAdjacentHTML("beforeend", html);
  });
}
const uiUpdate = function () {
  setTasks();
  createNewNote(tasks);
};
// Setting the localStorage
const setLocalStorage = function () {
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

      localStorage.setItem(
        `task${taskN0}`,
        JSON.stringify({
          title: title,
          taskN0: taskN0,
          description: description,
          bgColor: bgColor,
          time: currentDate("date"),
        })
      );

      taskN0++;
      localStorage.setItem("taskN0", taskN0);
      newNoteCancel();
      showMsg("green", "Note Created");
      tasks = setTasks();
      uiUpdate();
    }
  });
};

const deleteNotde = function () {
  notesContainer.addEventListener("click", (e) => {
    if (e.target.closest(".delete-btn") === deleteBtn) return;
    const taskId = e.target.closest(".task-box").id;
    taskN0--;
    localStorage.removeItem(taskId);
    localStorage.setItem("taskN0", taskN0);
    showMsg("green", "Note Created");
    tasks = setTasks();
    uiUpdate();
  });
};

// Calling Functions
noteFormAppear();
radioBtn();
uiUpdate(addNotesSaveBtn);
setLocalStorage();
deleteNotde(tasks);
