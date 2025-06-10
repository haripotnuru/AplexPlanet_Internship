const products = [
  { name: "Smartphone", category: "Electronics", price: 299.99, rating: 4.5 },
  { name: "Laptop", category: "Electronics", price: 899.99, rating: 4.7 },
  { name: "Wireless Mouse", category: "Electronics", price: 19.99, rating: 4.2 },
  { name: "Bluetooth Speaker", category: "Electronics", price: 49.99, rating: 4.3 },
  { name: "Headphones", category: "Electronics", price: 79.99, rating: 4.4 },

  { name: "T-Shirt", category: "Clothing", price: 15.99, rating: 4.1 },
  { name: "Jeans", category: "Clothing", price: 39.99, rating: 4.2 },
  { name: "Jacket", category: "Clothing", price: 59.99, rating: 4.5 },
  { name: "Sneakers", category: "Clothing", price: 69.99, rating: 4.6 },
  { name: "Cap", category: "Clothing", price: 9.99, rating: 4.0 },

  { name: "The Great Gatsby", category: "Books", price: 10.99, rating: 4.7 },
  { name: "Atomic Habits", category: "Books", price: 13.99, rating: 4.8 },
  { name: "Deep Work", category: "Books", price: 12.50, rating: 4.6 },
  { name: "1984", category: "Books", price: 9.49, rating: 4.5 },
  { name: "To Kill a Mockingbird", category: "Books", price: 8.99, rating: 4.7 },

  { name: "Lamp", category: "Home", price: 25.99, rating: 4.3 },
  { name: "Cushion", category: "Home", price: 14.99, rating: 4.2 },
  { name: "Coffee Table", category: "Home", price: 89.99, rating: 4.4 },
  { name: "Curtains", category: "Home", price: 39.99, rating: 4.1 },
  { name: "Wall Art", category: "Home", price: 29.99, rating: 4.5 }
];

const categoryFilter = document.getElementById("categoryFilter");
const sortBy = document.getElementById("sortBy");
const productList = document.getElementById("productList");

function displayProducts(productArray) {
  productList.innerHTML = "";
  productArray.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: ₹${product.price.toFixed(2)}</p>
      <p>Rating: ⭐${product.rating}</p>
    `;
    productList.appendChild(div);
  });
}

function filterAndSortProducts() {
  let filtered = [...products];

  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "All") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  const sortOption = sortBy.value;
  if (sortOption === "priceAsc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceDesc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortOption === "ratingDesc") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filtered);
}

categoryFilter.addEventListener("change", filterAndSortProducts);
sortBy.addEventListener("change", filterAndSortProducts);

// Show all products on page load
displayProducts(products);
