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
  resourceList.innerHTML = "";
  for (const [resource, amount] of Object.entries(resources)) {
    const div = document.createElement("div");
    div.textContent = `${resource}: ${amount}`;
    const gatherButton = document.createElement("button");
    gatherButton.textContent = `Gather ${resource}`;
    gatherButton.onclick = () => {
      resources[resource]++;
      updateResources();
    };
    div.appendChild(gatherButton);
    resourceList.appendChild(div);
  }
}

// Helper Function: Update Recipes UI
function updateRecipes() {
  recipeList.innerHTML = "";
  recipes.forEach((recipe) => {
    const div = document.createElement("div");
    div.textContent = recipe.name;

    const craftButton = document.createElement("button");
    craftButton.textContent = "Craft";
    craftButton.disabled = !canCraft(recipe);

    craftButton.onclick = () => {
      craftItem(recipe);
    };

    div.appendChild(craftButton);
    recipeList.appendChild(div);
  });
}

// Helper Function: Update Inventory UI
function updateInventory() {
  inventoryList.innerHTML = "";
  inventory.forEach((item) => {
    const div = document.createElement("div");
    div.textContent = item;
    inventoryList.appendChild(div);
  });
}

// Check if Player Can Craft a Recipe
function canCraft(recipe) {
  for (const [resource, cost] of Object.entries(recipe.cost)) {
    if (resources[resource] < cost) return false;
  }
  return true;
}

// Craft an Item
function craftItem(recipe) {
  for (const [resource, cost] of Object.entries(recipe.cost)) {
    resources[resource] -= cost;
  }
  inventory.push(recipe.name);
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
