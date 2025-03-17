// Define valid login credentials
const validEmail = "ali.elzoridy@pccc.edu";
const validPassword = "123123123wsa";

// Define additional login credentials for restricted users
const adminEmail = "kingali001";
const adminPassword = "123123123wsa";

// Add login functionality
document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("loggedIn") === "true") {
        if (window.location.pathname.includes("index.html")) {
            window.location.href = "dashboard.html"; // Redirect to dashboard if already logged in
        }
    } else if (window.location.pathname.includes("dashboard.html")) {
        window.location.href = "index.html"; // Redirect to login page if not logged in
    }
});

// Login function
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let errorMsg = document.getElementById("error-msg");

    // Validate login credentials
    if ((email === validEmail && password === validPassword) || 
        (email === adminEmail && password === adminPassword)) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("email", email); // Store email to check user's status
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        errorMsg.innerText = "Invalid email or password!";
    }
}

// Logout function
function logout() {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("email");
    window.location.href = "index.html"; // Redirect to login page
}
