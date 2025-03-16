const validEmail = "ali.elzoridy@pccc.edu";
const validPassword = "123123123wsa";

document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("loggedIn") === "true") {
        if (window.location.pathname.includes("index.html")) {
            window.location.href = "dashboard.html";
        }
    } else if (window.location.pathname.includes("dashboard.html")) {
        window.location.href = "index.html";
    }
});

function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let errorMsg = document.getElementById("error-msg");

    if (email === validEmail && password === validPassword) {
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        errorMsg.innerText = "Invalid email or password!";
    }
}

function logout() {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}
