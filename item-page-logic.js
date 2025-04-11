document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the selected product from localStorage
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    if (selectedProduct) {
        // Populate the product details
        document.getElementById('product-image').src = selectedProduct.image;
        document.getElementById('product-image').alt = selectedProduct.name;
        document.getElementById('product-name').textContent = selectedProduct.name;
        document.getElementById('product-description').textContent = selectedProduct.description;
        document.getElementById('product-price').textContent = `$${selectedProduct.price}`;
    } else {
        // Handle the case where no product is selected
        document.getElementById('product-details').innerHTML = '<p>No product selected.</p>';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the selected product from localStorage
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

    if (selectedProduct) {
        // Populate the product details
        document.getElementById('product-image').src = selectedProduct.image;
        document.getElementById('product-image').alt = selectedProduct.name;
        document.getElementById('product-name').textContent = selectedProduct.name;
        document.getElementById('product-description').textContent = selectedProduct.description;
        document.getElementById('product-price').textContent = `$${selectedProduct.price}`;

        // Populate the size buttons
        const sizeContainer = document.getElementById("size-buttons");
        let selectedSize = null; // Variable to store the selected size

        if (selectedProduct.size && selectedProduct.size.length > 0) {
            selectedProduct.size.forEach(size => {
                const button = document.createElement("button");
                button.classList.add("size-button");
                button.textContent = size;

                // Add click event to select a size
                button.addEventListener("click", () => {
                    selectedSize = size; // Store the selected size
                    // Highlight the selected button
                    document.querySelectorAll(".size-button").forEach(btn => btn.classList.remove("selected"));
                    button.classList.add("selected");
                });

                sizeContainer.appendChild(button);
            });
        } else {
            sizeContainer.innerHTML = "<p>No sizes available</p>";
        }

        // Add to cart functionality
        document.getElementById("add-to-cart").addEventListener("click", () => {
            if (!selectedSize) {
                alert("Please select a size before adding to the cart.");
                return;
            }

            // Retrieve the existing cart from localStorage or initialize an empty array
            const cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Add the selected product with the selected size to the cart
            const productWithSize = { ...selectedProduct, selectedSize };
            cart.push(productWithSize);

            // Save the updated cart back to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Create a popup element
            const popup = document.createElement("div");
            popup.classList.add("popup");
            popup.textContent = `${selectedProduct.name} (Talla: ${selectedSize}) ha sido agregado a tu bolsa de compras!`;

            // Style the popup
            popup.style.position = "fixed";
            popup.style.bottom = "20px";
            popup.style.right = "20px";
            popup.style.padding = "10px 20px";
            popup.style.backgroundColor = "#f3f3f3";
            popup.style.color = "black";
            popup.style.borderRadius = "5px";
            popup.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
            popup.style.zIndex = "1000";

            // Append the popup to the body
            document.body.appendChild(popup);

            // Remove the popup after 3 seconds
            setTimeout(() => {
                popup.remove();
            }, 3000);
        });
    } else {
        // Handle the case where no product is selected
        document.getElementById('product-details').innerHTML = '<p>No has seleccionado un producto.</p>';
    }
});