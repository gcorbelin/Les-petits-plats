function comboboxTemplate(data, label) {
  function getComboboxList() {
    let comboboxList = document.createElement("ul");
    comboboxList.classList.add("combobox__list");
    comboboxList.setAttribute("id", `combobox-${label.toLowerCase()}-listbox`);
    comboboxList.setAttribute("role", "listbox");
    comboboxList.setAttribute("aria-label", label);

    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        const elem = data[i];
        const comboboxElem = document.createElement("li");
        comboboxElem.classList.add("combobox__item");
        comboboxElem.setAttribute("id", `combobox-${label.toLowerCase()}-${i}`);
        comboboxElem.setAttribute("role", "option");
        comboboxElem.innerHTML = elem;

        comboboxList.appendChild(comboboxElem);
      }
    }

    return comboboxList;
  }

  return { getComboboxList };
}

export default comboboxTemplate;
