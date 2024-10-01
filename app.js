// Initialize an empty orders array
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Get elements
const orderInput = document.getElementById('order-number');
const addOrderBtn = document.getElementById('add-order-btn');
const ordersList = document.getElementById('orders');

// Function to render the orders list
function renderOrders() {
  ordersList.innerHTML = '';
  orders.forEach((order, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${order.number}</span>
      <button onclick="completeOrder(${index})">Complete</button>
    `;
    ordersList.appendChild(li);
  });
}

// Add a new order
addOrderBtn.addEventListener('click', () => {
  const orderNumber = orderInput.value.trim();
  if (orderNumber) {
    orders.push({ number: orderNumber });
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrders();
    orderInput.value = '';
  }
});

// Complete an order (remove it from the list)
window.completeOrder = function(index) {
  orders.splice(index, 1);
  localStorage.setItem('orders', JSON.stringify(orders));
  renderOrders();
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(reg => {
        console.log('Service Worker registered', reg);
      }).catch(err => {
        console.error('Service Worker registration failed', err);
      });
    });
  }  


// Initial render
renderOrders();
