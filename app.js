/**
 * ============================================================
 *  app.js — CampusSwap Application Logic
 * ============================================================
 *  Sections:
 *   1.  In-Memory Data Store
 *       1a. listings[]    — all marketplace items
 *       1b. myListings[]  — current seller's active listings
 *   2.  Application State
 *   3.  Render Functions
 *       3a. renderListings()    — builds the marketplace grid
 *       3b. renderMyListings()  — builds the dashboard listing rows
 *       3c. renderWishlist()    — builds the wishlist grid
 *   4.  Navigation
 *       showPage(name)          — switches the visible page
 *       requireAuth(callback)   — redirects to login if not authenticated
 *   5.  Filter & Search
 *       filterCategory(), filterPrice(), applyCustomPrice(), searchListings()
 *   6.  Item Detail Modal
 *   7.  Wishlist
 *   8.  Messaging / Chat
 *   9.  Authentication
 *       switchTab(), triggerVerification(), verifyToken(), performLogin(), logout()
 *  10.  Sell / List Item
 *  11.  Toast Notification
 *  12.  Initialisation
 * ============================================================
 */


/* ============================================================
   1a. IN-MEMORY DATA STORE — listings[]
   ============================================================ */
const listings = [
  {
    id: 1,
    title: 'Calculus: Early Transcendentals 8th Ed.',
    category: 'Textbooks',
    emoji: '📗',
    price: 180,
    orig: 520,
    cond: 'Good',
    condClass: 'cond-good',
    desc: 'Perfect for MATH 101/201. Highlighted in first 3 chapters only, rest pristine.',
    seller: 'Naledi K.',
    sellerInit: 'NK',
    rating: '⭐ 4.9 (8 sales)',
    campus: 'UB Library Safe Zone'
  },
  {
    id: 2,
    title: 'Dell Inspiron 15 – i5 8GB RAM',
    category: 'Electronics',
    emoji: '💻',
    price: 2800,
    orig: 5500,
    cond: 'Great',
    condClass: 'cond-great',
    desc: '2022 model, charger included. Battery holds 5+ hours. Minor scuff on lid, everything works perfectly.',
    seller: 'Tshego M.',
    sellerInit: 'TM',
    rating: '⭐ 4.8 (12 sales)',
    campus: 'UB Library Safe Zone'
  },
  {
    id: 3,
    title: 'Graduation Gown – BAC Size M',
    category: 'Gowns',
    emoji: '🎓',
    price: 250,
    orig: 800,
    cond: 'Great',
    condClass: 'cond-great',
    desc: 'Worn once at graduation. Dry-cleaned and stored. Comes with the hood. Size Medium fits 165–175cm.',
    seller: 'Mpho S.',
    sellerInit: 'MS',
    rating: '⭐ 5.0 (3 sales)',
    campus: 'BAC Student Hub'
  },
  {
    id: 4,
    title: 'Casio FX-991EX Scientific Calculator',
    category: 'Calculators',
    emoji: '🔢',
    price: 120,
    orig: 280,
    cond: 'Good',
    condClass: 'cond-good',
    desc: 'Works perfectly, all functions tested. Comes with original cover. Ideal for engineering & accounting.',
    seller: 'Keabetswe L.',
    sellerInit: 'KL',
    rating: '⭐ 4.7 (5 sales)',
    campus: 'Botho University Atrium'
  },
  {
    id: 5,
    title: 'Study Desk & Chair Set',
    category: 'Furniture',
    emoji: '🪑',
    price: 350,
    orig: 900,
    cond: 'Good',
    condClass: 'cond-good',
    desc: 'Moving out of campus housing. Solid wood desk 120cm wide + ergonomic chair. Self-collection only.',
    seller: 'Boipelo T.',
    sellerInit: 'BT',
    rating: '⭐ 4.6 (2 sales)',
    campus: 'UB Library Safe Zone'
  },
  {
    id: 6,
    title: 'Introduction to Economics (Mankiw)',
    category: 'Textbooks',
    emoji: '📕',
    price: 90,
    orig: 380,
    cond: 'Fair',
    condClass: 'cond-fair',
    desc: 'Some writing in margins, all pages intact. Good for reference. 7th edition compatible with BAC syllabus.',
    seller: 'Thabo R.',
    sellerInit: 'TR',
    rating: '⭐ 4.5 (7 sales)',
    campus: 'BAC Student Hub'
  },
  {
    id: 7,
    title: 'Apple AirPods 2nd Gen',
    category: 'Electronics',
    emoji: '🎧',
    price: 950,
    orig: 1800,
    cond: 'Great',
    condClass: 'cond-great',
    desc: 'Bought last semester, switching to wired. Case and both pods work perfectly, 85% battery health.',
    seller: 'Lesedi M.',
    sellerInit: 'LM',
    rating: '⭐ 4.9 (14 sales)',
    campus: 'UB Library Safe Zone'
  },
  {
    id: 8,
    title: 'BAC Blazer & Uniform Set',
    category: 'Clothing',
    emoji: '👔',
    price: 180,
    orig: 450,
    cond: 'Good',
    condClass: 'cond-good',
    desc: 'Full BAC uniform blazer + 2 shirts. Size 38. Dry-cleaned, great condition. Graduating and no longer needed.',
    seller: 'Oratile N.',
    sellerInit: 'ON',
    rating: '⭐ 4.8 (6 sales)',
    campus: 'BAC Student Hub'
  },
  {
    id: 9,
    title: 'Organic Chemistry (McMurry) 9th Ed',
    category: 'Textbooks',
    emoji: '📘',
    price: 220,
    orig: 650,
    cond: 'Great',
    condClass: 'cond-great',
    desc: 'Pristine condition, never written in. Includes access code (unused). Essential for science students.',
    seller: 'Phenyo K.',
    sellerInit: 'PK',
    rating: '⭐ 5.0 (2 sales)',
    campus: 'Botho University Atrium'
  },
  {
    id: 10,
    title: 'HP Printer – DeskJet 2700',
    category: 'Electronics',
    emoji: '🖨️',
    price: 480,
    orig: 1100,
    cond: 'Good',
    condClass: 'cond-good',
    desc: 'Prints and scans. Ink partially used, works great. Perfect for assignments. Ink cartridges available locally.',
    seller: 'Gaone D.',
    sellerInit: 'GD',
    rating: '⭐ 4.7 (9 sales)',
    campus: 'UB Library Safe Zone'
  },
  {
    id: 11,
    title: 'Graduation Gown – Size L',
    category: 'Gowns',
    emoji: '🎓',
    price: 200,
    orig: 800,
    cond: 'Good',
    condClass: 'cond-good',
    desc: 'Used at BAC graduation ceremony. Cleaned and stored. Hood included. Size Large, fits 175–185cm.',
    seller: 'Kutlo S.',
    sellerInit: 'KS',
    rating: '⭐ 4.6 (1 sale)',
    campus: 'BAC Student Hub'
  },
  {
    id: 12,
    title: 'Accounting Principles – Weygandt',
    category: 'Textbooks',
    emoji: '📙',
    price: 160,
    orig: 490,
    cond: 'Good',
    condClass: 'cond-good',
    desc: 'BACC 101 text. Sticky tabs on key chapters only. All content intact. Perfect for first year BAC.',
    seller: 'Tshepo B.',
    sellerInit: 'TB',
    rating: '⭐ 4.8 (11 sales)',
    campus: 'BAC Student Hub'
  },
];


