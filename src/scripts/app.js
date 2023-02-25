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

// Get all elements from datas
const recipes = getDatas();
const ingredients = getIngredients(recipes);
const appliances = getAppliances(recipes);
const ustensils = getUstensils(recipes);

// Initialize search params
let searchParams = {
  label: "",
  ingredients: [],
  appliances: [],
  ustensils: [],
};

// Initialize global filtered recipes array
let filteredRecipes = recipes;

// Initialize Search Subject
const searchSub = searchSubject();

// Define DOM elements
const recipeWrapper = document.querySelector(".js-recipes-wrapper");
const searchInput = document.getElementById("input-search");
const comboboxesWrapper = document.getElementById("js-combobox-wrapper");

/**
 * Append recipes in wrapper based on global filteredRecipes Array
 */
function displayRecipes() {
  recipeWrapper.innerHTML = "";

  if (filteredRecipes.length) {
    // Display cards if any
    for (let i = 0; i < filteredRecipes.length; i++) {
      const recipe = filteredRecipes[i];
      const tpl = recipeTemplate(recipe);
      const card = tpl.getRecipeCard();
      recipeWrapper.appendChild(card);
    }
  } else {
    // Display empty message if none
    recipeWrapper.innerHTML =
      "<p>Aucune recette ne correspond à votre critère… Vous pouvez chercher «&nbsp;tarte aux pommes&nbsp;», «&nbsp;poisson&nbsp;», etc.</p>";
  }

  // Trigger Search Observers actions
  searchSub.fire(filteredRecipes);
}

/**
 * Check if given Recipe has the "label" search param in its Name
 * @param {Object} recipe
 * @returns Boolean
 */
function recipeHasName(recipe) {
  let hasTitle = false;
  if (recipe.name.toLowerCase().includes(searchParams.label)) {
    hasTitle = true;
  }
  return hasTitle;
}

/**
 * Check if given Recipe has the "label" search param in its Description
 * @param {Object} recipe
 * @returns Boolean
 */
function recipeHasDescription(recipe) {
  let hasDescription = false;
  if (recipe.description.toLowerCase().includes(searchParams.label)) {
    hasDescription = true;
  }
  return hasDescription;
}

/**
 * Check if given Recipe has the "label" search param in its Ingredients
 * @param {Object} recipe
 * @returns Boolean
 */
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

/**
 * Filter recipes based on searchParams value
 * First we check content based on searchParams "label"
 * Then we check tags based on searchParams "ingredients"   TODO
 * Then we check tags based on searchParams "appliances"    TODO
 * Lastly we check tags based on searchParams "ustensils"   TODO
 */
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
  // TODO Add search by tags
  displayRecipes();
}

/**
 * Listen to the main search input to save its value in searchParams
 */
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

/**
 * Create comboboxes contents
 */
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

/**
 * Subscribe to the Search Subject for each combobox
 */
function comboboxObservers() {
  const ingredientsObs = comboboxIngredients();
  searchSub.subscribe(ingredientsObs);
  const appliancesObs = comboboxAppliances();
  searchSub.subscribe(appliancesObs);
  const ustensilsObs = comboboxUstensils();
  searchSub.subscribe(ustensilsObs);
}

function init() {
  comboboxFill();
  comboboxInit();
  comboboxObservers();
  displayRecipes();
  bindSearchInput();
}

init();
