import {
  getDatas,
  getIngredients,
  getAppliance,
  getUstensils,
} from "./api/api.js";
import comboboxTemplate from "./templates/comboboxTemplate.js";
import recipeTemplate from "./templates/recipeTemplate.js";
import comboboxInit from "./utils/combobox.js";

const recipes = getDatas();
const ingredients = getIngredients();
const appliances = getAppliance();
const ustensils = getUstensils();

let filteredRecipes = recipes;
let globalSearch = "";

const recipeWrapper = document.querySelector(".js-recipes-wrapper");
const searchInput = document.getElementById("input-search");
const comboboxIngredients = document.getElementById("combobox-ingredients");
const comboboxAppliances = document.getElementById("combobox-appliances");
const comboboxUstensils = document.getElementById("combobox-ustensils");

function displayRecipes() {
  recipeWrapper.innerHTML = "";
  filteredRecipes.forEach((recipe) => {
    const tpl = recipeTemplate(recipe);
    const card = tpl.getRecipeCard();
    recipeWrapper.appendChild(card);
  });
}

function recipeHasName(recipe) {
  let hasTitle = false;
  if (recipe.name.toLowerCase().includes(globalSearch)) {
    hasTitle = true;
  }
  return hasTitle;
}

function recipeHasDescription(recipe) {
  let hasDescription = false;
  if (recipe.description.toLowerCase().includes(globalSearch)) {
    hasDescription = true;
  }
  return hasDescription;
}

function recipeHasIngredient(recipe) {
  let hasIngredient = false;
  recipe.ingredients.forEach((ingredient) => {
    if (ingredient.ingredient.toLowerCase().includes(globalSearch)) {
      hasIngredient = true;
    }
  });
  return hasIngredient;
}

function searchRecipes() {
  let tmpRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    if (
      recipeHasName(recipes[i]) ||
      recipeHasDescription(recipes[i]) ||
      recipeHasIngredient(recipes[i])
    ) {
      tmpRecipes.push(recipes[i]);
    }
  }
  filteredRecipes = tmpRecipes;
  displayRecipes();
}

function bindSearchInput() {
  searchInput.addEventListener("keyup", (event) => {
    const value = event.target.value;
    if (value.length >= 3) {
      globalSearch = value;
    } else {
      globalSearch = "";
    }
    searchRecipes();
  });
}

function comboboxFill() {
  const comboboxIngredientsModel = comboboxTemplate(ingredients, "Ingredients");
  const comboboxIngredientsHTML = comboboxIngredientsModel.getComboboxList();
  comboboxIngredients.appendChild(comboboxIngredientsHTML);

  const comboboxAppliancesModel = comboboxTemplate(appliances, "Appliances");
  const comboboxAppliancesHTML = comboboxAppliancesModel.getComboboxList();
  comboboxAppliances.appendChild(comboboxAppliancesHTML);

  const comboboxUstensilsModel = comboboxTemplate(ustensils, "Ustensils");
  const comboboxUstensilsHTML = comboboxUstensilsModel.getComboboxList();
  comboboxUstensils.appendChild(comboboxUstensilsHTML);
}

function init() {
  displayRecipes();
  comboboxFill();
  comboboxInit();
  bindSearchInput();
}

init();
