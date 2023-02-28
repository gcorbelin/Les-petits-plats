/**
 * Bind all events needed to make a combobox work
 * @param {node} comboboxNode
 * @param {node} buttonNode
 * @param {node} listboxNode
 */
function comboboxAutocomplete(comboboxNode, buttonNode, listboxNode) {
  // initialize pop up menu
  const comboboxWrapper = comboboxNode.closest(".form__combobox");
  document.addEventListener("click", (event) => onDocumentClick(event));
  comboboxNode.addEventListener("click", onComboboxClick);
  buttonNode.addEventListener("click", onButtonClick);
  comboboxNode.addEventListener("keydown", (event) => onComboboxKeyDown(event));
  comboboxNode.addEventListener("keyup", (event) => onComboboxKeyUp(event));
  listboxNode.addEventListener("click", (event) => onListboxClick(event));

  // State control functions
  function isOpen() {
    return comboboxWrapper.classList.contains("open");
  }

  function isClosed() {
    return !isOpen();
  }

  // Display functions
  function open() {
    comboboxWrapper.classList.add("open");
    comboboxNode.setAttribute("aria-expanded", "true");
    comboboxNode.setAttribute(
      "placeholder",
      comboboxNode.getAttribute("data-placeholder")
    );
    buttonNode.setAttribute("aria-expanded", "true");
  }

  function close() {
    comboboxWrapper.classList.remove("open");
    comboboxNode.value = "";
    comboboxNode.setAttribute("aria-expanded", "false");
    buttonNode.setAttribute("aria-expanded", "false");
    let options = listboxNode.querySelectorAll('li[role="option"]');
    if (options.length) {
      for (let i = 0; i < options.length; i++) {
        options[i].style.display = "block";
      }
    }
  }

  // Event dependent Actions
  /**
   * Close comboboxes when the user click outside of it
   * @param {clickEvent} event
   */
  function onDocumentClick(event) {
    const cbb = event.target.closest(".form__combobox");
    const comboboxes = document.querySelectorAll(".form__combobox");

    for (let i = 0; i < comboboxes.length; i++) {
      const combobox = comboboxes[i];
      if (cbb) {
        if (combobox !== cbb) {
          combobox.classList.remove("open");
        }
      } else {
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

  /**
   * Filter LI elements on key inputs
   * @param {keyUpEvent} event
   */
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

  /**
   * Close dropdown if Escape or tab is pressed
   * @param {keyDownEvent} event
   */
  function onComboboxKeyDown(event) {
    let keyCode;
    if (event.key !== undefined) {
      keyCode = event.key;
    } else if (event.keyIdentifier !== undefined) {
      keyCode = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
      keyCode = event.keyCode;
    }

    switch (keyCode) {
      case "Tab":
      case "Escape":
        close();
        break;
      default:
        open();
        break;
    }
  }

  function onListboxClick(event) {
    if (event.target.nodeName === "LI") {
      close();
    }
  }
}

// Initialize comboboxes
function comboboxInit() {
  window.addEventListener("load", function () {
    let comboboxes = document.querySelectorAll(".form__combobox");

    for (let i = 0; i < comboboxes.length; i++) {
      let combobox = comboboxes[i];
      let comboboxNode = combobox.querySelector("input");
      let buttonNode = combobox.querySelector("button");
      let listboxNode = combobox.querySelector('[role="listbox"]');
      comboboxAutocomplete(comboboxNode, buttonNode, listboxNode);
    }
  });
}

export default comboboxInit;
