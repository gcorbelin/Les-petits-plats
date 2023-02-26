import truncateString from "../utils/truncate.js";

function recipeTemplate(data) {
  const { name, ingredients, time, description } = data;

  /**
   * Get full card
   * @returns recipe card node
   */
  function getRecipeCard() {
    // Get ingredients
    let ingredientsList = "";
    if (ingredients.length) {
      for (let i = 0; i < ingredients.length; i++) {
        const ingredient = ingredients[i];
        ingredientsList += `<li><strong>${ingredient.ingredient} ${
          ingredient.quantity ? ":" : ""
        }</strong> ${ingredient.quantity ? ingredient.quantity : ""} ${
          ingredient.unit ? ingredient.unit : ""
        }</li>`;
      }
    }

    let recipeCard = document.createElement("article");
    recipeCard.classList.add("card");
    const recipe = `
    <article class="card">
      <div class="card__header"></div>
      <div class="card__body">
        <div class="card__title">
          <h2>${name}</h2>
          <span class="card__timer">
            <i class="fa-regular fa-clock" aria-hidden="true"></i>
            ${time} min
          </span>
        </div>
        <div class="card__content">
          <ul>
            ${ingredientsList}
          </ul>
          <p>${truncateString(description, 175)}</p>
        </div>
      </div>
    </article>
    `;

    recipeCard.innerHTML = recipe;

    return recipeCard;
  }

  return { getRecipeCard };
}

export default recipeTemplate;
