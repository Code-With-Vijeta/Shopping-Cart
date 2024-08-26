document.addEventListener("DOMContentLoaded", function () {
  const topLooksData = [
    {
      image: "./images/clothing1.jpg",
      title: "Stylish T-Shirt",
      price: "$19.99",
    },
    {
      image: "./images/clothing2.jpg",
      title: "Casual Jacket",
      price: "$39.99",
    },
    { image: "./images/clothing3.jpg", title: "Frock", price: "$28.99" },
  ];

  const middleLooksData = [
    { image: "./images/clothing4.jpg", title: "Sportswear", price: "$59.99" },
    {
      image: "./images/clothing5.jpg",
      title: "Elegant Dress",
      price: "$29.99",
    },
    { image: "./images/clothing6.jpg", title: "Summer Cool", price: "$31.99" },
  ];

  const saleData = [
    {
      image: "./images/clothing7.jpg",
      title: "Summer Shorts",
      price: "$14.99",
    },
    { image: "./images/clothing8.jpg", title: "Skirt", price: "$89.99" },
    { image: "./images/clothing9.jpg", title: "Black Shorts", price: "$29.99" },
  ];

  let cart = [];
  const addedItems = new Set();

  function generateCards(containerId, data) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
      card.innerHTML = `
                <div class="card">
                    <div class="card-img-container position-relative">
                        <img src="${item.image}" alt="${
        item.title
      }" class="card-img">
                        <span class="like-icon material-symbols-outlined" data-liked="false">heart_plus</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${item.title}</h5>
                        <p class="card-price">${item.price}</p>
                        <div class="card-buttons">
                            <button class="card-button">View Details</button>
                            <button class="card-add-to-cart" data-title="${
                              item.title
                            }" data-price="${item.price}" data-image="${
        item.image
      }">
                                ${
                                  addedItems.has(item.title)
                                    ? "Added to Cart"
                                    : "Add to Cart"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            `;
      container.appendChild(card);
    });
  }

  function renderCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "col-md-12 mb-4 cart-item";
        cartItem.innerHTML = `
                    <div class="cart-item-content" style="display: flex; align-items: center;">
                        <img src="${item.image}" alt="${item.title}" style="height: 60px; width: auto; margin-right: 10px;">
                        <div class="cart-item-info">
                            <h5 class="cart-item-title">${item.title}</h5>
                            <p class="cart-item-price">${item.price}</p>
                            <span class="cart-item-remove" data-title="${item.title}" style="color: red; cursor: pointer;">Remove</span>
                        </div>
                    </div>
                `;
        cartContainer.appendChild(cartItem);
      });
    }

    // Update cart count
    document.querySelector(".cart-count").textContent = cart.length;
  }

  // cart section
  document.getElementById("cart-icon").addEventListener("click", function () {
    const cartSection = document.getElementById("cart-section");
    cartSection.style.display =
      cartSection.style.display === "none" || cartSection.style.display === ""
        ? "block"
        : "none";
  });

  // Close cart section
  document.addEventListener("click", function (event) {
    const cartSection = document.getElementById("cart-section");
    const cartIcon = document.getElementById("cart-icon");
    if (
      !cartSection.contains(event.target) &&
      !cartIcon.contains(event.target) &&
      !removeButton
    ) {
      cartSection.style.display = "none";
    }
  });

  // like button click
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("like-icon")) {
      const icon = event.target;
      if (icon.dataset.liked === "true") {
        icon.dataset.liked = "false";
        icon.classList.remove("liked");
        icon.textContent = "heart_plus";
      } else {
        icon.dataset.liked = "true";
        icon.classList.add("liked");
        icon.textContent = "heart_check";
      }
    }

    // add to cart button click
    if (event.target.classList.contains("card-add-to-cart")) {
      const button = event.target;
      const itemTitle = button.dataset.title;

      if (!addedItems.has(itemTitle)) {
        const item = {
          title: button.dataset.title,
          price: button.dataset.price,
          image: button.dataset.image,
        };
        cart.push(item);
        addedItems.add(itemTitle);
        button.textContent = "Added to Cart";
        button.disabled = true;
        renderCart();
      }
    }

    // remove from cart button
    if (event.target.classList.contains("cart-item-remove")) {
      const title = event.target.dataset.title;
      cart = cart.filter((item) => item.title !== title);
      addedItems.delete(title);
      renderCart();

      document.querySelectorAll(".card-add-to-cart").forEach((button) => {
        if (button.dataset.title === title) {
          button.textContent = "Add to Cart";
          button.disabled = false;
        }
      });
    }
  });

  generateCards("top-looks-container", topLooksData);
  generateCards("middle-looks-container", middleLooksData);
  generateCards("sale-container", saleData);
});
