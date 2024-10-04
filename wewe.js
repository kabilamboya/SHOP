document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === 'user@example.com' && password === 'user123') {
        window.location.href = 'wewe.html';
    } else {
        alert('Invalid email or password');
    }
});

function editField(fieldId) {
    var field = document.getElementById(fieldId);
    var currentText = field.innerText;
    var input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.className = "edit-input";
    field.innerText = "";
    field.appendChild(input);
    input.focus();

    input.addEventListener("blur", function() {
        field.innerText = input.value;
    });

    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            field.innerText = input.value;
        }
    });
}
