function comboboxAutocomplete(comboboxNode, buttonNode, listboxNode) {
  // initialize pop up menu
  comboboxNode.addEventListener("focus", onComboboxClick);
  comboboxNode.addEventListener("blur", close);

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

  function onComboboxClick() {
    console.log("click");
    if (isOpen()) {
      close(true);
    } else {
      open();
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
