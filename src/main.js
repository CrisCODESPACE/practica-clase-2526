import { createUser, getAllUsers } from "./API/usersApi";

const main = document.getElementById("main-container");

// funcion para vistas dinámicas
async function loadView(viewName) {
  const response = await fetch(`/views/${viewName}.html`);
  const html = await response.text();

  main.innerHTML = html;

  if (viewName === "register") uiRegister();
  if (viewName === "login") uiLogin();
  // if (viewName === "profile")  aquí irá la funcion que muestre profile
}

// llamada inicial por defecto a login

loadView("login");

// UI de register

function uiRegister() {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const regName = document.getElementById("reg-name").value;
    const regEmail = document.getElementById("reg-email").value;
    const regPassword = document.getElementById("reg-password").value;
    const regCountry = document.getElementById("reg-country").value;

    const userData = {
      regName,
      regEmail,
      regPassword,
      regCountry,
    };

    await createUser(userData);
  });
}


function uiLogin() {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const logEmail = document.getElementById("log-email").value;
    const logPassword = document.getElementById("log-password").value;

    const allUsers = await getAllUsers();
    const user = allUsers.find(u => u.userEmail === logEmail && u.password === logPassword);

    console.log(user);

    localStorage.setItem("Current user", JSON.stringify(user))
    
  })

  const toRegister = document.getElementById("to-register");

  toRegister.addEventListener("click", () => {
    loadView("register")
  })
};