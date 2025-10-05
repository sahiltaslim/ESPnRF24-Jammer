const settingsButton = document.getElementById("settingsButton");
const settingsDropdown = document.getElementById("settingsDropdown");

function toggleDropdown() {
  settingsDropdown.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add('fadein-body');

  if (settingsButton) {
    settingsButton.addEventListener("click", toggleDropdown);
  }

  if (settingsDropdown) {
    settingsDropdown.addEventListener("click", (event) => {
      const clickedLink = event.target.closest("a.dropdown-link");

      if (clickedLink) {
        settingsDropdown.classList.remove("show");
      }
    });
  }
});
