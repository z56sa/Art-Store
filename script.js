// ==========================================
// Art Store - Roblox Maps Store
// Real in-game thumbnails for the 5 maps
// Full functional Cart & Login System
// ==========================================

const mapsData = [
  {
    id: "blox-fruits",
    title: "ماب بلوكس فروت (Blox Fruits)",
    category: "RPG / مغامرات وأكشن",
    rating: 5.0,
    reviewCount: 342,
    price: 29.99,
    priceDisplay: "$29.99",
    // Official Blox Fruits game thumbnail
    image: "https://tr.rbxcdn.com/180DAY-4eef11082699ee9b5898bc9166da234a/768/432/Image/Webp/noFilter",
    fallbackImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    description: "عالم بحار وجزر متكامل مع نظام فواكه شيطانية وسحر وسيوف، وحوش ورؤساء (Bosses)، ونظام لفل وتطوير شخصيات مفتوح المصدر بالكامل."
  },
  {
    id: "egg-simulator",
    title: "ماب البيض (Egg Simulator & Pets)",
    category: "Simulator / تفقيس وحيوانات",
    rating: 4.9,
    reviewCount: 215,
    price: 19.99,
    priceDisplay: "$19.99",
    // Official Pet / Egg simulator Roblox thumbnail
    image: "https://tr.rbxcdn.com/180DAY-506e7eb00c1e6ae82da41e6c46927d6f/768/432/Image/Webp/noFilter",
    fallbackImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    description: "محاكي البيض الشهير مع نظام تفقيس نادر، حيوانات أليفة مميزة (Pets) ثلاثية الأبعاد، مناطق وجزر طائرة ونظام اقتصاد تفاعلي ممتع."
  },
  {
    id: "mm2",
    title: "ماب Murder Mystery 2 (MM2)",
    category: "غموض / رعب وتحري",
    rating: 5.0,
    reviewCount: 489,
    price: 24.99,
    priceDisplay: "$24.99",
    // Official MM2 Roblox thumbnail
    image: "https://tr.rbxcdn.com/180DAY-ca28b056157f864835697d8ebf1b34e2/768/432/Image/Webp/noFilter",
    fallbackImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    description: "خريطة الغموض الشهيرة MM2 مع نظام كامل للقاتل والشريف والأبرياء، سكينات سكاكين وأسلحة حصرية، خرائط متنوعة وجولات تفاعلية."
  },
  {
    id: "jailbreak",
    title: "ماب السرقة والهروب (Jailbreak / Heist)",
    category: "أكشن / عالم مفتوح وسرقة",
    rating: 4.8,
    reviewCount: 198,
    price: 27.50,
    priceDisplay: "$27.50",
    // Official Jailbreak / Heist Roblox thumbnail
    image: "https://tr.rbxcdn.com/180DAY-76cb17b5bb4d1b822e118fa3602d338f/768/432/Image/Webp/noFilter",
    fallbackImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    description: "مدينة واقعية واسعة تحتوي على سجن أمني مشدد، بنك، متجر مجوهرات ومتحف قابل للسرقة مع مركبات وطائرات قابلة للقيادة ونظام شرطة ولصوص."
  },
  {
    id: "adopt-me",
    title: "ماب ادوبت مي (Adopt Me!)",
    category: "Roleplay / تقمص أدوار وعائلة",
    rating: 4.9,
    reviewCount: 520,
    price: 25.00,
    priceDisplay: "$25.00",
    // Official Adopt Me Roblox thumbnail
    image: "https://tr.rbxcdn.com/180DAY-eeef7d995cb6c17539ba47ff847d1733/768/432/Image/Webp/noFilter",
    fallbackImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
    description: "عالم جزيرة التبني الممتعة والمبهجة؛ بيوت قابلة للتأثيث، حيوانات أليفة نادرة وتربية، حضانة، مركبات وألعاب وأدوار عائلية رائعة."
  }
];

// State management
let cart = [];
let currentUser = null;

