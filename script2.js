// ===== DATA =====
const users = [];
const products = [
  { id: "p1", name: "Laptop", likes: [], ratings: [] },
  { id: "p2", name: "Phone", likes: [], ratings: [] },
  { id: "p3", name: "Headphones", likes: [], ratings: [] }
];

let currentUser = null;

// ===== FUNCTIONS =====

// Signup
function signUp(username, password) {
  if (users.find(u => u.username === username)) {
    log("❌ Username already exists.");
    return;
  }
  users.push({ username, password });
  log(`✅ User '${username}' signed up successfully.`);
}

// Signin
function signIn(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    currentUser = user;
    log(`✅ '${username}' signed in successfully.`);
  } else {
    log("❌ Invalid username or password.");
  }
}

// Like a product
function toggleLike(productId) {
  if (!currentUser) {
    log("❌ You must sign in first.");
    return;
  }
  const product = products.find(p => p.id === productId);
  if (!product) {
    log("❌ Product not found.");
    return;
  }
  if (product.likes.includes(currentUser.username)) {
    product.likes = product.likes.filter(u => u !== currentUser.username);
    log(`👍 '${currentUser.username}' removed like from ${product.name}`);
  } else {
    product.likes.push(currentUser.username);
    log(`❤️ '${currentUser.username}' liked ${product.name}`);
  }
  renderProducts();
}

// Rate a product
function rateProduct(productId, rating) {
  if (!currentUser) {
    log("❌ You must sign in first.");
    return;
  }
  const product = products.find(p => p.id === productId);
  if (!product) {
    log("❌ Product not found.");
    return;
  }
  if (rating < 1 || rating > 5) {
    log("❌ Rating must be between 1 and 5.");
    return;
  }
  product.ratings.push({ user: currentUser.username, rating });
  log(`⭐ '${currentUser.username}' rated ${product.name} with ${rating}`);
  renderProducts();
}

// Average rating
function averageRating(product) {
  if (product.ratings.length === 0) return 0;
  let sum = 0;
  for (let r of product.ratings) {
    sum += r.rating;
  }
  return (sum / product.ratings.length).toFixed(1);
}

// Render products
function renderProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <strong>${p.name}</strong> (ID: ${p.id})<br>
      Likes: ${p.likes.length} | Avg Rating: ${averageRating(p)}<br>
      <button onclick="toggleLike('${p.id}')">Like / Unlike</button>
    `;
    productList.appendChild(div);
  });
}

// Log messages
function log(message) {
  document.getElementById("consoleOutput").textContent += `\n${message}`;
}

// ===== EVENT LISTENERS =====
document.getElementById("signupBtn").addEventListener("click", () => {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  signUp(username, password);
});

document.getElementById("signinBtn").addEventListener("click", () => {
  const username = document.getElementById("signinUsername").value;
  const password = document.getElementById("signinPassword").value;
  signIn(username, password);
});

document.getElementById("rateBtn").addEventListener("click", () => {
  const productId = document.getElementById("rateProductId").value;
  const rating = parseInt(document.getElementById("rateValue").value);
  rateProduct(productId, rating);
});

// Initial render
renderProducts();
