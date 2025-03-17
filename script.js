const validEmail = "ali.elzoridy@pccc.edu";
const validPassword = "123123123wsa";
const adminEmail = "kingali001@gmail.com"; // Updated admin email
const adminPassword = "123123123wsa";

document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("loggedIn") === "true") {
        if (window.location.pathname.includes("index.html")) {
            window.location.href = "dashboard.html"; // Redirect to dashboard if logged in
        }
    } else if (window.location.pathname.includes("dashboard.html")) {
        window.location.href = "index.html"; // Redirect to login if not logged in
    }
});

function login(event) {
    event.preventDefault(); // Prevent form from submitting the usual way

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let errorMsg = document.getElementById("error-msg");

    // Check if the email and password match the valid credentials
    if ((email === validEmail && password === validPassword) || 
        (email === adminEmail && password === adminPassword)) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("email", email); // Store email to check the logged-in user
        window.location.href = "dashboard.html"; // Redirect to the dashboard page
    } else {
        errorMsg.innerText = "Invalid email or password!";
    }
}

function logout() {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("email");
    window.location.href = "index.html"; // Redirect to login page
}
