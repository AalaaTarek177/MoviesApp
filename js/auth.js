const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("registerName").value.trim();

    const email = document
      .getElementById("registerEmail")
      .value.trim()
      .toLowerCase();

    const password = document.getElementById("registerPassword").value;

    const confirmPassword = document.getElementById("confirmPassword").value;

    const error = document.getElementById("registerError");

    error.textContent = "";

    // Check passwords

    if (password !== confirmPassword) {
      error.textContent = "Passwords do not match.";

      return;
    }

    // Get existing users

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      error.textContent = "An account with this email already exists.";

      return;
    }

    // Create new user

    const newUser = {
      name: name,
      email: email,
      password: password,
    };

    users.push(newUser);

    // Save users

    localStorage.setItem("users", JSON.stringify(users));

    // Save current user

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: name,
        email: email,
      }),
    );

    // Go to home

    window.location.href = "index.html";
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document
      .getElementById("loginEmail")
      .value.trim()
      .toLowerCase();

    const password = document.getElementById("loginPassword").value;

    const error = document.getElementById("loginError");

    error.textContent = "";

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!user) {
      error.textContent = "Invalid email or password.";

      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: user.name,
        email: user.email,
      }),
    );

    window.location.href = "index.html";
  });
}

function updateNavbar() {
  const loginBtn = document.getElementById("loginNavBtn");

  const userProfile = document.getElementById("userProfile");

  const usernameDisplay = document.getElementById("usernameDisplay");

  const logoutBtn = document.getElementById("logoutBtn");

  if (!loginBtn || !userProfile || !logoutBtn) {
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    loginBtn.classList.add("d-none");

    userProfile.classList.remove("d-none");

    logoutBtn.classList.remove("d-none");

    usernameDisplay.textContent = currentUser.name;
  }

  // User is NOT logged in
  else {
    loginBtn.classList.remove("d-none");

    userProfile.classList.add("d-none");

    logoutBtn.classList.add("d-none");
  }
}

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("currentUser");

    window.location.href = "login.html";
  });
}

updateNavbar();
