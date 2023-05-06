const input = document.getElementById("new-item-input");
const addButton = document.getElementById("add-item-button");
const filterButton = document.getElementById("filter-button");
const clearFilterButton = document.getElementById("clear-filter-button");
const itemList = document.getElementById("item-list");

let items = [];

function addItem() {
  const newItem = input.value.trim();

  if (newItem !== "") {
    items.push({name: newItem, completed: false});
    input.value = "";
    renderItems();
  }
}

function renderItems() {
  itemList.innerHTML = "";

  let filteredItems = items;

  if (filterButton.dataset.filter === "completed") {
    filteredItems = items.filter(item => item.completed);
  } else if (filterButton.dataset.filter === "uncompleted") {
    filteredItems = items.filter(item => !item.completed);
  }

  filteredItems.sort((a, b) => a.name.localeCompare(b.name));

  filteredItems.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = item.name;

    const completedButton = document.createElement("button");
    completedButton.classList.add("completed-button");
    completedButton.innerHTML = "&#10003;";
    completedButton.addEventListener("click", () => {
      item.completed = !item.completed;
      renderItems();
    });

    if (item.completed) {
      listItem.classList.add("completed");
    }

    listItem.appendChild(completedButton);
    itemList.appendChild(listItem);
  });
}

function clearFilter() {
  filterButton.dataset.filter = "all";
  renderItems();
}

addButton.addEventListener("click", addItem);

filterButton.addEventListener("click", () => {
  if (filterButton.dataset.filter === "all") {
    filterButton.dataset.filter = "uncompleted";
  } else if (filterButton.dataset.filter === "uncompleted") {
    filterButton.dataset.filter = "completed";
  } else {
    filterButton.dataset.filter = "all";
  }
  renderItems();
});

clearFilterButton.addEventListener("click", clearFilter);

input.addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addButton.click();
  }
});

renderItems();
