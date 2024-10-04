document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkoutForm');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const orderNumberElement = document.getElementById('orderNumber');
    const confirmEmailElement = document.getElementById('confirmEmail');

    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Simulate order number generation
        const orderNumber = Math.floor(Math.random() * 1000000);
        const email = document.getElementById('email').value;

        // Hide form and show confirmation message
        checkoutForm.style.display = 'none';
        confirmationMessage.style.display = 'block';
        orderNumberElement.textContent = orderNumber;
        confirmEmailElement.textContent = email;

        // Additional logic for processing the payment can be added here
    });
});
function goToCheckout() {
    // Assuming the cart data is stored in the session or passed to the checkout page
    window.location.href = 'checkout.html';
}
