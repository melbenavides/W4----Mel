document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the search query and filtered products from localStorage
    const searchQuery = localStorage.getItem('searchQuery');
    const filteredProducts = JSON.parse(localStorage.getItem('filteredProducts'));

    // Update the head-text container with the search query and count
    const headTextContainer = document.querySelector(".head-text p");
    if (searchQuery) {
        const count = filteredProducts ? filteredProducts.length : 0;
        headTextContainer.textContent = `"${searchQuery}" (${count})`;
    } else {
        headTextContainer.textContent = "(No search term)";
    }

    // Display the filtered products
    if (filteredProducts && filteredProducts.length > 0) {
        const productGrid = document.getElementById('product-grid');

        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img class="product-image" src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>$${product.price}</p>
                </div>
            `;

            // Add click event listener to redirect to item-page.html
            productCard.addEventListener("click", () => {
                localStorage.setItem('selectedProduct', JSON.stringify(product));
                window.location.href = './item-page.html';
            });

            productGrid.appendChild(productCard);
        });
    } else {
        const productGrid = document.getElementById('product-grid');
        productGrid.innerHTML = '<p>No products match your search.</p>';
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#mainbar");
    const searchContainer = document.querySelector(".search-container");
    const closeButton = document.querySelector(".close-btn");

    // Show the search-container when the search input is clicked
    searchInput.addEventListener("click", () => {
        searchContainer.style.display = "block";
    });

    // Hide the search-container when the close button is clicked
    closeButton.addEventListener("click", () => {
        searchContainer.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#redirector");
    const searchContainer = document.querySelector(".search-container");
    const closeButton = document.querySelector(".close-btn");

    // Show the search-container when the search input is clicked
    searchInput.addEventListener("click", () => {
        searchContainer.style.display = "block";
    });

    // Hide the search-container when the close button is clicked
    closeButton.addEventListener("click", () => {
        searchContainer.style.display = "none";
    });

    // Handle search input
    searchInput.addEventListener("onChange", (event) => {
        if (event.key === "Enter") {
            const query = event.target.value.toLowerCase();

            fetch('./products.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(products => {
                    const filteredProducts = products.filter(product =>
                        product.name.toLowerCase().includes(query) ||
                        product.description.toLowerCase().includes(query)
                    );

                    // Store the filtered products and search query in localStorage
                    localStorage.setItem('filteredProducts', JSON.stringify(filteredProducts));
                    localStorage.setItem('searchQuery', query);

                    // Redirect to search-result.html
                    window.location.href = './search-result.html';
                })
                .catch(error => console.error('Error fetching products:', error));
        }
    });
});

