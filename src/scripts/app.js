/* eslint-disable no-shadow */
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
import tagTemplate from "./templates/tagTemplate.js";
import comboboxInit from "./utils/combobox.js";

// Get all elements from datas
const recipes = getDatas();
const ingredients = getIngredients(recipes);
const appliances = getAppliances(recipes);
const ustensils = getUstensils(recipes);

// Initialize search params
const searchParams = {
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
const tagWrapper = document.getElementById("js-tags-wrapper");

/**
 * Append recipes in wrapper based on global filteredRecipes Array
 */
function displayRecipes() {
  recipeWrapper.innerHTML = "";

  if (filteredRecipes.length) {
    filteredRecipes.forEach((recipe) => {
      const tpl = recipeTemplate(recipe);
      const card = tpl.getRecipeCard();
      recipeWrapper.appendChild(card);
    });
  } else {
    // Display empty message if none
    recipeWrapper.innerHTML =
      "<p class='empty-message'>Aucune recette ne correspond à votre critère… Vous pouvez chercher «&nbsp;tarte aux pommes&nbsp;», «&nbsp;poisson&nbsp;», etc.</p>";
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
  recipe.ingredients.forEach((ingredient) => {
    if (ingredient.ingredient.toLowerCase().includes(searchParams.label)) {
      hasIngredient = true;
    }
  });
  return hasIngredient;
}

/**
 * Filter recipes based on searchParams value
 * First we check content based on searchParams "label"
 * Then we check tags based on searchParams "ingredients"
 * Then we check tags based on searchParams "appliances"
 * Lastly we check tags based on searchParams "ustensils"
 */
function searchRecipes() {
  const tmpRecipes = [];
  recipes.forEach((recipe) => {
    // First check: label is contained in Title, ingredients or description
    const isLabelValid =
      recipeHasName(recipe) ||
      recipeHasDescription(recipe) ||
      recipeHasIngredient(recipe);

    // Second check: All ingredients tags are contained in recipe's Ingredients list
    let isIngredientValid = true;
    const { ingredients } = searchParams;
    ingredients.forEach((tag) => {
      const hasTagInIngredients = recipe.ingredients.some(
        (ingredient) => ingredient.ingredient.toLowerCase() === tag
      );
      if (!hasTagInIngredients) {
        isIngredientValid = false;
      }
    });

    // Third check: All appliances tags are contained in recipe's Appliances list
    let isApplianceValid = true;
    const { appliances } = searchParams;
    appliances.forEach((tag) => {
      let hasTagInAppliances = false;
      if (recipe.appliance.toLowerCase() === tag) {
        hasTagInAppliances = true;
      }
      if (!hasTagInAppliances) {
        isApplianceValid = false;
      }
    });

    // Fourth check: All ustensils tags are contained in recipe's Ustensils list
    let isUstensilValid = true;
    const { ustensils } = searchParams;
    ustensils.forEach((tag) => {
      const hasTagInUstensils = recipe.ustensils.some(
        (ustensil) => ustensil.toLowerCase() === tag
      );
      if (!hasTagInUstensils) {
        isUstensilValid = false;
      }
    });

    // Add all conditions
    if (
      isLabelValid &&
      isIngredientValid &&
      isApplianceValid &&
      isUstensilValid
    ) {
      tmpRecipes.push(recipe);
    }
  });
  filteredRecipes = tmpRecipes;
  displayRecipes();
}

/**
 * Listen to the main search input to save its value in searchParams
 */
function bindSearchInput() {
  searchInput.addEventListener("keyup", (event) => {
    const { value } = event.target;
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
    {
      values: ingredients,
      id: "Ingredients",
      label: "Ingrédients",
      placeholder: "Rechercher un ingrédient",
    },
    {
      values: appliances,
      id: "Appliances",
      label: "Appareils",
      placeholder: "Rechercher un appareil",
    },
    {
      values: ustensils,
      id: "Ustensils",
      label: "Ustensils",
      placeholder: "Rechercher un ustensil",
    },
  ];

  comboboxes.forEach((tmpCombobox) => {
    const model = comboboxTemplate(
      tmpCombobox.values,
      tmpCombobox.id,
      tmpCombobox.label,
      tmpCombobox.placeholder
    );
    const HTML = model.getCombobox();
    comboboxesWrapper.appendChild(HTML);
  });
}

/**
 * Listen to LI elements click events to add a new tag containing its label and type
 * Also update the searchParams object by adding the label inside the right array
 * @param {node} list Parent UL
 * @param {node} item Clicked LI
 */
function addTag(list, item) {
  const content = item.innerHTML;
  const type = list.getAttribute("data-type");

  // Check if the clicked element already exists inside the searchParams Object
  if (!searchParams[type].find((tag) => tag === content)) {
    // Add the tag inside the searchParams Object
    searchParams[type].push(content);

    // Then create a tag button that can be removed
    const tagModel = tagTemplate(content, type);
    const tag = tagModel.getTag();
    tagWrapper.appendChild(tag);

    // Search with updated searchParams
    searchRecipes();
  }
}

/**
 * Listen to tags elements click events to remove them from the DOM
 * Also update the searchParams object by removing the label inside the right array
 * @param {node} button clicked button element
 */
function removeTag(button) {
  const content = button.querySelector(".tag__content").innerHTML;
  const type = button.getAttribute("data-type");
  // Remove label from searchParams Object
  searchParams[type] = searchParams[type].filter((param) => param !== content);

  // Then remove the tag from the DOM
  tagWrapper.removeChild(button);

  // Search with updated searchParams
  searchRecipes();
}

/**
 * Subscribe to the Search Subject for each combobox
 * Also add an event listener on the lists (and not on the LI Elements as they are dynamically added or removed)
 */
function bindCombobox() {
  // Set up observers
  const ingredientsObs = comboboxIngredients();
  searchSub.subscribe(ingredientsObs);
  const appliancesObs = comboboxAppliances();
  searchSub.subscribe(appliancesObs);
  const ustensilsObs = comboboxUstensils();
  searchSub.subscribe(ustensilsObs);
  // Add event listeners on the lists
  const comboboxLists = document.querySelectorAll(".combobox__list");
  comboboxLists.forEach((list) => {
    list.addEventListener("click", (event) => {
      // Identify if the clicked element is a LI Element
      if (event.target.nodeName === "LI") {
        const list = event.currentTarget;
        const item = event.target;
        addTag(list, item);
      }
    });
  });
}

/**
 * Add an event listener inside the tag wrapper Element
 * Identify if the clicked element is a button (or inside a button) so it can be removed
 */
function bindTags() {
  tagWrapper.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) {
      removeTag(button);
    }
  });
}

function init() {
  comboboxFill();
  comboboxInit();
  bindCombobox();
  displayRecipes();
  bindSearchInput();
  bindTags();
}

init();

// eslint-disable-next-line no-undef
const suite = new Benchmark.Suite();

// add tests
suite
  .add("getIngredients", () => {
    getIngredients(recipes);
  })
  .add("getAppliances", () => {
    getAppliances(recipes);
  })
  .add("getUstensils", () => {
    getUstensils(recipes);
  })
  // add listeners
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(`Fastest is ${this.filter("fastest").map("name")}`);
  })
  // run async
  .run({ async: true });
