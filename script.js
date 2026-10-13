// ========================================================
// Art Store - Full Featured Store Engine
// Includes:
// 1. Interactive Maps & Sub-Products System
// 2. Comprehensive Admin Dashboard (Maps + Products CRUD)
// 3. Email & Phone Login with Verification Code (OTP)
// 4. Cart & Instant Checkout System
// 5. Persistent Local Storage
// ========================================================

const STORAGE_MAPS_KEY = "artstore_maps_data_v1";
const STORAGE_ADMIN_AUTH_KEY = "artstore_admin_authenticated";
const ADMIN_SECRET_PIN = "admin123";

// Initial Default Maps Data with in-game products
const defaultMapsData = [
  {
    id: "blox-fruits",
    title: "ماب بلوكس فروت (Blox Fruits)",
    category: "RPG / مغامرات وأكشن",
    rating: 5.0,
    reviewCount: 342,
    price: 29.99,
    priceDisplay: "$29.99",
    image: "assets/images/blox-fruits.png",
    fallbackImage: "https://static.wikia.nocookie.net/roblox-blox-piece/images/f/f0/Blox_Fruits_Wiki_Logo.png",
    description: "عالم بحار وجزر متكامل مع نظام فواكه شيطانية وسحر وسيوف، وحوش ورؤساء (Bosses)، ونظام لفل وتطوير شخصيات مفتوح المصدر بالكامل.",
    products: [
      { id: "bf-p1", title: "حزمة الفواكه الأسطورية (Dragon & Kitsune)", price: 9.99, desc: "سكريبت كامل مع مجسمات الفواكه النادرة والتأثيرات الصوتية والبصرية." },
      { id: "bf-p2", title: "نظام قتال السيوف المزدوج (CDK Sword Script)", price: 6.50, desc: "أنيميشن هجومي متقدم مع مهارات Z و X مخصصة." },
      { id: "bf-p3", title: "حزمة جزر البحر الثالث (Sea 3 Islands Map)", price: 14.99, desc: "بناء معماري ثلاثي الأبعاد عالي الجودة لـ 4 جزر حصرية." }
    ]
  },
  {
    id: "egg-simulator",
    title: "ماب البيض (Egg Simulator & Pets)",
    category: "Simulator / تفقيس وحيوانات",
    rating: 4.9,
    reviewCount: 215,
    price: 19.99,
    priceDisplay: "$19.99",
    image: "assets/images/egg-simulator.png",
    fallbackImage: "https://static.wikia.nocookie.net/pet-simulator/images/2/22/PS99Icon.png",
    description: "محاكي البيض الشهير مع نظام تفقيس نادر، حيوانات أليفة مميزة (Pets) ثلاثية الأبعاد، مناطق وجزر طائرة ونظام اقتصاد تفاعلي ممتع.",
    products: [
      { id: "egg-p1", title: "حزمة 15 حيوان أليف هيوج (Huge Pets Pack)", price: 7.99, desc: "موديلات ثلاثية الأبعاد خفيفة جاهزة للتفقيس مع تأثيرات هالة مشعة." },
      { id: "egg-p2", title: "سكريبت آلة الترقية والدمج الذهبي (Gold Craft Machine)", price: 4.99, desc: "واجهة UI عصرية ونظام دمج سلس بنقرة واحدة." },
      { id: "egg-p3", title: "خريطة العالم المتجمد والمستقبلي (Sci-Fi Zones)", price: 8.50, desc: "منطقتان كاملتان للتعدين وتجميع العملات." }
    ]
  },
  {
    id: "mm2",
    title: "ماب Murder Mystery 2 (MM2)",
    category: "غموض / رعب وتحري",
    rating: 5.0,
    reviewCount: 489,
    price: 24.99,
    priceDisplay: "$24.99",
    image: "assets/images/mm2.png",
    fallbackImage: "https://static.wikia.nocookie.net/murder-mystery-2/images/9/9f/Murder-Mystery-2.png",
    description: "خريطة الغموض الشهيرة MM2 مع نظام كامل للقاتل والشريف والأبرياء، سكينات سكاكين وأسلحة حصرية، خرائط متنوعة وجولات تفاعلية.",
    products: [
      { id: "mm2-p1", title: "حزمة سكاكين النيون المتوهجة (Neon Chroma Knives)", price: 8.99, desc: "10 سكينات ملونة بأنيميشن دوران وسحب رائع." },
      { id: "mm2-p2", title: "خريطة الفندق المهجور (Haunted Hotel Arena)", price: 9.50, desc: "خريطة تفاعلية بنظام أبواب وإضاءة سينمائية مظلمة." },
      { id: "mm2-p3", title: "صندوق أسلحة عشوائي مع متجر كامل (Crate UI)", price: 5.99, desc: "نظام فتح صناديق الحظ مع احتمالات ندرة." }
    ]
  },
  {
    id: "jailbreak",
    title: "ماب السرقة والهروب (Jailbreak / Heist)",
    category: "أكشن / عالم مفتوح وسرقة",
    rating: 4.8,
    reviewCount: 198,
    price: 27.50,
    priceDisplay: "$27.50",
    image: "assets/images/jailbreak.png",
    fallbackImage: "https://assets.jailbreakchangelogs.com/assets/logos/JBCL_Long_Transparent.png",
    description: "مدينة واقعية واسعة تحتوي على سجن أمني مشدد، بنك، متجر مجوهرات ومتحف قابل للسرقة مع مركبات وطائرات قابلة للقيادة ونظام شرطة ولصوص.",
    products: [
      { id: "jb-p1", title: "نظام سرقة البنك بالليزر (Bank Laser Heist System)", price: 11.99, desc: "ليزر متحرك وإنذار تلقائي ومكافأة نقدية عند الهروب." },
      { id: "jb-p2", title: "حزمة سيارات سباق وطائرات هليكوبتر قابلة للقيادة", price: 8.99, desc: "مركبات بمحرك Chassis متطور متوافق مع الموبايل والكمبيوتر." },
      { id: "jb-p3", title: "مبنى قسم الشرطة وسجن متكامل مع كاميرات مراقبة", price: 12.00, desc: "بناء فائق الواقعية مع بطاقات دخول وزنازين." }
    ]
  },
  {
    id: "adopt-me",
    title: "ماب ادوبت مي (Adopt Me!)",
    category: "Roleplay / تقمص أدوار وعائلة",
    rating: 4.9,
    reviewCount: 520,
    price: 25.00,
    priceDisplay: "$25.00",
    image: "assets/images/adopt-me.png",
    fallbackImage: "https://static.wikia.nocookie.net/logopedia/images/0/0e/Adopt_Me%21_%28Alt%29.png",
    description: "عالم جزيرة التبني الممتعة والمبهجة؛ بيوت قابلة للتأثيث، حيوانات أليفة نادرة وتربية، حضانة، مركبات وألعاب وأدوار عائلية رائعة.",
    products: [
      { id: "am-p1", title: "نظام إطعام ورعاية الحيوانات (Pet Care & Sleep Script)", price: 9.99, desc: "أشرطة تلبية احتياجات الحيوان مع مكافآت عملات." },
      { id: "am-p2", title: "منزل قصر فاخر قابل للبناء والتأثيث (Mansion System)", price: 10.50, desc: "نظام وضع الأثاث وسحب وتحريك العناصر داخلياً." },
      { id: "am-p3", title: "حزمة ملابس واكسسوارات الحيوانات (Pet Wearables)", price: 5.50, desc: "قبعات، نظارات وأجنحة تفاعلية تركب على الحيوانات." }
    ]
  }
];

