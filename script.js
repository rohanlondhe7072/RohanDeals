/* Rohan Deals - Main JavaScript
   Centralized product data, featured rendering, filtering and search
   - Edit only the `products` array to add/remove products
   - No external libraries
*/

// products are now provided via `products.js`.
// The `products` variable is expected to be defined globally by that file.

// ---------- DOM references ----------
const featuredContainer = document.querySelector('[data-featured]');
const heroProductContainer = document.querySelector('[data-hero-product]');
const dealsGrid = document.querySelector('[data-deals-grid]');
const categoryFiltersContainer = document.querySelector('[data-category-filters]');
const searchInput = document.querySelector('#search');
const navToggle = document.querySelector('[data-nav-toggle]');
const navLinks = document.querySelector('[data-nav-links]');

// ---------- Helpers ----------
function uniqueCategories(list) {
  const set = new Set(list.map(p => p.category || 'Other Deals'));
  return ['All Deals', ...Array.from(set)];
}

function safeText(text) {
  return text ? text : '';
}

function getProductsNewestFirst(list) {
  return [...list].sort((a, b) => {
    // Primary: createdAt ISO timestamp (preferred)
    const aCreated = Date.parse(a.createdAt || '') || 0;
    const bCreated = Date.parse(b.createdAt || '') || 0;
    if (bCreated !== aCreated) return bCreated - aCreated;

    // Secondary: legacy dateAdded (YYYY-MM-DD)
    const aDate = Date.parse(a.dateAdded || '') || 0;
    const bDate = Date.parse(b.dateAdded || '') || 0;
    if (bDate !== aDate) return bDate - aDate;

    // Final deterministic fallback: use numeric `id` descending
    return (b.id || 0) - (a.id || 0);
  });
}

function renderHeroProduct() {
  if (!heroProductContainer) return;

  const product = getProductsNewestFirst(products)[0];

  if (!product) {
    heroProductContainer.innerHTML = '';
    return;
  }

  heroProductContainer.innerHTML = `
    <article class="hero-product-card">

      <div class="hero-product-image">
        <img 
          src="${product.image}" 
          alt="${product.name}"
          loading="eager"
        >
      </div>

      <div class="hero-product-content">

        <div class="hero-product-label">
          Latest Deal
        </div>

        <h2>${product.name}</h2>

        ${
          product.price
            ? `
              <div class="hero-price-row">
                <span class="hero-price">${product.price}</span>
                ${
                  product.originalPrice
                    ? `<span class="hero-original-price">${product.originalPrice}</span>`
                    : ''
                }
              </div>
            `
            : ''
        }

        ${
          product.discount
            ? `<span class="hero-discount">${product.discount}</span>`
            : ''
        }

        <a
          class="button button-primary hero-view-button"
          href="${product.affiliateLink}"
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
        >
          View Deal →
        </a>

      </div>

    </article>
  `;

  const img = heroProductContainer.querySelector('img');

  if (img) {
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
  }
}

// ---------- Rendering ----------
function renderFeatured() {
  if (!featuredContainer) return;
  const product = getProductsNewestFirst(products)[0];
  if (!product) {
    featuredContainer.innerHTML = '<div class="featured-empty">No featured product selected.</div>';
    return;
  }

  // Build featured HTML using only data from product object
  const html = `
    <article class="featured-card" aria-labelledby="featured-title">
      <div class="featured-media">
        <img src="${product.image}" alt="${product.name}" loading="eager" decoding="auto">
      </div>
      <div class="featured-content">
        <div class="badge ${product.discount ? 'hot' : 'neutral'}" ${product.discount ? '' : 'hidden'}>${safeText(product.discount)}</div>
        <h3 id="featured-title" class="product-title">${product.name}</h3>
        ${product.price ? `<div class="price-row"><span class="price">${product.price}</span><span class="original-price">${product.originalPrice}</span></div>` : ''}
        <div class="product-meta">
          ${product.rating ? `<span class="badge rating">★ ${product.rating}</span>` : ''}
          ${product.reviews ? `<span class="badge hot">${product.reviews}</span>` : ''}
        </div>
        <p class="product-copy">${product.description}</p>
        <div class="product-actions">
          <a class="button button-primary" href="${product.affiliateLink}" target="_blank" rel="noopener noreferrer nofollow sponsored" aria-label="View ${product.name} deal">View Deal</a>
        </div>
      </div>
    </article>
  `;

  featuredContainer.innerHTML = html;

  // Handle image fallback
  const img = featuredContainer.querySelector('img');
  if (img) img.addEventListener('error', () => featuredContainer.querySelector('.featured-media').classList.add('no-image'));
}

