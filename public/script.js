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
  alertMsg.textContent = msg;
  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 5000);
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
// SETTING DATA TO LOCAL STORAGE...

if (!localStorage.getItem("taskN0")) {
  localStorage.setItem("taskN0", 1);
}
let taskN0 = +localStorage.getItem("taskN0");
console.log(taskN0);

// Creating Tasks array
let tasks;
const setTasks = function () {
  tasks = [];
  for (let index = 1; index <= taskN0; index++) {
    if (localStorage.getItem(`task${index}`)) {
      let task = JSON.parse(localStorage.getItem(`task${index}`));
      tasks.push(task);
    }
  }
};

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
          description: description,
          bgColor: bgColor,
        })
      );
      newNoteCancel();
      showMsg("green", "Note Created");
      taskN0++
      localStorage.setItem("taskN0", taskN0);
      setTasks();

      if (tasks.length !== 0) {
        createNewNote(tasks);
      }
    }
    console.log(taskN0);
  });
};

function createNewNote(tasks) {
  console.log(tasks);

  notesContainer.innerHTML = "";
  tasks.forEach((task) => {
    const html = `
    <div
    class="shadow-custom-Black w-full break-inside-avoid rounded-3xl p-5 flex flex-col gap-2"
    >
    <p class="text-sm text-gray-600">${currentDate("date")}</p>
    <h3 class="text-2xl font-medium">${task.title}</h3>
    <p class="text-lg line-clamp-6">${task.description}</p>
    </div>
    `;
    notesContainer.insertAdjacentHTML("beforeend", html);
  });
}

// Calling Functions
setTasks();
setLocalStorage();
createNewNote(tasks);
noteFormAppear();
radioBtn();
