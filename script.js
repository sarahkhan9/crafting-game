
// Game state
const resources = { wood: 0, stone: 0, iron: 0 };
const recipes = [
  { name: "Axe", cost: { wood: 3, stone: 2 } },
  { name: "Pickaxe", cost: { wood: 2, iron: 4 } },
  { name: "Hammer", cost: { wood: 5, stone: 3, iron: 2 } }
];
let selectedRecipe = null;
const inventory = [];

// Sound effects
const gatherSound = new Audio("gather.mp3");
const craftSound = new Audio("craft.mp3");

// DOM elements
const resourcesDiv = document.getElementById("resources");
const recipesDiv = document.getElementById("recipes");
const inventoryDiv = document.getElementById("inventory");
const craftButton = document.getElementById("craftButton");

// Update UI for resources
function updateResources() {
  resourcesDiv.innerHTML = "";
  Object.keys(resources).forEach(resource => {
    const button = document.createElement("button");
    button.textContent = `${resource}: ${resources[resource]}`;
    button.onclick = () => {
      resources[resource]++;
      gatherSound.play(); // Play gather sound
      button.classList.add("bounce"); // Bounce animation
      setTimeout(() => button.classList.remove("bounce"), 300);
      updateResources();
      updateRecipes();
    };
    resourcesDiv.appendChild(button);
  });
}

// Update UI for recipes
function updateRecipes() {
  recipesDiv.innerHTML = "";
  recipes.forEach(recipe => {
    const div = document.createElement("div");
    const canCraft = Object.keys(recipe.cost).every(
      resource => resources[resource] >= recipe.cost[resource]
    );

    div.textContent = `${recipe.name} (Cost: ${Object.entries(recipe.cost)
      .map(([resource, amount]) => `${amount} ${resource}`)
      .join(", ")})`;

    div.style.color = canCraft ? "green" : "red";
    div.onclick = () => {
      selectedRecipe = recipe;
      updateRecipes();
      craftButton.disabled = !canCraft;
    };

    if (recipe === selectedRecipe) {
      div.style.fontWeight = "bold";
    }

    recipesDiv.appendChild(div);
  });
}

// Craft the selected recipe
craftButton.onclick = () => {
  if (selectedRecipe) {
    Object.keys(selectedRecipe.cost).forEach(resource => {
      resources[resource] -= selectedRecipe.cost[resource];
    });
    inventory.push(selectedRecipe.name);
    craftSound.play(); // Play crafting sound
    updateResources();
    updateRecipes();
    updateInventory();
  }
};

// Update UI for inventory
function updateInventory() {
  inventoryDiv.innerHTML = "";
  inventory.forEach((item, index) => {
    const div = document.createElement("div");
    div.textContent = item;

    // Add fade-in animation for the newest item
    if (index === inventory.length - 1) {
      div.classList.add("fade-in");
    }

    inventoryDiv.appendChild(div);
  });
}

// Initialize game
updateResources();
updateRecipes();
updateInventory();

