'use strict';

const STORE = {
  items: [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  checked: false,
  search: ''
};

function generateItemElement(item, itemIndex) {
  return `
  <li class="js-item-index-element" data-item-index="${itemIndex}">
      <input type="text" class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}" value="${item.name}">
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
  </li>`;
}

function generateShoppingItemsString(shoppingList) {
  return shoppingList.map((item) => generateItemElement(item, item.index)).join('');
}

function renderShoppingList() {
  let viewItems = STORE.items.map((item, index) => { return {...item, index}; });
  if (viewItems.length) viewItems = viewItems.filter(item => item.name.toLowerCase().includes(STORE.search.toLowerCase()));
  if (STORE.checked) viewItems = viewItems.filter(item => !item.checked);

  const shoppingListItemsString = generateShoppingItemsString(viewItems);
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    const itemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(itemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteItemFromList(itemIndex) {
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItemFromList(itemIndex);
    renderShoppingList();
  });
}
function changeCheckbox(checked) {
  $('.js-shopping-list-filter').attr('value', checked);
  STORE.checked = checked;
}

function handleFilterCheckboxClicked() {
  $('#js-shopping-list-form').on('change', 'input[type="checkbox"]', function() {
    const checked = this.checked;
    changeCheckbox(checked);
    renderShoppingList();
  });
}

function changeSearch(search) {
  STORE.search = search;
}

function handleSearchTyped() {
  $('#js-shopping-list-form').on('input propertychange paste', '.js-shopping-list-search', function() {
    const search = $(this).val();
    changeSearch(search);
    renderShoppingList();
  });
}

function changeItemName(itemName, itemIndex) {
  STORE.items[itemIndex].name = itemName;
}

function handleItemEdited() {
  $('.js-shopping-list').on('input propertychange paste', '.js-shopping-item', function() {
    const name = this.value;
    const index = getItemIndexFromElement(this);
    changeItemName(name, index);
  });
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleFilterCheckboxClicked();
  handleSearchTyped();
  handleItemEdited();
}

$(handleShoppingList);