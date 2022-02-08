import './style.css'

// const app = document.querySelector<HTMLDivElement>('#app')!


type Items = {
  id: number,
  name: string,
  price: number

};

type Cart = {
  id: number,
  name: string,
  price: number
  quantity: number
};


const state: {
  items: Items[],
  cart: Cart[]
} = {
  items: [
    {
      id: 1,
      name: 'beetroot',
      price: 0.35
    },
    {
      id: 2,
      name: 'carrot',
      price: 0.35
    },
    {
      id: 3,
      name: 'apple',
      price: 0.35
    },
    {
      id: 4,
      name: 'apricot',
      price: 0.35
    },
    {
      id: 5,
      name: 'avocado',
      price: 0.35
    },
    {
      id: 6,
      name: 'bananas',
      price: 0.35
    },
    {
      id: 7,
      name: 'bell pepper',
      price: 0.35
    },
    {
      id: 8,
      name: 'berry',
      price: 0.35
    },
    {
      id: 9,
      name: 'blueberry',
      price: 0.35
    },
    {
      id: 10,
      name: 'eggplant',
      price: 0.35
    }
  ],
  cart: []
}


const storeItemList: HTMLUListElement | null = document.querySelector('.store--item-list')
const cartItemList: HTMLUListElement | null = document.querySelector('.cart--item-list')
const totalNumber: HTMLSpanElement | null = document.querySelector('.total-number')



function getFileName(item: Items): string {
  const fileName = `${item.id
    .toString()
    .padStart(3, '0')}-${item.name.replaceAll(' ', '-')}`

  return `src/assets/icons/${fileName}.svg`
}

/* STATE ACTIONS */

function addItemToCart(itemId: number) {
  const existingItem = state.cart.find(item => item.id == itemId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    const itemToAdd = state.items.find(item => item.id == itemId)
    if (itemToAdd !== undefined)
      state.cart.push({ ...itemToAdd, quantity: 1 })
  }

  renderCartItems()
}

function removeItemFromCart(itemID: number) {
  const itemToUpdate = state.cart.find(item => item.id == itemID)

  if (itemToUpdate && itemToUpdate.quantity > 1) {
    itemToUpdate.quantity -= 1
  } else {
    state.cart = state.cart.filter(item => item.id != itemID)
  }

  renderCartItems()
}

/* RENDER THE STORE */


function renderStoreItem(item: Items): void {
  const listItemEl: HTMLLIElement = document.createElement('li')

  listItemEl.innerHTML = `
    <div class="store--item-icon">
      <img src=${getFileName(item)} alt="${item.name}">
    </div>
    <button>Add to cart</button>
  `

  const addBtn: HTMLButtonElement | null = listItemEl.querySelector('button')
  if (addBtn !== null)
    addBtn.addEventListener('click', () => addItemToCart(item.id))

  if (storeItemList !== null)
    storeItemList.appendChild(listItemEl)
}

function renderStoreItems(): void {
  state.items.forEach(renderStoreItem)
}

renderStoreItems()

/* RENDER THE CART */


function renderCartItem(item: Cart) {
  const listItemEl: HTMLLIElement = document.createElement('li')

  listItemEl.innerHTML = `
    <img class="cart--item-icon" src=${getFileName(item)} alt="${item.name}">
    <p>${item.name}</p>
    <button class="quantity-btn remove-btn center">-</button>
    <span class="quantity-text center">${item.quantity}</span>
    <button class="quantity-btn add-btn center">+</button>
  `

  const addBtn: HTMLButtonElement | null = listItemEl.querySelector('.add-btn')
  if (addBtn !== null)
    addBtn.addEventListener('click', event => addItemToCart(item.id))

  const removeBtn: HTMLButtonElement | null = listItemEl.querySelector('.remove-btn')
  if (removeBtn !== null)
    removeBtn.addEventListener('click', event => removeItemFromCart(item.id))

  if (cartItemList !== null)
    cartItemList.appendChild(listItemEl)
}

function renderCartItems(): void {
  if (cartItemList !== null)
    cartItemList.innerHTML = ''

  state.cart.forEach(renderCartItem)

  renderTotal()
}

/* RENDER THE TOTAL */


function renderTotal(): void {
  let total = 0

  state.cart.forEach(item => (total += item.quantity * item.price))

  if (totalNumber !== null)
    totalNumber.innerText = `£${total.toFixed(2)}`
}

