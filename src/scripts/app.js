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
const tagWrapper = document.getElementById("js-tags-wrapper");

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
 * Then we check tags based on searchParams "ingredients"
 * Then we check tags based on searchParams "appliances"
 * Lastly we check tags based on searchParams "ustensils"
 */
function searchRecipes() {
  let tmpRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // First check: label is contained in Title, ingredients or description
    let isLabelValid =
      recipeHasName(recipes[i]) ||
      recipeHasDescription(recipes[i]) ||
      recipeHasIngredient(recipes[i]);

    // Second check: All ingredients tags are contained in recipe's Ingredients list
    let isIngredientValid = true;
    for (let j = 0; j < searchParams.ingredients.length; j++) {
      const tag = searchParams.ingredients[j];
      let hasTagInIngredients = false;
      for (let k = 0; k < recipe.ingredients.length; k++) {
        const ingredient = recipe.ingredients[k];
        if (ingredient.ingredient.toLowerCase() === tag) {
          hasTagInIngredients = true;
        }
      }
      if (!hasTagInIngredients) {
        isIngredientValid = false;
      }
    }

    // Third check: All appliances tags are contained in recipe's Appliances list
    let isApplianceValid = true;
    for (let j = 0; j < searchParams.appliances.length; j++) {
      const tag = searchParams.appliances[j];
      let hasTagInAppliances = false;
      if (recipe.appliance.toLowerCase() === tag) {
        hasTagInAppliances = true;
      }
      if (!hasTagInAppliances) {
        isApplianceValid = false;
      }
    }

    // Fourth check: All ustensils tags are contained in recipe's Ustensils list
    let isUstensilValid = true;
    for (let j = 0; j < searchParams.ustensils.length; j++) {
      const tag = searchParams.ustensils[j];
      let hasTagInUstensils = false;
      for (let k = 0; k < recipe.ustensils.length; k++) {
        const ustensil = recipe.ustensils[k];
        if (ustensil.toLowerCase() === tag) {
          hasTagInUstensils = true;
        }
      }
      if (!hasTagInUstensils) {
        isUstensilValid = false;
      }
    }

    // Add all conditions
    if (
      isLabelValid &&
      isIngredientValid &&
      isApplianceValid &&
      isUstensilValid
    ) {
      tmpRecipes.push(recipes[i]);
    }
  }
  filteredRecipes = tmpRecipes;
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

  for (let i = 0; i < comboboxes.length; i++) {
    const tmpCombobox = comboboxes[i];
    const model = comboboxTemplate(
      tmpCombobox.values,
      tmpCombobox.id,
      tmpCombobox.label,
      tmpCombobox.placeholder
    );
    const HTML = model.getCombobox();
    comboboxesWrapper.appendChild(HTML);
  }
}

/**
 * Listen to LI elements click events to add a new tag containing its label and type
 * Also update the searchParams object by adding the label inside the right array
 * @param {clickEvent} event
 */
function addTag(list, item) {
  const content = item.innerHTML;
  const type = list.getAttribute("data-type");

  // Check if the clicked element already exists inside the searchParams Object
  let tagExists = false;
  for (let i = 0; i < searchParams[type].length; i++) {
    if (searchParams[type][i] === content) {
      tagExists = true;
    }
  }

  if (!tagExists) {
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
  for (let i = 0; i < searchParams[type].length; i++) {
    if (searchParams[type][i] === content) {
      searchParams[type].splice(i, 1);
    }
  }

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
  for (let i = 0; i < comboboxLists.length; i++) {
    let list = comboboxLists[i];
    list.addEventListener("click", function (event) {
      // Identify if the clicked element is a LI Element
      if (event.target.nodeName === "LI") {
        const list = event.currentTarget;
        const item = event.target;
        addTag(list, item);
      }
    });
  }
}

/**
 * Add an event listener inside the tag wrapper Element
 * Identify if the clicked element is a button (or inside a button) so it can be removed
 */
function bindTags() {
  tagWrapper.addEventListener("click", function (event) {
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

var suite = new Benchmark.Suite();

// add tests
suite
  .add("getIngredients", function () {
    getIngredients(recipes);
  })
  .add("getAppliances", function () {
    getAppliances(recipes);
  })
  .add("getUstensils", function () {
    getUstensils(recipes);
  })
  // add listeners
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  // run async
  .run({ async: true });
