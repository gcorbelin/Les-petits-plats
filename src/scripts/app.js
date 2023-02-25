import {
  getDatas,
  getIngredients,
  getAppliances,
  getUstensils,
} from "./api/api.js";
import comboboxAppliances from "./search/comboboxAppliances.js";
import comboboxIngredients from "./search/comboboxIngredients.js";
import comboboxUstensils from "./search/comboboxUstensils.js";
import searchSubject from "./search/subject.js";
import comboboxTemplate from "./templates/comboboxTemplate.js";
import recipeTemplate from "./templates/recipeTemplate.js";
import comboboxInit from "./utils/combobox.js";

const recipes = getDatas();

let filteredRecipes = recipes;
const ingredients = getIngredients(filteredRecipes);
const appliances = getAppliances(filteredRecipes);
const ustensils = getUstensils(filteredRecipes);

let searchParams = {
  label: "",
  ingredients: [],
  appliances: [],
  ustensils: [],
};

const searchSub = searchSubject();

const recipeWrapper = document.querySelector(".js-recipes-wrapper");
const searchInput = document.getElementById("input-search");
const comboboxesWrapper = document.getElementById("js-combobox-wrapper");

function displayRecipes() {
  recipeWrapper.innerHTML = "";
  if (filteredRecipes.length) {
    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];
      const tpl = recipeTemplate(recipe);
      const card = tpl.getRecipeCard();
      recipeWrapper.appendChild(card);
    }
  } else {
    recipeWrapper.innerHTML =
      "<p>Aucune recette ne correspond à votre critère… Vous pouvez chercher «&nbsp;tarte aux pommes&nbsp;», «&nbsp;poisson&nbsp;», etc.</p>";
  }

  searchSub.fire(filteredRecipes);
}

function recipeHasName(recipe) {
  let hasTitle = false;
  if (recipe.name.toLowerCase().includes(searchParams.label)) {
    hasTitle = true;
  }
  return hasTitle;
}

function recipeHasDescription(recipe) {
  let hasDescription = false;
  if (recipe.description.toLowerCase().includes(searchParams.label)) {
    hasDescription = true;
  }
  return hasDescription;
}

function recipeHasIngredient(recipe) {
  let hasIngredient = false;
  if (recipe.ingredients.length) {
    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ingredient = recipe.ingredients[i];
      if (ingredient.ingredient.toLowerCase().includes(searchParams.label)) {
        hasIngredient = true;
      }
    }
  }
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
      searchParams.label = value;
    } else {
      searchParams.label = "";
    }
    searchRecipes();
  });
}

function comboboxFill() {
  const comboboxes = [
    { values: ingredients, label: "Ingredients" },
    { values: appliances, label: "Appliances" },
    { values: ustensils, label: "Ustensils" },
  ];

  for (let i = 0; i < comboboxes.length; i++) {
    const tmpCombobox = comboboxes[i];
    const model = comboboxTemplate(tmpCombobox.values, tmpCombobox.label);
    const HTML = model.getCombobox();
    comboboxesWrapper.appendChild(HTML);
  }
}

function comboboxObservers() {
  const ingredientsObs = comboboxIngredients();
  searchSub.subscribe(ingredientsObs);
  const appliancesObs = comboboxAppliances();
  searchSub.subscribe(appliancesObs);
  const ustensilsObs = comboboxUstensils();
  searchSub.subscribe(ustensilsObs);
}

function init() {
  displayRecipes();
  comboboxFill();
  comboboxInit();
  comboboxObservers();
  bindSearchInput();
}

init();
