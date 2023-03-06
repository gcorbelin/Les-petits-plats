function comboboxTemplate(data, id, label, placeholder) {
  /**
   * Create the combobox
   * @returns HTML node containing the combobox markup
   */
  function getCombobox() {
    const comboboxList = getComboboxList();
    const combobox = document.createElement("div");
    combobox.classList.add("form__combobox");
    combobox.setAttribute("id", `combobox-${id.toLowerCase()}-wrapper`);

    const comboboxContent = `
      <label class="sr-only" for="combobox-${id.toLowerCase()}"
        >${placeholder}</label
      >
      <div
        class="combobox js-combobox"
      >
        <div class="combobox__group">
          <input
            type="text"
            class="combobox__input"
            id="combobox-${id.toLowerCase()}"
            name="combobox-${id.toLowerCase()}"
            placeholder="${label}"
            data-placeholder="${placeholder}"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="false"
            aria-controls="combobox-${id.toLowerCase()}-listbox"
          />
          <button
            type="button"
            class="combobox__button"
            id="combobox-${id.toLowerCase()}-button"
            tabindex="-1"
            aria-label="${placeholder}"
            aria-expanded="false"
            aria-controls="combobox-${id.toLowerCase()}-listbox"
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
    <ul id="combobox-${id.toLowerCase()}-listbox" class="combobox__list" role="listbox" aria-label="${label}" data-type="${id.toLowerCase()}">
      ${comboboxElems}
    </ul>`;

    return comboboxList;
  }

  /**
   * Create the list items
   * @returns All LI elements inside an HTML string
   */
  function getComboboxItems() {
    const comboboxElems = data
      .map(
        (elem, i) =>
          `<li id="combobox-${id.toLowerCase()}-${i}" class="combobox__item" role="option">${elem}</li>`
      )
      .join("");

    return comboboxElems;
  }

  return { getCombobox, getComboboxList, getComboboxItems };
}

export default comboboxTemplate;
