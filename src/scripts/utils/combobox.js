function comboboxAutocomplete(comboboxNode, buttonNode, listboxNode) {
  // initialize pop up menu
  const comboboxWrapper = comboboxNode.closest(".js-combobox");
  comboboxNode.addEventListener("click", onComboboxClick);
  // comboboxNode.addEventListener("blur", close);
  buttonNode.addEventListener("click", onButtonClick);
  comboboxNode.addEventListener("keyup", (event) => onComboboxKeyUp(event));

  // Traverse the element children of domNode: configure each with
  // option role behavior and store reference in.options array.
  let nodes = listboxNode.getElementsByTagName("LI");

  for (let i = 0; i < nodes.length; i++) {
    let node = nodes[i];

    node.addEventListener("click", (event) => onOptionClick(event));
  }

  /* Display functions */
  function isOpen() {
    return comboboxWrapper.classList.contains("open");
  }

  function isClosed() {
    return !isOpen();
  }

  function open() {
    listboxNode.style.display = "block";
    comboboxWrapper.classList.add("open");
    comboboxNode.setAttribute("aria-expanded", "true");
    buttonNode.setAttribute("aria-expanded", "true");
  }

  function close() {
    listboxNode.style.display = "none";
    comboboxWrapper.classList.remove("open");
    comboboxNode.setAttribute("aria-expanded", "false");
    buttonNode.setAttribute("aria-expanded", "false");
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

  function onOptionClick(event) {
    close();
    console.log(comboboxNode, event.target.textContent);
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