function renderProducts(list) {
  if (!dealsGrid) return;
  if (!list || list.length === 0) {
    dealsGrid.innerHTML = '<p class="no-results">No products found.</p>';
    return;
  }

  dealsGrid.innerHTML = list.map(product => {
    return `
      <article class="deal-card" role="listitem" data-id="${product.id}" data-category="${product.category}">
        <div class="deal-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">
          <div class="image-fallback">No image</div>
        </div>
        <div class="deal-body">
          ${product.category ? `<div class="deal-category">${product.category}</div>` : ''}
          <h3 class="deal-title">${product.name}</h3>
          <p class="deal-desc">${product.description}</p>
          ${product.price ? `<div class="deal-price-row"><span class="price">${product.price}</span><span class="original-price">${product.originalPrice || ''}</span></div>` : ''}
          <div class="deal-footer">
            <div class="rating-row">
              ${product.rating ? `<span class="badge rating">★ ${product.rating}</span>` : ''}
              ${product.reviews ? `<span class="reviews">${product.reviews}</span>` : ''}
            </div>
            <a class="button button-primary" href="${product.affiliateLink}" target="_blank" rel="noopener noreferrer nofollow sponsored" aria-label="View ${product.name} deal (opens in new tab)">View Deal</a>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach image error handlers to show fallback
  dealsGrid.querySelectorAll('.deal-image img').forEach(img => {
    img.addEventListener('error', () => {
      const parent = img.closest('.deal-image');
      if (parent) parent.classList.add('no-image');
      img.style.display = 'none';
    });
  });
}

// ---------- Filtering & Search ----------
let activeCategory = 'All Deals';
let activeQuery = '';

function filterAndSearch() {
  const q = activeQuery.trim().toLowerCase();
  const filtered = getProductsNewestFirst(products).filter(p => {
    const matchCategory = (activeCategory === 'All Deals') || (p.category === activeCategory);
    if (!matchCategory) return false;
    if (!q) return true;
    const inName = p.name && p.name.toLowerCase().includes(q);
    const inCategory = p.category && p.category.toLowerCase().includes(q);
    const inDesc = p.description && p.description.toLowerCase().includes(q);
    return inName || inCategory || inDesc;
  });

  renderProducts(filtered);
}

function setupCategoryFilters() {
  if (!categoryFiltersContainer) return;
  const categories = uniqueCategories(products);
  categoryFiltersContainer.innerHTML = categories.map(cat => `
    <button class="category-button ${cat === activeCategory ? 'active' : ''}" type="button" data-category="${cat}">${cat}</button>
  `).join('');

  categoryFiltersContainer.querySelectorAll('.category-button').forEach(btn => {
    btn.addEventListener('click', () => {
      categoryFiltersContainer.querySelectorAll('.category-button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      filterAndSearch();
      // move focus back to search for quick keyboard usage
      if (searchInput) searchInput.focus();
    });
  });
}

function setupSearch() {
  if (!searchInput) return;
  let timeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      activeQuery = e.target.value || '';
      filterAndSearch();
    }, 180);
  });
}

// Optional: setup category cards in the larger categories section to trigger filtering
function setupCategoryCards() {
  const categoryGrid = document.querySelector('.category-grid');
  if (!categoryGrid) return;
  categoryGrid.querySelectorAll('.category-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      if (!cat) return;
      // update small category filters toolbar active state if present
      if (categoryFiltersContainer) {
        categoryFiltersContainer.querySelectorAll('.category-button').forEach(b => b.classList.remove('active'));
        const target = Array.from(categoryFiltersContainer.querySelectorAll('.category-button')).find(b => b.getAttribute('data-category') === cat);
        if (target) target.classList.add('active');
      }
      activeCategory = cat;
      filterAndSearch();
      // scroll to deals
      const dealsSection = document.getElementById('deals');
      if (dealsSection) dealsSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ---------- Navigation (mobile) ----------
function setupNav() {
  if (!navToggle || !navLinks) return;
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  renderHeroProduct();
  renderFeatured();
  setupCategoryFilters();
  renderProducts(getProductsNewestFirst(products));
  setupSearch();
  setupNav();
  setupCategoryCards();
});
