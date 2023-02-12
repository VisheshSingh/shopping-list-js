const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAllBtn = document.getElementById('clear');
const filterElement = document.querySelector('.filter');
const filterInput = document.getElementById('filter');

function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  if (newItem === '') {
    alert('Please add an item!');
    return;
  }

  const listItem = createListItem(newItem);
  const button = createButton('remove-item btn-link text-red');
  listItem.appendChild(button);
  itemList.appendChild(listItem);
  checkUI();
  itemInput.value = '';
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
    checkUI();
  }
}

function clearAllItems() {
  //   itemList.innerHTML = '';
  while (itemList.firstElementChild) {
    itemList.removeChild(itemList.firstElementChild);
  }
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

// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearAllBtn.addEventListener('click', clearAllItems);
filterInput.addEventListener('input', filterItems);

checkUI();