/* ============================================================
   1b. IN-MEMORY DATA STORE — myListings[]
   ============================================================ */
const myListings = [
  { title: 'Dell Inspiron 15 Laptop', emoji: '💻', price: 2800, views: 24, cond: 'Great' },
  { title: 'Calculus Textbook',       emoji: '📗', price: 180,  views: 12, cond: 'Good'  },
  { title: 'Study Desk & Chair',      emoji: '🪑', price: 350,  views: 8,  cond: 'Good'  },
];


/* ============================================================
   2. APPLICATION STATE
   ============================================================ */
let currentFilter   = 'All';
let currentSearch   = '';
let currentPriceMin = 0;
let currentPriceMax = Infinity;
let activeListingId = null; // currently open modal's listing id

// Load existing users from storage
const userStore = JSON.parse(localStorage.getItem('myAppUsers')) || {};

function saveUser(email, userData) {
  userStore[email] = userData;
  localStorage.setItem('myAppUsers', JSON.stringify(userStore));
}

/** Currently logged-in user object (null when logged out). */
let currentUser = null;

/** Temporary holder for sign-up data awaiting token verification. */
let pendingSignup    = null;
let pendingTokenCode = null; // the actual generated code

/**
 * Wishlist: array of listing IDs saved by the current user.
 * Persisted to localStorage keyed by email.
 */
