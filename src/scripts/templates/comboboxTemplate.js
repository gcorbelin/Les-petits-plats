function comboboxTemplate(data, label) {
  function getComboboxList() {
    let comboboxList = document.createElement("ul");
    comboboxList.classList.add("combobox__list");
    comboboxList.setAttribute("id", `combobox-${label.toLowerCase()}-listbox`);
    comboboxList.setAttribute("role", "listbox");
    comboboxList.setAttribute("aria-label", label);

    data.forEach((elem, index) => {
      const comboboxElem = document.createElement("li");
      comboboxElem.classList.add("combobox__item");
      comboboxElem.setAttribute(
        "id",
        `combobox-${label.toLowerCase()}-${index}`
      );
      comboboxElem.setAttribute("role", "option");
      comboboxElem.innerHTML = elem;

      comboboxList.appendChild(comboboxElem);
    });

    return comboboxList;
  }

  return { getComboboxList };
}

export default comboboxTemplate;
