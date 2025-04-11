document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartContainer = document.getElementById("cart-container");
    const totalPriceElement = document.getElementById("total-price");

    let totalPrice = 0; // Initialize total price

    if (cart.length > 0) {
        cart.forEach((product, index) => {
            // Create a container for each product
            const productCard = document.createElement("div");
            productCard.classList.add("cart-item");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${product.name}</h3>
                    <p><strong>Precio:</strong> $${product.price} USD</p>
                    <p><strong>Talla:</strong> ${product.selectedSize}</p>
                </div>
            `;

            // Add the product's price to the total price
            totalPrice += product.price;

            // Create a delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "x";
            deleteButton.classList.add("delete-button");

            // Add event listener to remove the item from the cart
            deleteButton.addEventListener("click", () => {
                cart.splice(index, 1); // Remove the item from the cart array
                localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
                productCard.remove(); // Remove the item from the DOM

                // Recalculate the total price
                totalPrice -= product.price;
                totalPriceElement.textContent = totalPrice.toFixed(2);

                // If the cart is empty, show the empty message
                if (cart.length === 0) {
                    cartContainer.classList.add("empty-cart");
                    cartContainer.innerHTML = "<p>Tu bolsa de compras está vacía.</p>";
                    totalPriceElement.textContent = "0.00";
                }
            });

            productCard.appendChild(deleteButton);
            cartContainer.appendChild(productCard);
        });

        // Display the total price
        totalPriceElement.textContent = totalPrice.toFixed(2);
    } else {
        cartContainer.innerHTML = "<p>Tu bolsa de compras está vacía.</p>";
        totalPriceElement.textContent = "0.00";
    }
});