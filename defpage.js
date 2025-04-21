// defpage.js

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

  
    if (!productId) {
      console.error("Product ID not found in URL");
      document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
      return;
    }
  
    try {
      const response = await fetch(`https://yusufweb-org.onrender.com/api/products/${productId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const product = await response.json();
      console.log("Fetched Product:", product);
  
      displayProductDetails(product);
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      document.getElementById('product-details').innerHTML = '<p>Error loading product details.</p>';
    }
  });
  
  function displayProductDetails(product) {
    const container = document.getElementById('carousel');
    container.innerHTML = `
      <div >
        <img src="${product.image}" alt="${product.name}" class="carousel-item" width=200/>
        <div class="product-grid">
          <h2>${product.name}</h2>
          <p class="price">Price: ₹${product.price}</p>
          <p class="description">${product.description || "No description available."}</p>
          <button class="shop-now-btn">Buy Now</button>
        </div>
      </div>
    `;
  }

    