function getWishlist() {
  if (!currentUser) return [];
  return JSON.parse(localStorage.getItem('wishlist_' + currentUser.email) || '[]');
}

function saveWishlist(list) {
  if (!currentUser) return;
  localStorage.setItem('wishlist_' + currentUser.email, JSON.stringify(list));
}

/**
 * Conversations store: array of conversation objects.
 * { id, sellerId (init), sellerName, itemId, itemTitle, itemEmoji, messages[] }
 */
function getConversations() {
  if (!currentUser) return [];
  return JSON.parse(localStorage.getItem('convos_' + currentUser.email) || '[]');
}

function saveConversations(convos) {
  if (!currentUser) return;
  localStorage.setItem('convos_' + currentUser.email, JSON.stringify(convos));
}

let activeConvoId = null;

/**
 * BQA-accredited institutions in Botswana
 */
const BQA_INSTITUTIONS = [
  'botswana school of business sciences(bac)',
  'botswana accountancy college',
  'university of botswana',
  'botho university',
  'limkokwing university',
  'baisago university',
  'botswana university of agriculture and natural resources',
  'botswana international university of science and technology',
  'botswana open university',
  'gaborone university college of law and professional studies',
  'gaborone university college',
  'botswana institute of administration and commerce',
  'sebele college of agriculture',
  'bokamoso private hospital school of nursing',
  'tlokweng college of education',
  'francistown college of technical and vocational education',
  'serowe college of education',
  'institute of development management',
  'botswana school of nursing',
  'gaborone technical college',
  'selebi phikwe technical college',
  'lobatse technical college',
  'palapye technical college',
  'kgalagadi technical college',
  'jwaneng college',
  'mahalapye college',
  'ba isago university',
];


/* ============================================================
   3a. RENDER FUNCTIONS — renderListings()
   ============================================================ */
