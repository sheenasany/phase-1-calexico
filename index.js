//global variables
const menuDiv = document.querySelector('#menu-items')
const dishDiv = document.querySelector('#dish')
const cartForm = document.querySelector('#cart-form')
let cartNum = document.querySelector('#number-in-cart')
let globalCartNum = 0
let globalPrice = 0
let currentMenuItem = {}


// first challenge 
const menuUrl = "http://localhost:3000/menu"
fetch(menuUrl)
    .then(res => res.json())
    .then(data => {
        menuList(data)
        menuDisplay(data[0])
    })

function menuList(menuItems) {
    menuItems.map(menuItem => {
        const span = document.createElement('span') //don't forget to include the span in the map
        span.innerText = menuItem.name
        menuDiv.appendChild(span)
        // why does this need an anonymous function to run
        span.addEventListener('click', () => menuDisplay(menuItem))
    })
}

function menuDisplay(menuItem) {
    currentMenuItem = menuItem
    
    const img = document.querySelector('#dish-image')
    const name = document.querySelector('#dish-name')
    const description = document.querySelector('#dish-description')
    const price = document.querySelector('#dish-price')
    // console.log("Details", img, name, description, price)

    img.src = currentMenuItem.image
    name.textContent = currentMenuItem.name
    description.textContent = currentMenuItem.description
    price.textContent = `$${currentMenuItem.price}`
    // no need to append b/c the elements have already been created
}

cartForm.addEventListener("submit", (e) => {
    e.preventDefault()
    //handles the item num currently in the cart 
    let cartAmount = e.target["cart-amount"].value
    globalCartNum += parseInt(cartAmount)
    cartNum.textContent = globalCartNum
    
    //handles the value of the cart
    const cartTotal = document.querySelector("#cart-total")
    globalPrice += parseFloat(currentMenuItem.price)
    cartTotal.textContent = `$${globalPrice}`

    cartForm.reset()
})


