// Mock product data
const products = [
    { id: 1, name: 'Amazon Echo (Smart Speaker with Alexa)', category: 'Smart Speakers & Displays', price: 'KES 10,000', description: 'This is item 1', image: './Images/AmazonEcho.jfif' },
    { id: 2, name: 'Google Nest Hub (Smart Display)', category: 'Smart Speakers & Displays', description: 'This is item 2', image: './Images/Google-Home-Hub.jpg' },
    { id: 3, name: 'Apple HomePod (Smart Speaker with Siri)', category: 'Smart Speakers & Displays', description: 'This is item 3', image: './Images/HomePod.jfif' },
    { id: 4, name: 'Ring Video Doorbell (Smart Doorbell)', category: 'Home Security & Monitoring', description: 'This is item 4', image: './Images/RingVideo_Doorbell.jfif' },
    { id: 5, name: 'August Smart Lock (Smart Door Lock)', category: 'Smart Home Hubs & Automation', description: 'This is item 5', image: './Images/August-Smart-Lock-Entry-Door-Smart-Phone-Locks.png' },
    { id: 6, name: 'Philips Hue Bulbs (Smart Lighting)', category: 'Smart Lighting & Plugs', description: 'This is item 6', image: './Images/Philips-Hue.jfif' },
    { id: 7, name: 'Samsung SmartThings Hub (Smart Home Hub)', category: 'Smart Home Hubs & Automation', description: 'This is item 7', image: './Images/Samsung_SmartThings.jpg' },
    { id: 8, name: 'Nest Thermostat (Smart Thermostat)', category: 'Thermostats & Environmental Control', description: 'This is item 8', image: './Images/thermostat-installation.jpg' },
    { id: 9, name: 'Ecobee SmartThermostat (Smart Thermostat)', category: 'Thermostats & Environmental Control', description: 'This is item 9', image: './Images/Ecobee.jpg' },
    { id: 10, name: 'TP-Link Kasa Smart Plug (Smart Plug)', category: 'Smart Lighting & Plugs', description: 'This is item 10', image: './Images/TP-Link.jfif' },
    { id: 11, name: 'EufyCam 2 (Smart Security Camera)', category: 'Home Security & Monitoring', description: 'This is item 11', image: './Images/EufyCam.jpg' },
    { id: 12, name: 'iRobot Roomba (Robot Vacuum)', category: 'Miscellaneous Smart Gadgets', description: 'This is item 12', image: './Images/irobot-roomba-vacuum-tout.jpg' },
    { id: 13, name: 'SimpliSafe Home Security System (Smart Home Security)', category: 'Home Security & Monitoring', description: 'This is item 13', image: './Images/keypad.png' },
    { id: 14, name: 'Sonos One (Smart Speaker)', category: 'Smart Speakers & Displays', description: 'This is item 14', image: './Images/sonos_one_promo.jpg' },
    { id: 15, name: 'Arlo Pro 3 (Wireless Home Security Camera)', category: 'Home Security & Monitoring', description: 'This is item 15', image: './Images/Arlo.jfif' },
    { id: 16, name: 'Lutron Caseta (Smart Lighting Dimmer Switch)', category: 'Smart Lighting & Plugs', description: 'This is item 16', image: './Images/Caseta.jfif' },
    { id: 17, name: 'Chamberlain MyQ (Smart Garage Door Opener)', category: 'Smart Home Hubs & Automation', description: 'This is item 17', image: './Images/Chamberlain-myQ-Smart-Garage-Control.png' },
    { id: 18, name: 'Withings Body+ (Smart Scale)', category: 'Health & Fitness', description: 'This is item 18', image: './Images/Withings.jpg' },
    { id: 19, name: 'Dyson Pure Cool (Smart Air Purifier and Fan)', category: 'Thermostats & Environmental Control', description: 'This is item 19', image: './Images/air-quality-purifier.jpg' },
    { id: 20, name: 'Wyze Cam (Smart Security Camera)', category: 'Home Security & Monitoring', description: 'This is item 20', image: './Images/WYZE.jpg' },
    { id: 21, name: 'Tile Mate (Smart Tracker)', category: 'Miscellaneous Smart Gadgets', description: 'This is item 21', image: './Images/MateTile.jpg' },
    { id: 22, name: 'Fitbit Versa (Smart Fitness Tracker)', category: 'Health & Fitness', description: 'This is item 22', image: './Images/FitBit.jpg' },
    { id: 23, name: 'Sony Bravia Smart TV (Smart TV)', category: 'Entertainment & Multimedia', description: 'This is item 23', image: './Images/sony.jfif' },
    { id: 24, name: 'Oculus Quest 2 (VR Headset)', category: 'Entertainment & Multimedia', description: 'This is item 24', image: './Images/oculus-quest-2.jpg' },
    { id: 25, name: 'Samsung Family Hub Refrigerator (Smart Refrigerator)', category: 'Smart Appliances', description: 'This is item 25', image: './Images/Samsung-Family-Hub.jpg' }
];

