import recipes from "../../data/recipes.js";

function getDatas() {
  return recipes;
}

function getIngredients() {
  const recipes = getDatas();
  let ingredients = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      let ingredientExists = false;
      if (ingredients.length) {
        for (let i = 0; i < ingredients.length; i++) {
          if (
            ingredients[i].toLowerCase() === ingredient.ingredient.toLowerCase()
          ) {
            ingredientExists = true;
          }
        }
      }
      if (!ingredientExists) {
        ingredients.push(ingredient.ingredient.toLowerCase());
      }
    });
  });

  return ingredients;
}

function getAppliance() {
  const recipes = getDatas();
  let appliances = [];
  recipes.forEach((recipe) => {
    let applianceExists = false;
    if (appliances.length) {
      for (let i = 0; i < appliances.length; i++) {
        if (appliances[i].toLowerCase() === recipe.appliance.toLowerCase()) {
          applianceExists = true;
        }
      }
    }
    if (!applianceExists) {
      appliances.push(recipe.appliance.toLowerCase());
    }
  });

  return appliances;
}

function getUstensils() {
  const recipes = getDatas();
  let ustensils = [];
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      let ingredientExists = false;
      if (ustensils.length) {
        for (let i = 0; i < ustensils.length; i++) {
          if (ustensils[i].toLowerCase() === ustensil.toLowerCase()) {
            ingredientExists = true;
          }
        }
      }
      if (!ingredientExists) {
        ustensils.push(ustensil.toLowerCase());
      }
    });
  });

  return ustensils;
}

export { getDatas, getIngredients, getAppliance, getUstensils };