// Render Maps to Grid
function renderMaps() {
  const grid = document.getElementById("mapsGrid");
  if (!grid) return;

  grid.innerHTML = mapsData.map(map => {
    const fullStars = Math.floor(map.rating);
    let starsHtml = "";
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHtml += '<i class="fa-solid fa-star"></i>';
      } else {
        starsHtml += '<i class="fa-regular fa-star"></i>';
      }
    }

    return `
      <article class="map-card" data-id="${map.id}">
        <div class="card-thumb-wrap">
          <img 
            src="${map.image}" 
            alt="${map.title}" 
            class="card-img" 
            loading="lazy" 
            onerror="this.onerror=null;this.src='${map.fallbackImage}';" 
          />
          <span class="card-tag">${map.category}</span>
          <span class="card-status"><span class="card-status-dot"></span> متوفر للتحميل</span>
        </div>

        <div class="card-content">
          <h3 class="card-title">${map.title}</h3>
          <p class="card-desc">${map.description}</p>

          <div class="card-rating-wrap">
            <div class="stars-list">
              ${starsHtml}
            </div>
            <div class="rating-score">
              <span>${map.rating.toFixed(1)}</span>
              <span class="rating-count">(${map.reviewCount} تقييم)</span>
            </div>
          </div>

          <div class="card-footer">
            <div class="price-wrap">
              <span class="price-label">السعر</span>
              <span class="price-val">${map.priceDisplay}</span>
            </div>
            <div class="card-actions-row">
              <button class="btn btn-cart-add" onclick="addToCart('${map.id}')" title="إضافة للسلة">
                <i class="fa-solid fa-cart-plus"></i>
              </button>
              <button class="btn btn-buy" onclick="openCheckout('${map.id}')">
                <i class="fa-solid fa-bolt"></i> اشترِ الآن
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Add Item to Cart
function addToCart(mapId) {
  const map = mapsData.find(m => m.id === mapId);
  if (!map) return;

  const exists = cart.find(item => item.id === mapId);
  if (exists) {
    showToast(`"${map.title}" موجود بالفعل في سلتك!`);
  } else {
    cart.push(map);
    updateCartUI();
    showToast(`تمت إضافة "${map.title}" إلى السلة 🛒`);
  }
}

// Remove from Cart
function removeFromCart(mapId) {
  cart = cart.filter(item => item.id !== mapId);
  updateCartUI();
  renderCartModal();
  showToast("تم حذف العنصر من السلة");
}

// Update Cart Badge
function updateCartUI() {
  const cartBadge = document.getElementById("cartCount");
  if (cartBadge) {
    cartBadge.textContent = cart.length;
  }
}

// Open and Render Cart Modal
function openCartModal() {
  renderCartModal();
  const cartModal = document.getElementById("cartModal");
  if (cartModal) {
    cartModal.classList.add("active");
  }
}

function renderCartModal() {
  const container = document.getElementById("cartItemsList");
  const totalBox = document.getElementById("cartTotalBox");
  const totalPriceElem = document.getElementById("cartTotalPrice");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart-msg">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>السلة فارغة حالياً</p>
        <span>تصفح المابات وأضف ما يعجبك إلى سلتك!</span>
      </div>
    `;
    if (totalBox) totalBox.style.display = "none";
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  container.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img" onerror="this.onerror=null;this.src='${item.fallbackImage}';" />
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <span class="cart-item-price">${item.priceDisplay}</span>
      </div>
      <button class="btn-remove-item" onclick="removeFromCart('${item.id}')" title="حذف">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `).join('');

  if (totalBox && totalPriceElem) {
    totalBox.style.display = "block";
    totalPriceElem.textContent = `$${total.toFixed(2)}`;
  }
}

// Checkout All Cart Items
function checkoutAllCart() {
  if (cart.length === 0) return;
  const cartModal = document.getElementById("cartModal");
  if (cartModal) cartModal.classList.remove("active");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const count = cart.length;
  cart = [];
  updateCartUI();

  showToast(`تم شراء ${count} مابات بنجاح بقيمة $${total.toFixed(2)}! شكراً لك.`);
}

// Open Checkout Modal for a single map
function openCheckout(mapId) {
  const map = mapsData.find(m => m.id === mapId);
  if (!map) return;

  const modal = document.getElementById("checkoutModal");
  const modalTitle = document.getElementById("modalMapTitle");
  const modalPrice = document.getElementById("modalMapPrice");

  modalTitle.textContent = map.title;
  modalPrice.textContent = `${map.priceDisplay} فقط`;

  modal.classList.add("active");
}

// Handle Form Submission for Single Map Checkout
function handleCheckout(e) {
  e.preventDefault();
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("active");

  showToast("تم تأكيد طلبك بنجاح! سيتم إرسال ملف الماب لك فوراً.");
}

// Login functionality
function openLoginModal() {
  if (currentUser) {
    // If logged in, clicking will log out
    if (confirm(`أنت مسجل باسم "${currentUser}". هل تود تسجيل الخروج؟`)) {
      currentUser = null;
      document.getElementById("loginBtnText").textContent = "تسجيل الدخول";
      showToast("تم تسجيل الخروج بنجاح.");
    }
    return;
  }
  const modal = document.getElementById("loginModal");
  if (modal) modal.classList.add("active");
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("usernameInput");
  const username = input.value.trim() || "مستخدم Art Store";
  currentUser = username;

  document.getElementById("loginBtnText").textContent = currentUser;
  const modal = document.getElementById("loginModal");
  if (modal) modal.classList.remove("active");

  input.value = "";
  showToast(`مرحباً بك يا ${currentUser}! تم تسجيل الدخول بنجاح.`);
}

function openDiscordAlert() {
  alert("خدمة الطلبات الخاصة متاحة عبر الديسكورد الرسمي لـ Art Store!");
}

// Show Toast Notification
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// Setup Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  renderMaps();

  // Login button click
  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", openLoginModal);
  }

  // Cart button click
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", openCartModal);
  }

  // Close Modals
  const closeModal = document.getElementById("closeModal");
  const checkoutModal = document.getElementById("checkoutModal");
  if (closeModal && checkoutModal) {
    closeModal.addEventListener("click", () => checkoutModal.classList.remove("active"));
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) checkoutModal.classList.remove("active");
    });
  }

  const closeLoginModal = document.getElementById("closeLoginModal");
  const loginModal = document.getElementById("loginModal");
  if (closeLoginModal && loginModal) {
    closeLoginModal.addEventListener("click", () => loginModal.classList.remove("active"));
    loginModal.addEventListener("click", (e) => {
      if (e.target === loginModal) loginModal.classList.remove("active");
    });
  }

  const closeCartModal = document.getElementById("closeCartModal");
  const cartModal = document.getElementById("cartModal");
  if (closeCartModal && cartModal) {
    closeCartModal.addEventListener("click", () => cartModal.classList.remove("active"));
    cartModal.addEventListener("click", (e) => {
      if (e.target === cartModal) cartModal.classList.remove("active");
    });
  }
});
