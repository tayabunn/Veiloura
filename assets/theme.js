/**
 * VEILOURA E-COMMERCE SHOPIFY OS 2.0 INTERACTIVE JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  initCategoryFilter();
  initWishlistToggle();
  initQuickAddToCart();
  initHeroCarousel();
});

/**
 * 1. Category Filter Tabs in Featured Collection
 */
function initCategoryFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const productCards = document.querySelectorAll('.product-grid .product-card');

  if (!filterTabs.length || !productCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Toggle active class
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      // Filter product items
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * 2. Wishlist Toggle Interactivity
 */
function initWishlistToggle() {
  document.addEventListener('click', (e) => {
    const wishlistBtn = e.target.closest('.product-card-wishlist');
    if (!wishlistBtn) return;

    e.preventDefault();
    wishlistBtn.classList.toggle('active');
    
    // Quick scale feedback animation
    wishlistBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
      wishlistBtn.style.transform = 'scale(1)';
    }, 200);
  });
}

/**
 * 3. Quick Add to Cart State & AJAX Simulation
 */
function initQuickAddToCart() {
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.js-add-to-cart');
    if (!addBtn) return;

    e.preventDefault();

    const originalText = addBtn.innerHTML;
    addBtn.innerHTML = `
      <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
      </svg> Adding...
    `;

    setTimeout(() => {
      addBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg> Added!
      `;
      addBtn.style.backgroundColor = '#16a34a';
      addBtn.style.color = '#ffffff';

      // Update cart count badge
      const cartBadge = document.querySelector('.header-cart-badge');
      if (cartBadge) {
        let currentCount = parseInt(cartBadge.textContent || '0', 10);
        cartBadge.textContent = currentCount + 1;
        
        // Bounce animation
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
          cartBadge.style.transform = 'scale(1)';
        }, 200);
      }

      // Reset button after 2.5s
      setTimeout(() => {
        addBtn.innerHTML = originalText;
        addBtn.style.backgroundColor = '';
        addBtn.style.color = '';
      }, 2500);
    }, 600);
  });
}

/**
 * 4. Hero Carousel Preview Slider
 */
function initHeroCarousel() {
  const prevBtn = document.querySelector('.hero-nav-arrow.prev');
  const nextBtn = document.querySelector('.hero-nav-arrow.next');
  
  if (!prevBtn || !nextBtn) return;

  const sampleProducts = [
    {
      title: "Nerdy Sparkling Short Sleeve T-Shirt Black",
      category: "Apparel • Shirt",
      price: "$150",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Kato X Zip Essential Oversized Jacket",
      category: "Apparel • Outerwear",
      price: "$300",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Sario SS Modern Fit Minimalist Shirt",
      category: "Apparel • Shirt",
      price: "$220",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop"
    }
  ];

  let currentIndex = 0;

  function updateHeroPreview(index) {
    const p = sampleProducts[index];
    const imgEl = document.querySelector('.hero-preview-image-box img');
    const titleEl = document.querySelector('.hero-preview-title');
    const catEl = document.querySelector('.hero-preview-category');
    const priceEl = document.querySelector('.hero-preview-price');

    if (imgEl && titleEl && catEl && priceEl) {
      imgEl.style.opacity = '0.4';
      setTimeout(() => {
        imgEl.src = p.image;
        titleEl.textContent = p.title;
        catEl.textContent = p.category;
        priceEl.textContent = p.price;
        imgEl.style.opacity = '1';
      }, 150);
    }
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + sampleProducts.length) % sampleProducts.length;
    updateHeroPreview(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % sampleProducts.length;
    updateHeroPreview(currentIndex);
  });
}


