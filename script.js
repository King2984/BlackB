document.addEventListener("DOMContentLoaded", () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Toggle between login & register forms
    document.getElementById("show-register").addEventListener("click", function () {
        document.getElementById("register-box").classList.remove("hidden");
        document.getElementById("login-form").parentElement.classList.add("hidden");
    });

    document.getElementById("show-login").addEventListener("click", function () {
        document.getElementById("register-box").classList.add("hidden");
        document.getElementById("login-form").parentElement.classList.remove("hidden");
    });
});

function register(event) {
    event.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const role = document.getElementById("register-role").value; 

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        alert("User already exists!");
        return;
    }

    users.push({ email, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please log in.");
}

function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        document.getElementById("error-msg").innerText = "Invalid email or password!";
        return;
    }

    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("role", user.role);
    
    window.location.href = "dashboard.html";
