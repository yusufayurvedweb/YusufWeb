// app.js

// Fetch products from the backend server
async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:10000/api/products');
    const products = await response.json();

    // Check if products exist and then display them
    if (products && products.length > 0) {
      displayCarousel(products);
      displayFeed(products);
    } else {
      console.log('No products found.');
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Categories for the "Shop By Category" section
const categories = ['Oil', 'Cough And Cold', 'Digestives', 'Immunity Booster'];
const categoriesContainer = document.querySelector('.categories');

// Function to display categories
function displayCategories() {
  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryDiv.innerHTML = `
      <h3>${category}</h3>
      <button class="shop-now-btn">Shop ${category}</button>
    `;
    categoriesContainer.appendChild(categoryDiv);
  });
}

// Display the carousel with the first 5 products
function displayCarousel(products) {
  const carousel = document.getElementById('carousel');
  carousel.innerHTML = ''; // Clear existing carousel items

  // Loop through the first 5 products and create carousel items
  products.slice(0, 5).forEach(product => {
    const item = document.createElement('div');
    item.className = 'carousel-item';
    item.innerHTML = `
      <a href="defpage.html?id=${product.id}"><img src="${product.image}" alt="${product.name}" class="carousel-image">
      <h3>${product.name}</h3>
      <p>$${product.price}</p></a>
    `;
    carousel.appendChild(item);
  });
}

// Display the product feed with all products starting from the 6th product
function displayFeed(products) {
  const feed = document.getElementById('feed');
  feed.innerHTML = ''; // Clear existing feed items

  // Loop through all products starting from the 6th one
  products.slice(5).forEach(product => {
    const item = document.createElement('div');
    item.className = 'feed-item';
    item.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h4>${product.name}</h4>
      <p>$${product.price}</p>
    `;
    feed.appendChild(item);
  });
}

// Call this function once the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
  displayCategories(); // Display categories section
});
