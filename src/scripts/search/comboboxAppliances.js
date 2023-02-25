import comboboxTemplate from "../templates/comboboxTemplate.js";
import { getAppliances } from "../api/api.js";
import comboboxInit from "../utils/combobox.js";

function comboboxAppliances() {
  function update(recipes) {
    const appliances = getAppliances(recipes);
    const comboboxAppliancesModel = comboboxTemplate(appliances, "Appliances");

    // Update items
    const comboboxAppliancesItemsHTML =
      comboboxAppliancesModel.getComboboxItems();
    const comboboxAppliancesListbox = document.getElementById(
      "combobox-appliances-listbox"
    );
    comboboxAppliancesListbox.innerHTML = comboboxAppliancesItemsHTML;
  }

  return { update };
}

export default comboboxAppliances;
