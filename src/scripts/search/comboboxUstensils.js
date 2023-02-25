import comboboxTemplate from "../templates/comboboxTemplate.js";
import { getUstensils } from "../api/api.js";

function comboboxUstensils() {
  function update(recipes) {
    const ustensils = getUstensils(recipes);
    const comboboxUstensilsModel = comboboxTemplate(ustensils, "Ustensils");

    // Update items
    const comboboxUstensilsItemsHTML =
      comboboxUstensilsModel.getComboboxItems();
    const comboboxUstensilsListbox = document.getElementById(
      "combobox-ustensils-listbox"
    );
    comboboxUstensilsListbox.innerHTML = comboboxUstensilsItemsHTML;
  }

  return { update };
}

export default comboboxUstensils;
