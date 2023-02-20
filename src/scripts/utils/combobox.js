function comboboxAutocomplete(comboboxNode, buttonNode, listboxNode) {
  // initialize pop up menu
  comboboxNode.addEventListener("focus", onComboboxFocus);
  comboboxNode.addEventListener("blur", close);
  comboboxNode.addEventListener("keyup", (event) => onComboboxKeyUp(event));

  /* Display functions */
  function isOpen() {
    return listboxNode.style.display === "block";
  }

  function isClosed() {
    return listboxNode.style.display !== "block";
  }

  function open() {
    listboxNode.style.display = "block";
    comboboxNode.setAttribute("aria-expanded", "true");
    buttonNode.setAttribute("aria-expanded", "true");
  }

  function close() {
    listboxNode.style.display = "none";
    comboboxNode.setAttribute("aria-expanded", "false");
    buttonNode.setAttribute("aria-expanded", "false");
  }

  function onComboboxFocus() {
    if (isOpen()) {
      close();
    } else {
      open();
    }
  }

  function onComboboxKeyUp(event) {
    let value = event.target.value.toLowerCase();
    let options = listboxNode.querySelectorAll('li[role="option"]');
    if (options.length) {
      for (let i = 0; i < options.length; i++) {
        const optionContent = options[i].textContent || options[i].innerText;
        if (optionContent.toLowerCase().includes(value)) {
          options[i].style.display = "block";
        } else {
          options[i].style.display = "none";
        }
      }
    }
  }
}

// Initialize comboboxes
function comboboxInit() {}
window.addEventListener("load", function () {
  let comboboxes = document.querySelectorAll(".js-combobox");

  for (let i = 0; i < comboboxes.length; i++) {
    let combobox = comboboxes[i];
    let comboboxNode = combobox.querySelector("input");
    let buttonNode = combobox.querySelector("button");
    let listboxNode = combobox.querySelector('[role="listbox"]');
    comboboxAutocomplete(comboboxNode, buttonNode, listboxNode);
  }
});

export default comboboxInit;
