import comboboxTemplate from "../templates/comboboxTemplate.js";
import { getIngredients } from "../api/api.js";

function comboboxIngredients() {
  function update(recipes) {
    const ingredients = getIngredients(recipes);
    const comboboxIngredientsModel = comboboxTemplate(
      ingredients,
      "ingredients",
      "Ingrédients",
      "Rechercher un ingrédient"
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
