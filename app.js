// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLajdjs45NpqMlNumNk278JZcyQW7upVk",
    authDomain: "boss-c883a.firebaseapp.com",
    databaseURL: "https://boss-c883a-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "boss-c883a",
    storageBucket: "boss-c883a.appspot.com",
    messagingSenderId: "794161984824",
    appId: "1:794161984824:web:730d9e143b874cd70a7dcd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);  // Use global firebase object
const database = firebase.database();

// Get elements
const orderInput = document.getElementById('order-number');
const addOrderBtn = document.getElementById('add-order-btn');
const ordersList = document.getElementById('orders');

// Function to render the orders list
function renderOrders(ordersData) {
    ordersList.innerHTML = '';
    for (const id in ordersData) {
        const order = ordersData[id];
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${order.number}</span>
            <button onclick="completeOrder('${id}')">Complete</button>
        `;
        ordersList.appendChild(li);
    }
}

// Add a new order
addOrderBtn.addEventListener('click', () => {
    const orderNumber = orderInput.value.trim();
    if (orderNumber) {
        const newOrderRef = database.ref('orders').push();
        newOrderRef.set({ number: orderNumber }).then(() => {
            orderInput.value = ''; // Clear input after adding
        }).catch((error) => {
            console.error('Error adding order:', error);
        });
    } else {
        console.log('Order number is empty');
    }
});

// Listen for changes in the orders data from Firebase
database.ref('orders').on('value', (snapshot) => {
    const ordersData = snapshot.val();
    if (ordersData) { // Ensure there are orders to display
        renderOrders(ordersData);
    } else {
        ordersList.innerHTML = '<li>No orders available</li>'; // Display message if no orders
    }
});

// Function to complete an order
window.completeOrder = function(orderId) {
    database.ref('orders/' + orderId).remove().catch((error) => {
        console.error('Error completing order:', error);
    });
};

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(reg => {
            console.log('Service Worker registered', reg);
        }).catch(err => {
            console.error('Service Worker registration failed', err);
        });
    });
}
