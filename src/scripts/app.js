import { getDatas } from "./api/api.js";
import recipeTemplate from "./templates/recipeTemplate.js";
import comboboxInit from "./utils/combobox.js";

const recipes = getDatas();

const recipeWrapper = document.querySelector(".js-recipes-wrapper");

function displayRecipes() {
  recipeWrapper.innerHTML = "";
  recipes.forEach((recipe) => {
    const tpl = recipeTemplate(recipe);
    const card = tpl.getRecipeCard();
    recipeWrapper.appendChild(card);
  });
}

function init() {
  displayRecipes();
  comboboxInit();
}

init();
