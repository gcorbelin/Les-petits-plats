/**
 * Bind all events needed to make a combobox work
 * @param {node} comboboxNode
 * @param {node} buttonNode
 * @param {node} listboxNode
 */
function comboboxAutocomplete(comboboxNode, buttonNode, listboxNode) {
  const comboboxWrapper = comboboxNode.closest(".form__combobox");

  // State control functions
  function isOpen() {
    return comboboxWrapper.classList.contains("open");
  }

  function switchPlaceholder() {
    const placeholder = comboboxNode.getAttribute("placeholder");
    comboboxNode.setAttribute(
      "placeholder",
      comboboxNode.getAttribute("data-placeholder")
    );
    comboboxNode.setAttribute("data-placeholder", placeholder);
  }

  // Display functions
  function open() {
    comboboxWrapper.classList.add("open");
    comboboxNode.setAttribute("aria-expanded", "true");
    switchPlaceholder();
    buttonNode.setAttribute("aria-expanded", "true");
  }

  function close() {
    comboboxWrapper.classList.remove("open");
    // eslint-disable-next-line no-param-reassign
    comboboxNode.value = "";
    comboboxNode.setAttribute("aria-expanded", "false");
    switchPlaceholder();
    buttonNode.setAttribute("aria-expanded", "false");
    const options = listboxNode.querySelectorAll('li[role="option"]');
    options.forEach((option) => {
      // eslint-disable-next-line no-param-reassign
      option.style.display = "block";
    });
  }

  // Event dependent Actions
  /**
   * Close comboboxes when the user click outside of it
   * @param {clickEvent} event
   */
  function onDocumentClick(event) {
    const cbb = event.target.closest(".form__combobox");
    const comboboxes = document.querySelectorAll(".form__combobox");

    comboboxes.forEach((combobox) => {
      if (cbb) {
        if (combobox !== cbb) {
          combobox.classList.remove("open");
        }
      } else {
        combobox.classList.remove("open");
      }
    });
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
    const value = event.target.value.toLowerCase();
    const options = listboxNode.querySelectorAll('li[role="option"]');
    options.forEach((option) => {
      const optionContent = option.textContent || option.innerText;
      if (optionContent.toLowerCase().includes(value)) {
        // eslint-disable-next-line no-param-reassign
        option.style.display = "block";
      } else {
        // eslint-disable-next-line no-param-reassign
        option.style.display = "none";
      }
    });
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

  // initialize pop up menu
  document.addEventListener("click", (event) => onDocumentClick(event));
  comboboxNode.addEventListener("click", onComboboxClick);
  buttonNode.addEventListener("click", onButtonClick);
  comboboxNode.addEventListener("keydown", (event) => onComboboxKeyDown(event));
  comboboxNode.addEventListener("keyup", (event) => onComboboxKeyUp(event));
  listboxNode.addEventListener("click", (event) => onListboxClick(event));
}

// Initialize comboboxes
function comboboxInit() {
  window.addEventListener("load", () => {
    const comboboxes = document.querySelectorAll(".form__combobox");

    comboboxes.forEach((combobox) => {
      const comboboxNode = combobox.querySelector("input");
      const buttonNode = combobox.querySelector("button");
      const listboxNode = combobox.querySelector('[role="listbox"]');
      comboboxAutocomplete(comboboxNode, buttonNode, listboxNode);
    });
  });
}

export default comboboxInit;
