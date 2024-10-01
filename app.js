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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLajdjs45NpqMlNumNk278JZcyQW7upVk",
  authDomain: "boss-c883a.firebaseapp.com",
  projectId: "boss-c883a",
  storageBucket: "boss-c883a.appspot.com",
  messagingSenderId: "794161984824",
  appId: "1:794161984824:web:730d9e143b874cd70a7dcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = firebase.database();

addOrderBtn.addEventListener('click', () => {
    const orderNumber = orderInput.value.trim();
    if (orderNumber) {
      const newOrderRef = database.ref('orders').push();
      newOrderRef.set({ number: orderNumber });
      orderInput.value = '';
    }
  });

database.ref('orders').on('value', (snapshot) => {
    const ordersData = snapshot.val();
    ordersList.innerHTML = ''; // Clear current list
    for (const id in ordersData) {
      const order = ordersData[id];
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${order.number}</span>
        <button onclick="completeOrder('${id}')">Complete</button>
      `;
      ordersList.appendChild(li);
    }
  });
  
 window.completeOrder = function(orderId) {
    database.ref('orders/' + orderId).remove();
  };
  

// Initial render
renderOrders();
