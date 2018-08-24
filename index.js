'use strict';

const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: false},
  {name: 'bread', checked: false}
];

function generateItemElement(item, itemIndex, template) {
  return `
  <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
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

function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  return shoppingList.map((item, itemIndex) => generateItemElement(item, itemIndex)).join('');

}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit('itemInputValue',  function(event){
    const itemInputValue= $('.js-shopping-list-entry').val();
    event.preventDefault();
    const itemObj = {
      name: itemInputValue,
      checked: false,
    };
    console.log(itemObj);
    STORE.push(itemObj);
    renderShoppingList();
    $('.js-shopping-list-entry').val(' ');

  } );
  console.log('`handleNewItemSubmit` ran');
}

function handleItemCheckClicked() {
  $('.js-item-toggle').on('click', function(event){
    const itemIndex =  $(this).closest('.js-item-index-element').find('.js-shopping-item').attr("data-item-index");
    console.log(itemIndex);
  });
  console.log("'handleItemCheckClicked' ran");
}

function handleDeleteItemClicked() {
  
  console.log('`handleDeleteItemClicked` ran');
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);