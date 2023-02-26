function comboboxAutocomplete(comboboxNode, buttonNode, listboxNode) {
  // initialize pop up menu
  const comboboxWrapper = comboboxNode.closest(".js-combobox");
  document.addEventListener("click", (event) => onDocumentClick(event));
  comboboxNode.addEventListener("click", onComboboxClick);
  buttonNode.addEventListener("click", onButtonClick);
  comboboxNode.addEventListener("keyup", (event) => onComboboxKeyUp(event));
  listboxNode.addEventListener("click", (event) => onListboxClick(event));

  /* Display functions */
  function isOpen() {
    return comboboxWrapper.classList.contains("open");
  }

  function isClosed() {
    return !isOpen();
  }

  function open() {
    comboboxWrapper.classList.add("open");
    comboboxNode.setAttribute("aria-expanded", "true");
    buttonNode.setAttribute("aria-expanded", "true");
  }

  function close() {
    comboboxWrapper.classList.remove("open");
    comboboxNode.setAttribute("aria-expanded", "false");
    buttonNode.setAttribute("aria-expanded", "false");
  }

  function onDocumentClick(event) {
    const cbb = event.target.closest(".js-combobox");
    const comboboxes = document.querySelectorAll(".js-combobox");

    if (cbb) {
      for (let i = 0; i < comboboxes.length; i++) {
        const combobox = comboboxes[i];
        if (cbb && combobox !== cbb) {
          combobox.classList.remove("open");
        }
      }
    } else {
      for (let i = 0; i < comboboxes.length; i++) {
        const combobox = comboboxes[i];
        combobox.classList.remove("open");
      }
    }
  }

  function onComboboxClick() {
    if (isOpen()) {
      close();
    } else {
      open();
    }
  }

  function onButtonClick() {
    if (isOpen()) {
      close();
    } else {
      open();
      comboboxNode.focus();
    }
  }

  function onComboboxKeyUp(event) {
    open();
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

  function onListboxClick(event) {
    if (event.target.nodeName === "LI") {
      close();
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
