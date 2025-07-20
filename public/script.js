const radioBtns = document.querySelectorAll(".radio-btn");
const addNotesSec = document.getElementById("add-notes-section");
const notesFormBtns = document.querySelectorAll("#add-notes-btn");
console.log(notesFormBtns);

function radioBtn() {
  radioBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const btnColor = btn.nextElementSibling.textContent.toLowerCase();

      // First, remove existing color classes
      radioBtns.forEach((btn) =>
        btn.classList.remove("bg-yellow-600", "bg-green-600", "bg-purple-600")
      );

      // Then add the correct one
      if (["purple", "green", "yellow"].includes(btnColor)) {
        btn.classList.add(`bg-${btnColor}-600`);
      }
    });
  });
}
radioBtn();

function addNotedisAppear() {}
