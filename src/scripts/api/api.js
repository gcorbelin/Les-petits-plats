import recipes from "../../data/recipes.js";

function getDatas() {
  return recipes;
}

function getIngredients(recipes) {
  let ingredients = [];
  // Check each recipe
  if (recipes && recipes.length) {
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      // Check each ingredient
      if (recipe.ingredients.length) {
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j];
          let ingredientExists = false;
          // Compare to each ingredient already saved
          if (ingredients.length) {
            for (let i = 0; i < ingredients.length; i++) {
              if (
                ingredients[i].toLowerCase() ===
                ingredient.ingredient.toLowerCase()
              ) {
                ingredientExists = true;
              }
            }
          }
          // Add only if not saved
          if (!ingredientExists) {
            ingredients.push(ingredient.ingredient.toLowerCase());
          }
        }
      }
    }
  }

  return ingredients;
}

function getAppliances(recipes) {
  let appliances = [];
  // Check each recipe
  if (recipes && recipes.length) {
    for (let i = 0; i < recipes.length; i++) {
      let applianceExists = false;
      // Compare to each appliance already saved
      if (appliances.length) {
        for (let j = 0; j < appliances.length; j++) {
          if (
            appliances[j].toLowerCase() === recipes[i].appliance.toLowerCase()
          ) {
            applianceExists = true;
          }
        }
      }
      // Add only if not saved
      if (!applianceExists) {
        appliances.push(recipes[i].appliance.toLowerCase());
      }
    }
  }

  return appliances;
}

function getUstensils(recipes) {
  let ustensils = [];
  // Check each recipe
  if (recipes && recipes.length) {
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      // Check each ustensil
      if (recipe.ustensils.length) {
        for (let j = 0; j < recipe.ustensils.length; j++) {
          const ustensil = recipe.ustensils[j];
          let ustensilExists = false;
          // Compare it to each ustensil already saved
          if (ustensils.length) {
            for (let k = 0; k < ustensils.length; k++) {
              if (ustensils[k].toLowerCase() === ustensil.toLowerCase()) {
                ustensilExists = true;
              }
            }
          }
          // Add only if not saved
          if (!ustensilExists) {
            ustensils.push(ustensil.toLowerCase());
          }
        }
      }
    }
  }

  return ustensils;
}

export { getDatas, getIngredients, getAppliances, getUstensils };
