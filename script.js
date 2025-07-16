
document.querySelector('.cta-btn').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('to-products').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
});

let cart = [];
let cartCount = 0;

const toastSound = new Audio('sounds/success.wav');

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  toastSound.currentTime = 0;  
  toastSound.play();         

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2500);
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const product = btn.closest('.product-card');
    const name = product.querySelector('h3').textContent;
    const priceText = product.querySelector('.price').textContent
      .replace("Ksh", "")
      .replace(/,/g, "")
      .trim();
    const price = parseInt(priceText);

    cart.push({ name, price });
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;

    showToast(`${name} added to cart `);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
});

document.getElementById('search').addEventListener('input', function () {
  const keyword = this.value.toLowerCase();
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.dataset.name.toLowerCase();
    card.style.display = name.includes(keyword) ? 'block' : 'none';
  });
});

document.getElementById('view-cart').addEventListener('click', () => {
  const modal = document.getElementById('checkout-modal');
  const overlay = document.getElementById('modal-overlay');
  const itemsList = document.getElementById('cart-items');
  const totalEl = document.getElementById('checkout-total');
  const emptyMsg = document.getElementById('empty-cart-msg');
  const confirmBtn = document.getElementById('confirm-order');

  itemsList.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    emptyMsg.style.display = 'block';
    confirmBtn.disabled = true;
  } else {
    emptyMsg.style.display = 'none';
    confirmBtn.disabled = false;
  }

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - Ksh ${item.price.toLocaleString()}
      <button class="remove-btn" data-index="${index}">🗑 Remove</button>
    `;
    itemsList.appendChild(li);
    total += item.price;
  });

  totalEl.textContent = total.toLocaleString();

  itemsList.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      const removed = cart.splice(index, 1)[0];
      cartCount--;
      document.getElementById('cart-count').textContent = cartCount;
      showToast(`${removed.name} removed `);
      document.getElementById('view-cart').click(); 
    });
  });

  modal.style.display = 'block';
});

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('checkout-modal').style.display = 'none';
});

document.getElementById('modal-overlay').addEventListener('click', () => {
  document.getElementById('checkout-modal').style.display = 'none';
});

document.getElementById('confirm-order').addEventListener('click', () => {
  let message = "🛍️ My StrideX Order:\n";
  let total = 0;

  cart.forEach(item => {
    message += `- ${item.name} @ Ksh ${item.price.toLocaleString()}\n`;
    total += item.price;
  });

  message += `\nTotal: Ksh ${total.toLocaleString()}`;
  const phoneNumber = "254745754496"; 
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
  document.getElementById('checkout-modal').style.display = 'none';
  cart = [];
  cartCount = 0;
  document.getElementById('cart-count').textContent = 0;
});






