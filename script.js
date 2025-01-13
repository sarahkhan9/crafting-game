function updateRecipes() {
  recipeList.innerHTML = ""; // Clear existing recipe UI
  recipes.forEach((recipe) => {
    const div = document.createElement("div");
    div.textContent = recipe.name;

    const costText = Object.entries(recipe.cost)
      .map(([resource, cost]) => `${cost} ${resource}`)
      .join(", ");
    const costInfo = document.createElement("p");
    costInfo.textContent = `Cost: ${costText}`;
    div.appendChild(costInfo);

    const craftButton = document.createElement("button");
    craftButton.textContent = "Craft";

    // Check if the button should be enabled or disabled
    if (canCraft(recipe)) {
      craftButton.disabled = false;
    } else {
      craftButton.disabled = true;
    }

    craftButton.onclick = () => {
      craftItem(recipe);
    };

    div.appendChild(craftButton);
    recipeList.appendChild(div);
  });
}