function renderListings() {
  const grid = document.getElementById('listings-grid');
  if (!grid) return;

  const wishlist = getWishlist();

  const filtered = listings.filter(l => {
    const matchesCategory = currentFilter === 'All' || l.category === currentFilter;
    const matchesSearch   = l.title.toLowerCase().includes(currentSearch.toLowerCase())
                          || l.category.toLowerCase().includes(currentSearch.toLowerCase());
    const matchesPrice    = l.price >= currentPriceMin && l.price <= currentPriceMax;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:80px 0; color:var(--muted);">
        <div style="font-size:3rem; margin-bottom:16px;">🔍</div>
        <h3 style="font-family:'Syne',sans-serif; color:var(--navy); margin-bottom:8px;">No listings found</h3>
        <p>Try adjusting your filters or search term.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(l => {
    const isSaved = wishlist.includes(l.id);
    return `
      <div class="listing-card" onclick="openModal(${l.id})">
        <div class="thumb" style="background:var(--cream);">
          ${l.emoji}
          <div class="condition ${l.condClass}">${l.cond}</div>
          <button class="wishlist-heart ${isSaved ? 'saved' : ''}"
            onclick="event.stopPropagation(); quickToggleWishlist(${l.id}, this)"
            title="${isSaved ? 'Remove from wishlist' : 'Save to wishlist'}">${isSaved ? '♥' : '♡'}</button>
        </div>
        <div class="card-info">
          <div class="category">${l.category}</div>
          <h4>${l.title}</h4>
          <div class="desc">${l.desc}</div>
          <div class="card-footer">
            <div class="price-tag">
              P ${l.price.toLocaleString()}
              <span class="orig">P ${l.orig.toLocaleString()}</span>
            </div>
            <div class="seller-info">
              <div class="avatar-xs">${l.sellerInit}</div>
              <span>${l.seller.split(' ')[0]}</span>
            </div>
          </div>
          <div style="margin-top:8px; font-size:.75rem; color:var(--muted);">${l.rating}</div>
        </div>
      </div>`;
  }).join('');
}


/* ============================================================
   3b. RENDER FUNCTIONS — renderMyListings()
   ============================================================ */
function renderMyListings() {
  const el = document.getElementById('my-listings');
  if (!el) return;

  el.innerHTML = myListings.map(l => `
    <div class="listing-row">
      <div class="thumb-sm" style="background:var(--cream);">${l.emoji}</div>
      <div class="info">
        <h4>${l.title}</h4>
        <p>${l.views} views · ${l.cond} condition</p>
      </div>
      <div class="price-sm">P ${l.price.toLocaleString()}</div>
    </div>
  `).join('');
}


/* ============================================================
   3c. RENDER FUNCTIONS — renderWishlist()
   ============================================================ */
function renderWishlist() {
  const grid  = document.getElementById('wishlist-grid');
  const empty = document.getElementById('wishlist-empty');
  if (!grid) return;

  const wishlist      = getWishlist();
  const savedListings = listings.filter(l => wishlist.includes(l.id));

  if (savedListings.length === 0) {
    grid.innerHTML  = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  grid.innerHTML = savedListings.map(l => `
    <div class="listing-card" onclick="openModal(${l.id})">
      <div class="thumb" style="background:var(--cream);">
        ${l.emoji}
        <div class="condition ${l.condClass}">${l.cond}</div>
        <button class="wishlist-heart saved"
          onclick="event.stopPropagation(); quickToggleWishlist(${l.id}, this); renderWishlist();"
          title="Remove from wishlist">♥</button>
      </div>
      <div class="card-info">
        <div class="category">${l.category}</div>
        <h4>${l.title}</h4>
        <div class="desc">${l.desc}</div>
        <div class="card-footer">
          <div class="price-tag">
            P ${l.price.toLocaleString()}
            <span class="orig">P ${l.orig.toLocaleString()}</span>
          </div>
          <div class="seller-info">
            <div class="avatar-xs">${l.sellerInit}</div>
            <span>${l.seller.split(' ')[0]}</span>
          </div>
        </div>
        <div style="margin-top:8px; display:flex; gap:8px;">
          <button class="btn btn-primary" style="flex:1; justify-content:center; padding:8px; font-size:.8rem;"
            onclick="event.stopPropagation(); startChatWith(${l.id})">💬 Message Seller</button>
        </div>
      </div>
    </div>
  `).join('');
}


/* ============================================================
   4. NAVIGATION — showPage(name)
   ============================================================ */
function showPage(name) {
  // If user is already logged in and tries to go to home page,
  // redirect them to marketplace (home is the landing/logged-out page)
  if (name === 'home' && currentUser) {
    name = 'marketplace';
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (!page) return;
  page.classList.add('active');
  window.scrollTo(0, 0);

  if (name === 'marketplace') renderListings();
  if (name === 'dashboard')   renderMyListings();
  if (name === 'wishlist')    renderWishlist();
  if (name === 'messages')    renderConversations();

  // Update dashboard greeting if a user is logged in
  if (name === 'dashboard' && currentUser) {
    const greetEl = document.getElementById('dashboard-greeting');
    if (greetEl) greetEl.textContent = `👋 Welcome back, ${currentUser.firstName}`;
    const subEl = document.getElementById('dashboard-sub');
    if (subEl) subEl.textContent = `${currentUser.institution} · Verified Student ⭐ 4.8 · 12 sales`;
  }
}

/**
 * requireAuth(callback)
 * If user is logged in, runs the callback.
 * Otherwise redirects to auth page with a nudge toast.
 */
function requireAuth(callback) {
  if (currentUser) {
    callback();
  } else {
    showToast('Please log in or create an account to continue.', '🔒');
    showPage('auth');
  }
}


/* ============================================================
   5. FILTER & SEARCH
   ============================================================ */
function filterCategory(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderListings();
}

function filterMarketplace(cat) {
  showPage('marketplace');
  currentFilter = cat;
  setTimeout(() => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.textContent.includes(cat));
    });
    renderListings();
  }, 50);
}

function filterPrice(range, btn) {
  // Clear custom inputs
  document.getElementById('price-min').value = '';
  document.getElementById('price-max').value = '';

  document.querySelectorAll('.price-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  if (range === 'all') {
    currentPriceMin = 0;
    currentPriceMax = Infinity;
  } else {
    const [min, max] = range.split('-').map(Number);
    currentPriceMin = min;
    currentPriceMax = max;
  }
  renderListings();
}

function applyCustomPrice() {
  const minVal = document.getElementById('price-min').value;
  const maxVal = document.getElementById('price-max').value;

  // Deactivate preset buttons when custom range is typed
  document.querySelectorAll('.price-btn').forEach(b => b.classList.remove('active'));

  currentPriceMin = minVal ? parseInt(minVal, 10) : 0;
  currentPriceMax = maxVal ? parseInt(maxVal, 10) : Infinity;
  renderListings();
}

function searchListings() {
  currentSearch = document.getElementById('search-input').value;
  renderListings();
}


