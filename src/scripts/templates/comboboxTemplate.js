function comboboxTemplate(data, label) {
  /**
   * Create the combobox
   * @returns HTML node containing the combobox markup
   */
  function getCombobox() {
    const comboboxList = getComboboxList();
    const combobox = document.createElement("div");
    combobox.classList.add("form__combobox");
    combobox.setAttribute("id", `combobox-${label.toLowerCase()}-wrapper`);

    const comboboxContent = `
      <label class="sr-only" for="combobox-${label.toLowerCase()}"
        >${label}</label
      >
      <div
        id="combobox-${label.toLowerCase()}"
        class="combobox js-combobox"
      >
        <div class="combobox__group">
          <input
            type="text"
            class="combobox__input"
            id="combobox-${label.toLowerCase()}"
            name="combobox-${label.toLowerCase()}"
            placeholder="${label}"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="false"
            aria-controls="combobox-${label.toLowerCase()}-listbox"
          />
          <button
            type="button"
            class="combobox__button"
            id="combobox-${label.toLowerCase()}-button"
            tabindex="-1"
            aria-label="${label}"
            aria-expanded="false"
            aria-controls="combobox-${label.toLowerCase()}-listbox"
          >
            <i class="fa fa-chevron-down" aria-hidden="true"></i>
          </button>
        </div>
        ${comboboxList}
      </div>
    `;

    combobox.innerHTML = comboboxContent;

    return combobox;
  }

  /**
   * Create the list
   * @returns UL element containing LI elements inside an HTML string
   */
  function getComboboxList() {
    const comboboxElems = getComboboxItems();
    const comboboxList = `
    <ul id="combobox-${label.toLowerCase()}-listbox" class="combobox__list" role="listbox" aria-label="${label}" data-type="${label.toLowerCase()}">
      ${comboboxElems}
    </ul>`;

    return comboboxList;
  }

  /**
   * Create the list items
   * @returns All LI elements inside an HTML string
   */
  function getComboboxItems() {
    let comboboxElems = "";

    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        const elem = data[i];
        const comboboxElem = `
          <li id="combobox-${label.toLowerCase()}-${i}" class="combobox__item" role="option">${elem}</li>`;
        comboboxElems += comboboxElem;
      }
    }

    return comboboxElems;
  }

  return { getCombobox, getComboboxList, getComboboxItems };
}

export default comboboxTemplate;
