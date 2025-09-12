const registerBtn = document.getElementById("show-register");
const loginBtn = document.getElementById("show-login");
const registerSection = document.getElementById("register-section");
const loginSection = document.getElementById("login-section");
const container = document.querySelector(".container");

// Forms
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

// Inputs (Register)
const regUsername = document.getElementById("reg-username");
const regPassword = document.getElementById("reg-password");
const regEmail = document.getElementById("reg-email");

// Inputs (Login)
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");

function switchForm(from, to) {
  document.body.classList.add("transitioning");
  container.classList.add("transitioning");

  from.classList.remove("active");
  from.classList.add("exit-left");

  setTimeout(() => {
    from.classList.remove("exit-left");
    to.classList.add("active");
    document.body.classList.remove("transitioning");
    container.classList.remove("transitioning");
  }, 500);
}

registerBtn.onclick = () => switchForm(loginSection, registerSection);
loginBtn.onclick = () => switchForm(registerSection, loginSection);

// --------- Register ---------
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    username: regUsername.value.trim(),
    password: regPassword.value.trim(),
    email: regEmail.value.trim(),
  };

  if (!user.username || !user.password || !user.email) {
    alert("Please fill all fields");
    return;
  }

  // Save user in localStorage
  localStorage.setItem("user", JSON.stringify(user));
  alert("✅ Registration successful! You can now log in.");

  // Switch to login form
  switchForm(registerSection, loginSection);
  registerForm.reset();
});

// --------- Login ---------
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("⚠ No user found. Please register first.");
    return;
  }

  if (
    loginUsername.value.trim() === storedUser.username &&
    loginPassword.value.trim() === storedUser.password
  ) {
    // Hide form and show welcome message
    container.innerHTML = `
  <div style="color:white; text-align:center;">
      <h2>Hey ${storedUser.username} 👋</h2>
      <p>Thank you for trying my login interface! 🚀</p>
      <p>I hope you liked the experience — I'm still working on improving my skills 💻✨.  
        Your visit means a lot to me, and every bit of feedback helps me grow.  
        This is just the beginning of my journey, and I’m excited to keep learning, building,  
        and creating even better projects in the future! 🌟</p>
  </div>
`;
  } else {
    alert("❌ Wrong username or password!");
  }
});