/* ============================================================
   6. ITEM DETAIL MODAL
   ============================================================ */
function openModal(id) {
  const listing = listings.find(x => x.id === id);
  if (!listing) return;

  activeListingId = id;

  document.getElementById('modal-title').textContent  = listing.title;
  document.getElementById('modal-img').textContent    = listing.emoji;
  document.getElementById('modal-img').style.background = 'var(--cream)';
  document.getElementById('modal-price').textContent  = `P ${listing.price.toLocaleString()}`;
  document.getElementById('modal-desc').textContent   = listing.desc;
  document.getElementById('modal-cond').textContent   = listing.cond;
  document.getElementById('modal-seller').textContent = listing.seller;
  document.getElementById('modal-campus').textContent = listing.campus;
  document.getElementById('modal-rating').textContent = listing.rating;

  // Update save button state
  updateModalSaveBtn();

  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  activeListingId = null;
}

function updateModalSaveBtn() {
  const btn      = document.getElementById('modal-save-btn');
  const wishlist = getWishlist();
  if (!btn || activeListingId === null) return;
  const isSaved = wishlist.includes(activeListingId);
  btn.textContent = isSaved ? '♥ Saved' : '♡ Save';
  btn.style.background = isSaved ? 'var(--gold-light)' : '';
}

document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target.id === 'modal') closeModal();
});


/* ============================================================
   7. WISHLIST
   ============================================================ */
function toggleWishlist() {
  if (!currentUser) {
    showToast('Please log in to save items to your wishlist.', '🔒');
    closeModal();
    showPage('auth');
    return;
  }
  if (activeListingId === null) return;

  const wishlist = getWishlist();
  const idx      = wishlist.indexOf(activeListingId);

  if (idx === -1) {
    wishlist.push(activeListingId);
    showToast('Item saved to your wishlist! ♥', '💛');
  } else {
    wishlist.splice(idx, 1);
    showToast('Removed from wishlist.', '👋');
  }

  saveWishlist(wishlist);
  updateModalSaveBtn();
  renderListings(); // refresh heart icons in grid
}

function quickToggleWishlist(id, btn) {
  if (!currentUser) {
    showToast('Please log in to save items.', '🔒');
    showPage('auth');
    return;
  }

  const wishlist = getWishlist();
  const idx      = wishlist.indexOf(id);

  if (idx === -1) {
    wishlist.push(id);
    btn.textContent = '♥';
    btn.classList.add('saved');
    showToast('Saved to wishlist!', '💛');
  } else {
    wishlist.splice(idx, 1);
    btn.textContent = '♡';
    btn.classList.remove('saved');
    showToast('Removed from wishlist.', '👋');
  }

  saveWishlist(wishlist);
}


/* ============================================================
   8. MESSAGING / CHAT
   ============================================================ */

/**
 * openChatFromModal()
 * Called when "Message Seller" is clicked in the item modal.
 */
function openChatFromModal() {
  if (!currentUser) {
    showToast('Please log in to message sellers.', '🔒');
    closeModal();
    showPage('auth');
    return;
  }

  if (activeListingId === null) return;
  startChatWith(activeListingId);
  closeModal();
}

/**
 * startChatWith(listingId)
 * Opens or creates a conversation with the seller of the given listing.
 */
