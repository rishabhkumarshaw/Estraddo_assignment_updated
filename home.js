const cartItems = new Map();
let products = [];

// Load the JSON file
window.addEventListener('load', () => {
    fetch('home.json')
        .then(response => response.json())
        .then(data => {
            products = data;
        })
        .catch(error => {
            console.error('Error loading products:', error);
        });
});
const addToCartButtons = document.querySelectorAll('button[data-product-id]');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productId = parseInt(button.getAttribute('data-product-id'));
        addToCart(productId);
    });
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (cartItems.has(productId)) {
            cartItems.set(productId, cartItems.get(productId) + 1);
        } else {
            cartItems.set(productId, 1);
        }
        updateCart();
    }
}

function removeFromCart(productId) {
    if (cartItems.has(productId)) {
        if (cartItems.get(productId) === 1) {
            cartItems.delete(productId);
        } else {
            cartItems.set(productId, cartItems.get(productId) - 1);
        }
        updateCart();
    }
}

function updateCart() {
    const cartList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let total = 0;

    cartList.innerHTML = '';

    cartItems.forEach((quantity, productId) => {
        const product = products.find(p => p.id === productId);

        if (product) {
            const li = document.createElement("li");
            li.innerHTML = 
               `
                <span id="added_item${productId}">
                <p><strong>${product.name}</strong></p>
                <img src="image/product${product.id}.jpg" alt="Product ${product.id}">
                <br>
                <p>Price: ₹${product.price.toFixed(2)}</p>
                <p>Quantity: ${quantity}</p>
                <button onclick="removeFromCart(${productId})">Remove from Cart</button>
                </span>
                `;
            cartList.appendChild(li);
            total += product.price * quantity;
        }
    });

    cartTotal.innerHTML = `<strong>₹${total.toFixed(2)}</strong>`;
}
