// Resources, Recipes, and Inventory Data
const resources = {
  wood: 0,
  stone: 0,
  iron: 0
};

const recipes = [
  { name: "Stone Axe", cost: { wood: 2, stone: 1 } },
  { name: "Iron Pickaxe", cost: { wood: 3, iron: 2 } },
  { name: "Campfire", cost: { wood: 5, stone: 3 } }
];

const inventory = [];

// DOM Elements
const resourceList = document.getElementById("resource-list");
const recipeList = document.getElementById("recipe-list");
const inventoryList = document.getElementById("inventory-list");

// Helper Function: Update Resources UI
function updateResources() {
  resourceList.innerHTML = ""; // Clear existing resource UI
  for (const [resource, amount] of Object.entries(resources)) {
    const div = document.createElement("div");
    div.textContent = `${resource}: ${amount}`;

    const gatherButton = document.createElement("button");
    gatherButton.textContent = `Gather ${resource}`;
    gatherButton.onclick = () => {
      resources[resource]++;
      updateResources();
      updateRecipes(); // Update crafting availability when resources change
    };

    div.appendChild(gatherButton);
    resourceList.appendChild(div);
  }
}

// Helper Function: Update Recipes UI
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

// Helper Function: Update Inventory UI
function updateInventory() {
  inventoryList.innerHTML = ""; // Clear existing inventory UI
  inventory.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    inventoryList.appendChild(div);
  });
}

// Check if Player Can Craft a Recipe
function canCraft(recipe) {
  for (const [resource, cost] of Object.entries(recipe.cost)) {
    const available = resources[resource] || 0; // Default to 0 if resource doesn't exist
    if (available < cost) return false; // Not enough resources
  }
  return true;
}

// Craft an Item
function craftItem(recipe) {
  // Deduct resources
  for (const [resource, cost] of Object.entries(recipe.cost)) {
    resources[resource] -= cost;
  }

  // Add crafted item to inventory
  inventory.push(recipe.name);

  // Update all UI elements
  updateResources();
  updateInventory();
  updateRecipes();
}

// Initialize Game
function initGame() {
  updateResources();
  updateRecipes();
  updateInventory();
}

initGame();
