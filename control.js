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
    searchInput.addEventListener("keydown", (event) => {
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


document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("carousel-card-wrapper");
    const moveForwButton = document.getElementById("move-forw");
    let currentTranslateX = 0;

    moveForwButton.addEventListener("click", () => {
        // Scroll the carousel by 500px to the right
        carousel.scrollBy({ left: 600, behavior: 'smooth' });
    });

    const moveBackButton = document.getElementById("move-back");

moveBackButton.addEventListener("click", () => {
    // Scroll the carousel by 200px to the left
    carousel.scrollBy({ left: -600, behavior: 'smooth' });
});

});

