import comboboxTemplate from "../templates/comboboxTemplate.js";
import { getIngredients } from "../api/api.js";
import comboboxInit from "../utils/combobox.js";

function comboboxIngredients() {
  function update(recipes) {
    const ingredients = getIngredients(recipes);
    const comboboxIngredientsModel = comboboxTemplate(
      ingredients,
      "Ingredients"
    );

    // Update items
    const comboboxIngredientsItemsHTML =
      comboboxIngredientsModel.getComboboxItems();
    const comboboxIngredientsListbox = document.getElementById(
      "combobox-ingredients-listbox"
    );
    comboboxIngredientsListbox.innerHTML = comboboxIngredientsItemsHTML;
  }

  return { update };
}

export default comboboxIngredients;
