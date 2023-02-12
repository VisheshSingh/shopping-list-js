const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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

// Event Listeners
itemForm.addEventListener('submit', addItem);
