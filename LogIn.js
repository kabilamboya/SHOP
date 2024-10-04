// Dummy user data for demonstration
const users = [
    { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
    { email: 'user@example.com', password: 'user123', role: 'User' }
];

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Fetch user input
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Check for Guest user scenario
    if (!email && !password) {
        // No email and password entered - redirect to blogs-portfolio page
        window.location.href = 'portfolio.html';
        return; // Exit the function as we have redirected the guest user
    }

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Role-based redirection
        switch(user.role) {
            case 'Admin':
                window.location.href = 'dashboard.html';
                break;
            case 'User':
                window.location.href = 'wewe.html';
                break;
            default:
                alert('Unknown role');
        }
    } else {
        // Show error message if credentials don't match
        alert('Invalid email or password');
    }
});