// Cart and checkout data
let cart = [];

// Function to display the items
function displayProducts(items) {
    const gridContainer = document.getElementById('productGrid');
    gridContainer.innerHTML = ''; // Clear the container

    items.forEach(item => {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.onerror = function() {
            this.src = './Images/default-placeholder.png'; // Fallback image
        };

        const title = document.createElement('h3');
        title.textContent = item.name;

        const description = document.createElement('p');
        description.textContent = item.description;

        const price = document.createElement('p');
        price.textContent = item.price ? item.price : 'Price not available';

        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.onclick = () => addToCart(item);

        gridItem.appendChild(img);
        gridItem.appendChild(title);
        gridItem.appendChild(description);
        gridItem.appendChild(price);
        gridItem.appendChild(addButton);

        gridContainer.appendChild(gridItem);
    });

    const feedbackMessage = document.getElementById('feedbackMessage');
    feedbackMessage.innerText = items.length === 0 ? 'No products match your search or filter criteria.' : `${items.length} products found.`;
}

// Initialize and populate categories dropdown
function initializeCategories(products) {
    const categories = [...new Set(products.map(product => product.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="">All Categories</option>'; // Default option

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter products based on search input and selected category
function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchInput) || 
                              product.description.toLowerCase().includes(searchInput);
        const matchesCategory = categoryFilter === '' || product.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}

// Clear filters function
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    filterProducts();
}

// Add clear filters button
const clearButton = document.createElement('button');
clearButton.innerHTML = '<span class="clear-icon">❌</span> Clear Filters'; // Using a clear icon
clearButton.onclick = clearFilters;

const filterControls = document.getElementById('filterControls');
filterControls.appendChild(clearButton);

// Handle Add to Cart functionality with quantity control
function addToCart(product) {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartItems();
    showToast(`Product added to cart!`, 'success');
}

// Function to toggle the visibility of the cart modal
function toggleCartModal() {
    const cartModal = document.getElementById('cartModal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
    updateCartItems();
}

// Function to update cart items display with quantity
function updateCartItems() {
    const cartItemsElement = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItemsElement.innerHTML = 'Your cart is empty.';
    } else {
        cartItemsElement.innerHTML = cart.map(item => `<p>${item.name} (x${item.quantity})</p>`).join('');
    }
    document.getElementById('cartCount').textContent = cart.length;
}

// Function to toggle the visibility of the checkout modal
function toggleCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.style.display = checkoutModal.style.display === 'block' ? 'none' : 'block';
    updateCheckoutItems();
}

// Function to update checkout items display with quantity
function updateCheckoutItems() {
    const checkoutItemsElement = document.getElementById('checkoutItems');
    if (cart.length === 0) {
        checkoutItemsElement.innerHTML = 'No items in cart.';
    } else {
        checkoutItemsElement.innerHTML = cart.map(item => `<p>${item.name} (x${item.quantity})</p>`).join('');
    }
}

// Function to handle checkout and auto-close modal
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add items to the cart before checking out.');
    } else {
        alert('Checkout successful!');
        cart = []; // Clear the cart
        updateCartItems();
        toggleCheckoutModal(); // Auto-close the checkout modal
    }
}

// Debounce function for input delay
function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// Correctly apply debounce
document.getElementById('searchInput').oninput = debounce(filterProducts, 300);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    initializeCategories(products);
});
