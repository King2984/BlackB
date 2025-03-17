// Define valid login credentials for both admin and user
const validEmail = "ali.elzoridy@pccc.edu";
const validPassword = "123123123wsa";

// Define admin account login credentials
const adminEmail = "kingali001";
const adminPassword = "123123123wsa";

// Redirect to dashboard if logged in
document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("loggedIn") === "true") {
        if (window.location.pathname.includes("index.html")) {
            window.location.href = "dashboard.html"; // Redirect to dashboard
        }
    } else if (window.location.pathname.includes("dashboard.html")) {
        window.location.href = "index.html"; // Redirect to login if not logged in
    }
});

// Login function
function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let errorMsg = document.getElementById("error-msg");

    // Check for valid login credentials
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
