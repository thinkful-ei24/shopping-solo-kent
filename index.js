'use strict';

const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: false},
  {name: 'bread', checked: false}
]

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  return `
    <li>apples</li>
    <li>oranges</li>
    <li>milk</li>
    <li>bread</li>
  `;
}

function renderShoppingList() {
  // For each item in STORE
    // the item name rendered as inner text;
    // the item's index in the STORE set as a data attribute on the <li> (more on that in a moment)
    // the item's checked state (true or false) rendered as the presence or absence of a CSS class for indicating checked items (specifically, .shopping-item__checked from index.css)

  // Join together the individual item strings into one long string
  // Insert the <li>s string inside the .js-shopping-list <ul> in the DOM.
  console.log('`renderShoppingList` ran');

  const shoppingListItemsString = generateShoppingItemsString(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
}

function handleNewItemSubmit() {
  console.log('`handleNewItemSubmit` ran');
}

function handleItemCheckClicked() {
  console.log('`handleItemCheckClicked` ran');
}

function handleDeleteItemClicked() {
  console.log('`handleDeleteItemClicked` ran')
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);