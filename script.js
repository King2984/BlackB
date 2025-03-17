const users = JSON.parse(localStorage.getItem("users")) || [];

function register(event) {
    event.preventDefault();

    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const role = document.getElementById("register-role").value; 

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
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("Invalid email or password!");
        return;
    }

    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("role", user.role);
    window.location.href = "dashboard.html"; 
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}