function startChatWith(listingId) {
  const listing = listings.find(l => l.id === listingId);
  if (!listing) return;

  const convos = getConversations();
  let convo    = convos.find(c => c.itemId === listingId);

  if (!convo) {
    convo = {
      id:         Date.now(),
      sellerInit: listing.sellerInit,
      sellerName: listing.seller,
      itemId:     listingId,
      itemTitle:  listing.title,
      itemEmoji:  listing.emoji,
      itemPrice:  listing.price,
      messages:   [
        {
          from: 'seller',
          text: `Hi there! Thanks for your interest in "${listing.title}". Feel free to ask any questions!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    convos.unshift(convo);
    saveConversations(convos);
  }

  showPage('messages');
  setTimeout(() => openConversation(convo.id), 50);
}

/**
 * renderConversations()
 * Populates the left sidebar with conversation previews.
 */
function renderConversations() {
  const list = document.getElementById('convo-list');
  if (!list) return;

  const convos = getConversations();

  if (convos.length === 0) {
    list.innerHTML = `
      <div style="padding:32px 20px; text-align:center; color:var(--muted);">
        <div style="font-size:2.5rem; margin-bottom:12px;">💬</div>
        <p style="font-size:.88rem;">No conversations yet.<br>Message a seller to start chatting.</p>
      </div>`;
    return;
  }

  list.innerHTML = convos.map(c => {
    const lastMsg  = c.messages[c.messages.length - 1];
    const isActive = c.id === activeConvoId;
    return `
      <div class="convo-item ${isActive ? 'active' : ''}" onclick="openConversation(${c.id})">
        <div class="convo-avatar">${c.sellerInit}</div>
        <div class="convo-preview">
          <div class="convo-name">${c.sellerName}</div>
          <div class="convo-item-label">${c.itemEmoji} ${c.itemTitle}</div>
          <div class="convo-last">${lastMsg ? lastMsg.text.slice(0, 48) + (lastMsg.text.length > 48 ? '…' : '') : ''}</div>
        </div>
      </div>`;
  }).join('');
}

/**
 * openConversation(id)
 * Loads a specific conversation into the right chat panel.
 */
function openConversation(id) {
  const convos = getConversations();
  const convo  = convos.find(c => c.id === id);
  if (!convo) return;

  activeConvoId = id;

  // Update header
  document.getElementById('chat-avatar').textContent    = convo.sellerInit;
  document.getElementById('chat-seller-name').textContent = convo.sellerName;
  document.getElementById('chat-item-name').textContent = `${convo.itemEmoji} ${convo.itemTitle}`;

  // Item preview pill
  document.getElementById('chat-item-preview').innerHTML = `
    <div class="chat-item-pill">
      <span>${convo.itemEmoji}</span>
      <span>${convo.itemTitle}</span>
      <span class="price-pill">P ${convo.itemPrice.toLocaleString()}</span>
    </div>`;

  // Render messages
  const msgArea = document.getElementById('chat-messages');
  const empty   = document.getElementById('chat-empty-state');
  if (empty) empty.style.display = 'none';

  msgArea.innerHTML = convo.messages.map(m => `
    <div class="chat-bubble-row ${m.from === 'me' ? 'mine' : 'theirs'}">
      ${m.from !== 'me' ? `<div class="bubble-avatar">${convo.sellerInit}</div>` : ''}
      <div class="chat-bubble ${m.from === 'me' ? 'bubble-me' : 'bubble-them'}">
        ${m.text}
        <span class="bubble-time">${m.time}</span>
      </div>
    </div>
  `).join('');

  // Scroll to bottom
  msgArea.scrollTop = msgArea.scrollHeight;

  // Show input
  document.getElementById('chat-input-area').style.display = 'flex';

  // Refresh sidebar to highlight active
  renderConversations();
}

/**
 * sendMessage()
 * Sends a message and generates an auto-reply from the seller.
 */
function sendMessage() {
  const input = document.getElementById('chat-input');
  const text  = input.value.trim();
  if (!text || !activeConvoId) return;

  const convos = getConversations();
  const convo  = convos.find(c => c.id === activeConvoId);
  if (!convo) return;

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  convo.messages.push({ from: 'me', text, time: now });
  input.value = '';

  // Simple auto-reply simulation
  const replies = [
    'Sure, that sounds good! When are you free to meet?',
    'The item is still available. Would you like to arrange a Safe Zone pickup?',
    'I can do that price. Let\'s meet at BAC Student Hub this week?',
    'Yes, everything is in the condition as described. Feel free to inspect it at pickup.',
    'Thanks for reaching out! I\'ll message you the meetup details shortly.',
  ];
  const reply = replies[Math.floor(Math.random() * replies.length)];

  setTimeout(() => {
    const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    convo.messages.push({ from: 'seller', text: reply, time: replyTime });
    saveConversations(convos);
    openConversation(activeConvoId);
  }, 1000 + Math.random() * 1000);

  saveConversations(convos);
  openConversation(activeConvoId);
}


/* ============================================================
   9. AUTHENTICATION
   ============================================================ */
function isBQAAccredited(name) {
  const normalised = name.trim().toLowerCase();
  if (!normalised) return false;
  return BQA_INSTITUTIONS.some(inst =>
    normalised.includes(inst) || inst.includes(normalised)
  );
}

/** switchToLogin() — navigates to auth page with Login tab pre-selected */
function switchToLogin() {
  showPage('auth');
  setTimeout(() => switchTab('login'), 50);
}

function switchTab(tab) {
  document.getElementById('form-signup').style.display = (tab === 'signup') ? 'block' : 'none';
  document.getElementById('form-login').style.display  = (tab === 'login')  ? 'block' : 'none';
  document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
  document.getElementById('tab-login').classList.toggle('active',  tab === 'login');
}

/**
 * generateCode()
 * Returns a random 6-digit numeric code as a string.
 */
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * triggerVerification()
 * Validates sign-up fields, generates a verification code,
 * and "sends" it to the user's email (simulated via EmailJS or console).
 * The code is stored in pendingTokenCode — NOT shown in the UI.
 */
function triggerVerification() {
  const email       = document.getElementById('signup-email').value.trim();
  const firstName   = document.getElementById('signup-firstname').value.trim();
  const lastName    = document.getElementById('signup-lastname').value.trim();
  const institution = document.getElementById('signup-institution').value.trim();
  const password    = document.getElementById('signup-password').value;

  if (!firstName || !lastName || !email || !institution || !password) {
    showToast('Please fill in all fields before continuing.', '❌');
    return;
  }

  if (!email.includes('@') || !email.endsWith('.ac.bw')) {
    showToast('Please enter a valid .ac.bw institutional email address.', '❌');
    return;
  }

  if (userStore[email]) {
    showToast('An account with this email already exists. Please log in.', '❌');
    return;
  }

  if (!isBQAAccredited(institution)) {
    showToast('Your institution must be BQA-accredited to join CampusSwap.', '❌');
    return;
  }

  if (password.length < 6) {
    showToast('Password must be at least 6 characters long.', '❌');
    return;
  }

  // Generate a fresh 6-digit code
  pendingTokenCode = generateCode();
  pendingSignup    = { email, firstName, lastName, institution, password };

  // ── Send verification email via EmailJS ─────────────────
  emailjs.send('service_z6tgz3m', 'template_uv7oq51', {
    to_email: email,
    to_name:  firstName,
    code:     pendingTokenCode,
  }).then(function() {
    console.log('Verification email sent.');
  }).catch(function(err) {
    console.error('EmailJS error:', err);
    showToast('Could not send email. Please try again.', '❌');
  });
  // ────────────────────────────────────────────────────────

  // Update the UI — show email address but NOT the code
  document.getElementById('token-sent-info').textContent =
    `A 6-digit verification code has been sent to ${email}. Check your inbox (and spam folder).`;
  document.getElementById('token-box').style.display = 'block';

  showToast(`Verification code sent to ${email}!`, '📧');
}

/**
 * resendCode()
 * Re-generates and "re-sends" the verification code.
 */
function resendCode() {
  if (!pendingSignup) {
    showToast('Please fill in the sign-up form first.', '❌');
    return;
  }
  pendingTokenCode = generateCode();
  emailjs.send('service_z6tgz3m', 'template_uv7oq51', {
    to_email: pendingSignup.email,
    to_name:  pendingSignup.firstName,
    code:     pendingTokenCode,
  }).then(function() {
    showToast(`New code sent to ${pendingSignup.email}!`, '📧');
  }).catch(function(err) {
    console.error('EmailJS resend error:', err);
    showToast('Could not resend email. Please try again.', '❌');
  });
}

/**
 * verifyToken()
 * Validates the entered code against pendingTokenCode.
 * On success, saves the account and logs the user in.
 */
function verifyToken() {
  const val = document.getElementById('token-input').value.trim();

  if (!pendingTokenCode || !pendingSignup) {
    showToast('Something went wrong. Please try signing up again.', '❌');
    return;
  }

  if (val !== pendingTokenCode) {
    showToast('Incorrect code. Please check your email and try again.', '❌');
    return;
  }

  // Persist account
  userStore[pendingSignup.email] = {
    password:    pendingSignup.password,
    firstName:   pendingSignup.firstName,
    lastName:    pendingSignup.lastName,
    institution: pendingSignup.institution,
  };
  localStorage.setItem('myAppUsers', JSON.stringify(userStore));

  // Log in automatically
  currentUser = {
    email:       pendingSignup.email,
    firstName:   pendingSignup.firstName,
    lastName:    pendingSignup.lastName,
    institution: pendingSignup.institution,
  };

  pendingSignup    = null;
  pendingTokenCode = null;

  updateNavForAuthState();
  showToast(`Welcome to CampusSwap, ${currentUser.firstName}! 🎉`, '✅');
  setTimeout(() => showPage('marketplace'), 1200);
}

/**
 * performLogin()
 */
function performLogin() {
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email.includes('@') || !email.endsWith('.ac.bw')) {
    showToast('Please enter your .ac.bw institutional email address.', '❌');
    return;
  }

  if (!userStore[email]) {
    showToast('No account found with that email. Please sign up first.', '❌');
    return;
  }

  if (userStore[email].password !== password) {
    showToast('Incorrect password. Please try again.', '❌');
    return;
  }

  const account = userStore[email];
  currentUser = {
    email,
    firstName:   account.firstName,
    lastName:    account.lastName,
    institution: account.institution,
  };

  updateNavForAuthState();
  showToast(`Welcome back, ${currentUser.firstName}! 👋`, '✅');
  setTimeout(() => showPage('marketplace'), 1000);
}

/**
 * logout()
 */
function logout() {
  currentUser    = null;
  activeConvoId  = null;
  updateNavForAuthState();
  showToast('You have been logged out.', '👋');
  showPage('home');
}

/**
 * updateNavForAuthState()
 * Shows/hides nav elements based on login state.
 * Also shows/hides the auth-gated nav links.
 */
function updateNavForAuthState() {
  const loginBtn  = document.getElementById('nav-login-btn');
  const userPill  = document.getElementById('nav-user-pill');
  const userName  = document.getElementById('nav-user-name');
  const navLinks  = document.getElementById('nav-links-auth');
  const listBtn   = document.getElementById('nav-list-btn');

  if (currentUser) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (userPill) userPill.style.display = 'flex';
    if (userName) userName.textContent   = currentUser.firstName;
    if (navLinks) navLinks.style.display = 'flex';
    if (listBtn)  listBtn.style.display  = '';
  } else {
    if (loginBtn) loginBtn.style.display = '';
    if (userPill) userPill.style.display = 'none';
    if (navLinks) navLinks.style.display = 'none';
    if (listBtn)  listBtn.style.display  = 'none';
  }
}


/* ============================================================
   10. SELL / LIST ITEM
   ============================================================ */
function simulateUpload(el) {
  document.getElementById('upload-icon').textContent = '✅';
  document.getElementById('upload-text').textContent = 'Photos uploaded! (demo)';
  el.style.background  = 'var(--gold-light)';
  el.style.borderColor = 'var(--gold)';
}

function submitListing() {
  const title     = document.getElementById('item-title').value;
  const price     = document.getElementById('item-price').value;
  const cat       = document.getElementById('item-category').value;
  const desc      = document.getElementById('item-desc').value;
  const condition = document.getElementById('item-condition').value;
  const campus    = document.getElementById('item-campus').value;

  if (!title || !price || !cat) {
    showToast('Please fill in all required fields.', '❌');
    return;
  }

  function categoryEmoji(category) {
    const map = {
      'Electronics': '💻',
      'Textbooks':   '📗',
      'Gowns':       '🎓',
      'Clothing':    '👔',
      'Furniture':   '🪑',
      'Calculators': '🔢',
    };
    return map[category] || '📦';
  }

  const sellerName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName.charAt(0)}.`
    : 'Tshego M.';
  const sellerInit = currentUser
    ? `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`
    : 'TM';

  const newItem = {
    id:        listings.length + 1,
    title,
    category:  cat,
    emoji:     categoryEmoji(cat),
    price:     parseInt(price, 10),
    orig:      parseInt(price, 10) * 2,
    cond:      condition.split(' ')[0] || 'Good',
    condClass: 'cond-good',
    desc:      desc || 'Great item in good condition.',
    seller:    sellerName,
    sellerInit,
    rating:    '⭐ New Seller',
    campus,
  };

  listings.unshift(newItem);
  myListings.unshift({
    title,
    emoji: newItem.emoji,
    price: parseInt(price, 10),
    views: 0,
    cond:  'Good',
  });

  showToast('Listing published successfully! 🚀', '✅');
  setTimeout(() => showPage('marketplace'), 1200);
}


/* ============================================================
   11. TOAST NOTIFICATION — showToast(msg, icon)
   ============================================================ */
function showToast(msg, icon = '✅') {
  const toast = document.getElementById('toast');
  document.getElementById('toast-msg').textContent  = msg;
  document.getElementById('toast-icon').textContent = icon;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}


/* ============================================================
   12. INITIALISATION
   ============================================================ */
// On load, nav links are hidden — they appear after login
updateNavForAuthState();
// Home page is the default active page (landing)
// renderListings is called when user navigates to marketplace
