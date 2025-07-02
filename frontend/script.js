// 📁 script.js
const products = [
  { productname: "Shirt", quantity: 1, price: 499 },
  { productname: "Jeans", quantity: 2, price: 999 },
  // ...add more
];

const cartDiv = document.getElementById("cart");
cartDiv.innerHTML = products
  .map(
    (product, index) => `
    <div class="product-card">
      <h3>${product.productname}</h3>
      <p>Price: ₹${product.price}</p>
      <input type="number" min="1" value="${product.quantity}" id="qty-${index}" />
      <button onclick="addToCart(${index})">Add to Cart</button>
    </div>
  `
  )
  .join("");

function addToCart(index) {
  const qty = document.getElementById(`qty-${index}`).value;
  const selected = { ...products[index], quantity: parseInt(qty) };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(selected);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added! Redirecting to order page...");
  window.location.href = "order.html";
}
