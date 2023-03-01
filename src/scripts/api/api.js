import recipes from "../../data/recipes.js";

function getDatas() {
  return recipes;
}

function getIngredients(recipes) {
  let allIngredients = [];
  // Check each recipe
  recipes.forEach((recipe) => {
    const ings = recipe.ingredients;
    // Check each ingredient
    ings.forEach((ing) => {
      // Add ingredient
      allIngredients.push(ing.ingredient.toLowerCase());
    });
  });
  // Filter duplicates
  const ingredients = [...new Set(allIngredients)];

  return ingredients;
}

function getAppliances(recipes) {
  let allAppliances = [];
  // Check each recipe
  recipes.forEach((recipe) => {
    allAppliances.push(recipe.appliance.toLowerCase());
  });
  const appliances = [...new Set(allAppliances)];

  return appliances;
}

function getUstensils(recipes) {
  let allUstensils = [];
  // Check each recipe
  recipes.forEach((recipe) => {
    const usts = recipe.ustensils;
    usts.forEach((ust) => {
      allUstensils.push(ust.toLowerCase());
    });
  });

  const ustensils = [...new Set(allUstensils)];

  return ustensils;
}

export { getDatas, getIngredients, getAppliances, getUstensils };