// Load Maps from localStorage or use defaults
function getStoredMaps() {
  const data = localStorage.getItem(STORAGE_MAPS_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.setItem(STORAGE_MAPS_KEY, JSON.stringify(defaultMapsData));
  return defaultMapsData;
}

function saveStoredMaps(maps) {
  localStorage.setItem(STORAGE_MAPS_KEY, JSON.stringify(maps));
}

// App State
let mapsList = getStoredMaps();
let cart = [];
let currentUser = null;
let currentOtpCode = null;
let currentOtpTarget = "";
let selectedMapForProducts = null;

// ================= RENDER MAPS =================
function renderMaps() {
  const grid = document.getElementById("mapsGrid");
  const badge = document.getElementById("mapsCountBadge");
  if (!grid) return;

  mapsList = getStoredMaps();
  if (badge) {
    badge.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${mapsList.length} مابات متوفرة`;
  }

  grid.innerHTML = mapsList.map(map => {
    const fullStars = Math.floor(map.rating || 5);
    let starsHtml = "";
    for (let i = 0; i < 5; i++) {
      starsHtml += (i < fullStars) ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
    }

    const productsCount = (map.products && map.products.length) || 0;

    return `
      <article class="map-card" data-id="${map.id}">
        <div class="card-thumb-wrap">
          <img 
            src="${map.image}" 
            alt="${map.title}" 
            class="card-img" 
            loading="lazy" 
            onerror="this.onerror=null;this.src='${map.fallbackImage || map.image}';" 
          />
          <span class="card-tag">${map.category}</span>
          <span class="card-status"><span class="card-status-dot"></span> متوفر للتحميل</span>
        </div>

        <div class="card-content">
          <h3 class="card-title">${map.title}</h3>
          <p class="card-desc">${map.description}</p>

          <div class="card-sub-info">
            <button class="btn btn-primary btn-block btn-open-modal-products" onclick="openMapProductsModal('${map.id}')">
              <i class="fa-solid fa-boxes-stacked"></i> تصفح واشترِ منتجات الماب (${productsCount})
            </button>
          </div>

          <div class="card-rating-wrap">
            <div class="stars-list">
              ${starsHtml}
            </div>
            <div class="rating-score">
              <span>${(map.rating || 5).toFixed(1)}</span>
              <span class="rating-count">(${map.reviewCount || 100} تقييم)</span>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ================= INNER MAP PRODUCTS MODAL (بطاقات كبيرة وجميلة مع صور) =================
function openMapProductsModal(mapId) {
  mapsList = getStoredMaps();
  const map = mapsList.find(m => m.id === mapId);
  if (!map) return;

  selectedMapForProducts = map;
  document.getElementById("modalProductsMapTitle").textContent = `منتجات وعناصر: ${map.title}`;
  document.getElementById("modalProductsMapDesc").textContent = `تصفح واشترِ المنتجات الحصرية الخاصة بهذا الماب مباشرة مع الاستلام الفوري.`;

  const container = document.getElementById("innerProductsGrid");
  const products = map.products || [];

  if (products.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box">
        <i class="fa-solid fa-box-open"></i>
        <p>لا توجد منتجات مضافة لهذا الماب حالياً.</p>
        <span>يمكن للمالك إضافة عناصر من لوحة التحكم.</span>
      </div>
    `;
  } else {
    container.innerHTML = products.map(prod => {
      const prodImg = prod.image || map.image;
      return `
        <article class="inner-product-card-large">
          <div class="inner-prod-thumb-wrap">
            <img src="${prodImg}" alt="${prod.title}" class="inner-prod-img" onerror="this.src='${map.image}';" />
            <span class="inner-prod-badge-tag"><i class="fa-solid fa-cube"></i> ${map.category}</span>
          </div>

          <div class="inner-prod-body">
            <div class="inner-prod-header">
              <h3 class="inner-prod-title">${prod.title}</h3>
              <div class="inner-prod-price-tag">$${Number(prod.price).toFixed(2)}</div>
            </div>
            <p class="inner-prod-desc">${prod.desc || 'عنصر احترافي متوافق مع الماب'}</p>
            
            <div class="inner-prod-bottom">
              <div class="inner-prod-status">
                <span class="card-status-dot"></span> متوفر للتحميل الفوري
              </div>
              <div class="inner-prod-actions">
                <button class="btn btn-cart-add" onclick="addProductToCart('${map.title}', '${prod.title}', ${prod.price})" title="إضافة للسلة">
                  <i class="fa-solid fa-cart-plus"></i>
                </button>
                <button class="btn btn-buy" onclick="openCheckoutSingle('${prod.title} (${map.title})', ${prod.price})">
                  <i class="fa-solid fa-bolt"></i> اشترِ الآن
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  document.getElementById("mapProductsModal").classList.add("active");
}

// ================= CART SYSTEM =================
function addMapToCart(mapId) {
  const map = mapsList.find(m => m.id === mapId);
  if (!map) return;

  cart.push({
    id: `map-${map.id}-${Date.now()}`,
    title: `ماب: ${map.title}`,
    price: Number(map.price),
    image: map.image,
    fallbackImage: map.fallbackImage
  });
  updateCartBadge();
  showToast(`تمت إضافة "${map.title}" إلى السلة 🛒`);
}

function addProductToCart(mapTitle, prodTitle, price) {
  cart.push({
    id: `prod-${Date.now()}-${Math.random()}`,
    title: `${prodTitle} (${mapTitle})`,
    price: Number(price),
    image: "assets/images/blox-fruits.png"
  });
  updateCartBadge();
  showToast(`تمت إضافة "${prodTitle}" إلى السلة 🛒`);
}

function removeFromCart(cartItemId) {
  cart = cart.filter(item => item.id !== cartItemId);
  updateCartBadge();
  renderCartModal();
  showToast("تم حذف العنصر من السلة");
}

function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = cart.length;
}

function openCartModal() {
  renderCartModal();
  document.getElementById("cartModal").classList.add("active");
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
        <span>تصفح المابات والمنتجات وأضف ما يعجبك!</span>
      </div>
    `;
    if (totalBox) totalBox.style.display = "none";
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  container.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <span class="cart-item-price">$${item.price.toFixed(2)}</span>
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

function checkoutAllCart() {
  if (cart.length === 0) return;
  document.getElementById("cartModal").classList.remove("active");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const count = cart.length;
  cart = [];
  updateCartBadge();
  showToast(`تم تأكيد شراء ${count} عناصر بقيمة $${total.toFixed(2)} بنجاح!`);
}

function openCheckoutSingle(title, price) {
  document.getElementById("modalMapTitle").textContent = title;
  document.getElementById("modalMapPrice").textContent = `$${Number(price).toFixed(2)} فقط`;
  document.getElementById("checkoutModal").classList.add("active");
}

function handleCheckout(e) {
  e.preventDefault();
  document.getElementById("checkoutModal").classList.remove("active");
  showToast("تم استلام طلبك بنجاح! سيتم تسليم الملف عبر الديسكورد فوراً.");
}

// ================= AUTHENTICATION WITH EMAIL / PHONE + OTP =================
let activeAuthTab = "email";

function switchAuthTab(type) {
  activeAuthTab = type;
  const tabEmail = document.getElementById("tabEmailBtn");
  const tabPhone = document.getElementById("tabPhoneBtn");
  const emailGroup = document.getElementById("emailGroup");
  const phoneGroup = document.getElementById("phoneGroup");

  if (type === "email") {
    tabEmail.classList.add("active");
    tabPhone.classList.remove("active");
    emailGroup.style.display = "block";
    phoneGroup.style.display = "none";
  } else {
    tabPhone.classList.add("active");
    tabEmail.classList.remove("active");
    phoneGroup.style.display = "block";
    emailGroup.style.display = "none";
  }
}

function openLoginModal() {
  if (currentUser) {
    if (confirm(`أنت مسجل حالياً بحساب "${currentUser}". هل تريد تسجيل الخروج؟`)) {
      currentUser = null;
      document.getElementById("loginBtnText").textContent = "تسجيل الدخول";
      showToast("تم تسجيل الخروج بنجاح.");
    }
    return;
  }

  backToAuthStep1();
  document.getElementById("loginModal").classList.add("active");
}

function handleSendOtp(e) {
  e.preventDefault();
  let target = "";
  if (activeAuthTab === "email") {
    const email = document.getElementById("authEmailInput").value.trim();
    if (!email) {
      alert("يرجى إدخال البريد الإلكتروني");
      return;
    }
    target = email;
  } else {
    const phone = document.getElementById("authPhoneInput").value.trim();
    if (!phone) {
      alert("يرجى إدخال رقم الجوال");
      return;
    }
    target = phone;
  }

  // Generate 4-digit verification code
  currentOtpCode = Math.floor(1000 + Math.random() * 9000).toString();
  currentOtpTarget = target;

  document.getElementById("otpSentTargetText").textContent = `تم إرسال رمز التحقق إلى: ${target}`;
  document.getElementById("simulatedCodeText").textContent = currentOtpCode;

  document.getElementById("authStep1").style.display = "none";
  document.getElementById("authStep2").style.display = "block";

  showToast(`تم إرسال رسالة برمز التحقق: ${currentOtpCode}`);
}

function backToAuthStep1() {
  document.getElementById("authStep1").style.display = "block";
  document.getElementById("authStep2").style.display = "none";
  const otpInput = document.getElementById("otpCodeInput");
  if (otpInput) otpInput.value = "";
}

// Owner credentials defined by user
const OWNER_EMAIL = "bdalkrymbyd4@gmail.com";
const OWNER_PHONE = "0502683998";

function checkIsOwner(input) {
  if (!input) return false;
  const cleanInput = input.trim().toLowerCase().replace(/[\s-]/g, "");
  const cleanOwnerEmail = OWNER_EMAIL.toLowerCase();
  const cleanOwnerPhone = OWNER_PHONE;
  return cleanInput === cleanOwnerEmail || cleanInput === cleanOwnerPhone || cleanInput.endsWith("0502683998");
}

function handleVerifyOtp(e) {
  e.preventDefault();
  const enteredCode = document.getElementById("otpCodeInput").value.trim();

  if (enteredCode !== currentOtpCode) {
    alert("رمز التحقق غير صحيح، يرجى كتابة الرمز الظاهر في الرسالة.");
    return;
  }

  // Successful Login
  currentUser = currentOtpTarget;
  const isOwner = checkIsOwner(currentUser);

  if (isOwner) {
    sessionStorage.setItem(STORAGE_ADMIN_AUTH_KEY, "true");
    document.getElementById("loginBtnText").innerHTML = `<i class="fa-solid fa-crown text-neon"></i> المالك`;
    const ownerNavBtn = document.getElementById("ownerAdminNavBtn");
    if (ownerNavBtn) ownerNavBtn.style.display = "inline-flex";
    showToast(`مرحباً بك يا مالك المتجر! تم تفعيل لوحة التحكم الخاصة بك 👑`);
  } else {
    document.getElementById("loginBtnText").textContent = currentUser.length > 15 ? currentUser.substring(0, 15) + "..." : currentUser;
    const ownerNavBtn = document.getElementById("ownerAdminNavBtn");
    if (ownerNavBtn) ownerNavBtn.style.display = "none";
    showToast(`تم تأكيد الحساب وتسجيل الدخول بنجاح! مرحباً بك.`);
  }

  document.getElementById("loginModal").classList.remove("active");
  backToAuthStep1();
}

function openLoginModal() {
  if (currentUser) {
    const isOwner = checkIsOwner(currentUser);
    const title = isOwner ? "حساب المالك" : "الحساب";
    if (confirm(`أنت مسجل حالياً كـ ${title} (${currentUser}). هل تريد تسجيل الخروج؟`)) {
      currentUser = null;
      sessionStorage.removeItem(STORAGE_ADMIN_AUTH_KEY);
      document.getElementById("loginBtnText").textContent = "تسجيل الدخول";
      const ownerNavBtn = document.getElementById("ownerAdminNavBtn");
      if (ownerNavBtn) ownerNavBtn.style.display = "none";
      showToast("تم تسجيل الخروج بنجاح.");
    }
    return;
  }

  backToAuthStep1();
  document.getElementById("loginModal").classList.add("active");
}

// ================= ADMIN DASHBOARD (للمالك فقط) =================
function openAdminPanel() {
  const isAuthed = sessionStorage.getItem(STORAGE_ADMIN_AUTH_KEY) === "true";

  if (!isAuthed || !checkIsOwner(currentUser)) {
    alert("لوحة التحكم مخصصة لمالك المتجر فقط! يرجى تسجيل الدخول بحساب المالك (bdalkrymbyd4@gmail.com أو 0502683998).");
    openLoginModal();
    return;
  }

  const lock = document.getElementById("adminLockScreen");
  const content = document.getElementById("adminContentScreen");
  lock.style.display = "none";
  content.style.display = "block";

  initAdminView();
  document.getElementById("adminModal").classList.add("active");
}

function handleAdminLogin(e) {
  e.preventDefault();
  const pass = document.getElementById("adminPassInput").value.trim();

  if (pass === ADMIN_SECRET_PIN) {
    sessionStorage.setItem(STORAGE_ADMIN_AUTH_KEY, "true");
    document.getElementById("adminLockScreen").style.display = "none";
    document.getElementById("adminContentScreen").style.display = "block";
    document.getElementById("adminPassInput").value = "";
    initAdminView();
    showToast("مرحباً بك في لوحة تحكم الإدارة!");
  } else {
    alert("كلمة المرور غير صحيحة! الدخول مخصص للإدارة فقط.");
  }
}

function adminLogout() {
  sessionStorage.removeItem(STORAGE_ADMIN_AUTH_KEY);
  document.getElementById("adminLockScreen").style.display = "block";
  document.getElementById("adminContentScreen").style.display = "none";
  showToast("تم تسجيل الخروج من لوحة الإدارة.");
}

function initAdminView() {
  renderAdminMapsTable();
  populateAdminMapSelect();
}

function switchAdminTab(tab) {
  const btnMaps = document.getElementById("tabAdminMaps");
  const btnProducts = document.getElementById("tabAdminProducts");
  const secMaps = document.getElementById("adminMapsSection");
  const secProducts = document.getElementById("adminProductsSection");

  if (tab === "maps") {
    btnMaps.classList.add("active");
    btnProducts.classList.remove("active");
    secMaps.style.display = "block";
    secProducts.style.display = "none";
    renderAdminMapsTable();
  } else {
    btnProducts.classList.add("active");
    btnMaps.classList.remove("active");
    secProducts.style.display = "block";
    secMaps.style.display = "none";
    populateAdminMapSelect();
    renderAdminProductsList();
  }
}

// Admin: Manage Maps Table
function renderAdminMapsTable() {
  mapsList = getStoredMaps();
  const tbody = document.getElementById("adminMapsTableBody");
  if (!tbody) return;

  tbody.innerHTML = mapsList.map(map => `
    <tr>
      <td>
        <div class="table-map-cell">
          <img src="${map.image}" class="table-thumb" onerror="this.src='${map.fallbackImage || map.image}';" />
          <strong>${map.title}</strong>
        </div>
      </td>
      <td>${map.category}</td>
      <td><span class="text-neon">$${Number(map.price).toFixed(2)}</span></td>
      <td><span class="badge-count">${(map.products || []).length} منتج</span></td>
      <td>
        <div class="table-actions">
          <button class="btn-action edit" onclick="editMap('${map.id}')" title="تعديل"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-action delete" onclick="deleteMap('${map.id}')" title="حذف"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function showAddMapForm() {
  document.getElementById("mapFormTitle").innerHTML = `<i class="fa-solid fa-plus-circle"></i> إضافة ماب جديد`;
  document.getElementById("editMapId").value = "";
  document.getElementById("mapTitleInput").value = "";
  document.getElementById("mapCategoryInput").value = "";
  document.getElementById("mapPriceInput").value = "";
  document.getElementById("mapImageInput").value = "";
  document.getElementById("mapDescInput").value = "";
  document.getElementById("mapFormContainer").style.display = "block";
}

function hideMapForm() {
  document.getElementById("mapFormContainer").style.display = "none";
}

function editMap(mapId) {
  mapsList = getStoredMaps();
  const map = mapsList.find(m => m.id === mapId);
  if (!map) return;

  document.getElementById("mapFormTitle").innerHTML = `<i class="fa-solid fa-pen-to-square"></i> تعديل ماب: ${map.title}`;
  document.getElementById("editMapId").value = map.id;
  document.getElementById("mapTitleInput").value = map.title;
  document.getElementById("mapCategoryInput").value = map.category;
  document.getElementById("mapPriceInput").value = map.price;
  document.getElementById("mapImageInput").value = map.image;
  document.getElementById("mapDescInput").value = map.description;
  document.getElementById("mapFormContainer").style.display = "block";
}

function handleSaveMap(e) {
  e.preventDefault();
  const editId = document.getElementById("editMapId").value;
  const title = document.getElementById("mapTitleInput").value.trim();
  const category = document.getElementById("mapCategoryInput").value.trim();
  const price = parseFloat(document.getElementById("mapPriceInput").value) || 0;
  const image = document.getElementById("mapImageInput").value.trim();
  const desc = document.getElementById("mapDescInput").value.trim();

  mapsList = getStoredMaps();

  if (editId) {
    // Edit existing
    const idx = mapsList.findIndex(m => m.id === editId);
    if (idx !== -1) {
      mapsList[idx].title = title;
      mapsList[idx].category = category;
      mapsList[idx].price = price;
      mapsList[idx].priceDisplay = `$${price.toFixed(2)}`;
      mapsList[idx].image = image;
      mapsList[idx].description = desc;
    }
    showToast("تم تحديث بيانات الماب بنجاح!");
  } else {
    // Add new map
    const newId = `custom-map-${Date.now()}`;
    mapsList.push({
      id: newId,
      title: title,
      category: category,
      price: price,
      priceDisplay: `$${price.toFixed(2)}`,
      image: image || "assets/images/blox-fruits.png",
      description: desc,
      rating: 5.0,
      reviewCount: 1,
      products: []
    });
    showToast("تمت إضافة الماب الجديد بنجاح!");
  }

  saveStoredMaps(mapsList);
  hideMapForm();
  renderAdminMapsTable();
  populateAdminMapSelect();
  renderMaps();
}

function deleteMap(mapId) {
  if (!confirm("هل أنت متأكد من رغبتك في حذف هذا الماب وجميع منتجاته من المتجر؟")) return;

  mapsList = getStoredMaps();
  mapsList = mapsList.filter(m => m.id !== mapId);
  saveStoredMaps(mapsList);

  renderAdminMapsTable();
  populateAdminMapSelect();
  renderMaps();
  showToast("تم حذف الماب بنجاح!");
}

// Admin: Manage Sub-Products of selected map
function populateAdminMapSelect() {
  mapsList = getStoredMaps();
  const select = document.getElementById("adminProductMapSelect");
  if (!select) return;

  select.innerHTML = mapsList.map(map => `
    <option value="${map.id}">${map.title}</option>
  `).join('');
}

function renderAdminProductsList() {
  mapsList = getStoredMaps();
  const select = document.getElementById("adminProductMapSelect");
  const tbody = document.getElementById("adminProductsTableBody");
  if (!select || !tbody) return;

  const mapId = select.value;
  const map = mapsList.find(m => m.id === mapId);
  const products = (map && map.products) || [];

  if (products.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 2rem;">لا توجد منتجات مضافة لهذا الماب بعد. اضغط "إضافة منتج جديد" أعلاه.</td></tr>`;
    return;
  }

  tbody.innerHTML = products.map(prod => `
    <tr>
      <td><strong>${prod.title}</strong></td>
      <td><span class="text-neon">$${Number(prod.price).toFixed(2)}</span></td>
      <td>${prod.desc || '—'}</td>
      <td>
        <div class="table-actions">
          <button class="btn-action edit" onclick="editProduct('${map.id}', '${prod.id}')" title="تعديل"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-action delete" onclick="deleteProduct('${map.id}', '${prod.id}')" title="حذف"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function showAddProductForm() {
  document.getElementById("productFormTitle").innerHTML = `<i class="fa-solid fa-plus-circle"></i> إضافة منتج جديد للماب`;
  document.getElementById("editProductId").value = "";
  document.getElementById("productTitleInput").value = "";
  document.getElementById("productPriceInput").value = "";
  document.getElementById("productDescInput").value = "";
  document.getElementById("productFormContainer").style.display = "block";
}

function hideProductForm() {
  document.getElementById("productFormContainer").style.display = "none";
}

function editProduct(mapId, prodId) {
  mapsList = getStoredMaps();
  const map = mapsList.find(m => m.id === mapId);
  if (!map) return;
  const prod = (map.products || []).find(p => p.id === prodId);
  if (!prod) return;

  document.getElementById("productFormTitle").innerHTML = `<i class="fa-solid fa-pen-to-square"></i> تعديل منتج: ${prod.title}`;
  document.getElementById("editProductId").value = prod.id;
  document.getElementById("productTitleInput").value = prod.title;
  document.getElementById("productPriceInput").value = prod.price;
  document.getElementById("productDescInput").value = prod.desc || "";
  document.getElementById("productFormContainer").style.display = "block";
}

function handleSaveProduct(e) {
  e.preventDefault();
  mapsList = getStoredMaps();
  const select = document.getElementById("adminProductMapSelect");
  const mapId = select.value;
  const map = mapsList.find(m => m.id === mapId);
  if (!map) return;

  if (!map.products) map.products = [];

  const editProdId = document.getElementById("editProductId").value;
  const title = document.getElementById("productTitleInput").value.trim();
  const price = parseFloat(document.getElementById("productPriceInput").value) || 0;
  const imgInput = document.getElementById("productImageInput");
  const imgUrl = (imgInput && imgInput.value.trim()) || map.image;
  const desc = document.getElementById("productDescInput").value.trim();

  if (editProdId) {
    const idx = map.products.findIndex(p => p.id === editProdId);
    if (idx !== -1) {
      map.products[idx].title = title;
      map.products[idx].price = price;
      map.products[idx].image = imgUrl;
      map.products[idx].desc = desc;
    }
    showToast("تم تحديث المنتج بنجاح!");
  } else {
    map.products.push({
      id: `prod-${Date.now()}`,
      title: title,
      price: price,
      image: imgUrl,
      desc: desc
    });
    showToast("تمت إضافة المنتج إلى الماب بنجاح!");
  }

  saveStoredMaps(mapsList);
  hideProductForm();
  renderAdminProductsList();
  renderMaps();
}

function deleteProduct(mapId, prodId) {
  if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

  mapsList = getStoredMaps();
  const map = mapsList.find(m => m.id === mapId);
  if (!map) return;

  map.products = (map.products || []).filter(p => p.id !== prodId);
  saveStoredMaps(mapsList);

  renderAdminProductsList();
  renderMaps();
  showToast("تم حذف المنتج بنجاح!");
}

// Utilities
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMsg");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

function openDiscordAlert() {
  alert("خدمة الطلبات الخاصة متاحة عبر الديسكورد الرسمي لـ Art Store!");
}

// Event Listeners on Init
document.addEventListener("DOMContentLoaded", () => {
  renderMaps();

  // Owner Navigation Button
  const ownerNavBtn = document.getElementById("ownerAdminNavBtn");
  if (ownerNavBtn) ownerNavBtn.addEventListener("click", openAdminPanel);

  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) loginBtn.addEventListener("click", openLoginModal);

  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) cartBtn.addEventListener("click", openCartModal);

  // Close Modal handlers
  setupModalDismiss("loginModal", "closeLoginModal");
  setupModalDismiss("cartModal", "closeCartModal");
  setupModalDismiss("adminModal", "closeAdminModal");
  setupModalDismiss("mapProductsModal", "closeMapProductsModal");
  setupModalDismiss("checkoutModal", "closeModal");
});

function setupModalDismiss(modalId, closeBtnId) {
  const modal = document.getElementById(modalId);
  const btn = document.getElementById(closeBtnId);
  if (btn && modal) {
    btn.addEventListener("click", () => modal.classList.remove("active"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("active");
    });
  }
}
