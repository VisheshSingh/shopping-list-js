const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAllBtn = document.getElementById('clear');
const filterElement = document.querySelector('.filter');
const filterInput = document.getElementById('filter');

function saveToStorage(item) {
  let itemStorage = getItemsFromStorage();

  itemStorage.push(item);
  // add items to localStorage
  localStorage.setItem('items', JSON.stringify(itemStorage));
}

function getItemsFromStorage() {
  let itemStorage;
  if (localStorage.getItem('items') === null) {
    itemStorage = [];
  } else {
    itemStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemStorage;
}

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please add an item!');
    return;
  }

  addItemToDOM(newItem);
  saveToStorage(newItem);
  itemInput.value = '';
}

function addItemToDOM(item) {
  const listItem = createListItem(item);
  const button = createButton('remove-item btn-link text-red');
  listItem.appendChild(button);
  itemList.appendChild(listItem);
  checkUI();
}

function createListItem(newItem) {
  const li = document.createElement('li');
  const listNode = document.createTextNode(newItem);
  li.appendChild(listNode);
  return li;
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function removeItem(e) {
  if (e.target.classList.contains('fa-xmark')) {
    const listItem = e.target.closest('li');
    // listItem.remove();
    itemList.removeChild(listItem);
    const items = JSON.parse(localStorage.getItem('items'));
    const remainingItems = items.filter(
      (item) => item !== listItem.firstChild.textContent
    );
    localStorage.setItem('items', JSON.stringify([...remainingItems]));
    checkUI();
  }
}

function clearAllItems() {
  //   itemList.innerHTML = '';
  while (itemList.firstElementChild) {
    itemList.removeChild(itemList.firstElementChild);
  }
  localStorage.removeItem('items');
  checkUI();
}

function checkUI() {
  const items = document.querySelectorAll('li');
  if (items.length === 0) {
    filterElement.style.display = 'none';
    clearAllBtn.style.display = 'none';
  } else {
    filterElement.style.display = 'block';
    clearAllBtn.style.display = 'block';
  }
}

function filterItems(e) {
  const userInput = e.target.value;
  const items = document.querySelectorAll('li');
  items.forEach((item) => {
    const itemName = item.firstChild.textContent;
    if (itemName.indexOf(userInput) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

function displayItems() {
  const items = getItemsFromStorage();
  items.forEach((item) => addItemToDOM(item));
}

// Event Listeners
function init() {
  itemForm.addEventListener('submit', addItem);
  itemList.addEventListener('click', removeItem);
  clearAllBtn.addEventListener('click', clearAllItems);
  filterInput.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();
