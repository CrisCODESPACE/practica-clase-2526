import { createUser, getAllUsers, updateUserTask } from "./API/usersApi";
import { renderTask } from "./utils/utils";
import sha256 from "crypto-js/sha256";

const main = document.getElementById("main-container");

// funcion para vistas dinámicas
async function loadView(viewName) {
  const response = await fetch(`/views/${viewName}.html`);
  const html = await response.text();

  main.innerHTML = html;

  if (viewName === "register") uiRegister();
  if (viewName === "login") uiLogin();
  if (viewName === "profile") uiProfile();
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

    const hashedPassword = sha256(regPassword).toString();

    console.log(hashedPassword);

    const userData = {
      regName,
      regEmail,
      hashedPassword,
      regCountry,
    };

    await createUser(userData);

    loadView("login");
  });
}

function uiLogin() {
  const form = document.getElementById("login-form");
  const toRegister = document.getElementById("to-register");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const logEmail = document.getElementById("log-email").value;
    const logPassword = document.getElementById("log-password").value;
    const logPasswordHashed = sha256(logPassword).toString();
    const allUsers = await getAllUsers();

    const user = allUsers.find(
      (u) => u.userEmail === logEmail && u.password === logPasswordHashed
    );

    localStorage.setItem("Current user", JSON.stringify(user));

    loadView("profile");
  });

  toRegister.addEventListener("click", () => {
    loadView("register");
  });
}

function uiProfile() {
  let currentUser = localStorage.getItem("Current user");

  console.log(currentUser);

  currentUser = JSON.parse(currentUser);

  if (!currentUser) {
    loadView("login");
  }

  const saludo = document.getElementById("user-greeting");
  const taskList = document.getElementById("task-list");
  const newTaskInput = document.getElementById("newTask");
  const addTaskButton = document.getElementById("add-task");
  const logOutButton = document.getElementById("logout");

  saludo.textContent = `Hola ${currentUser.userName}, bienvenida.`;

  logOutButton.addEventListener("click", () => {
    localStorage.removeItem("Current user");

    loadView("login");
  });

  renderTask(currentUser.taskList, taskList, "li");

  addTaskButton.addEventListener("click", async () => {
    const newTask = newTaskInput.value;

    const currentTask = currentUser.taskList || [];

    const updateTask = [...currentTask, newTask];

    const updateUser = await updateUserTask(currentUser.id, updateTask);

    console.log(currentUser.taskList);

    currentUser = updateUser;
    localStorage.removeItem("Current user");
    localStorage.setItem("Current user", JSON.stringify(currentUser));

    renderTask(currentUser.taskList, taskList, "li");
  });
}

// let password = 12345;

// let hashedPassword = sha256(password).toString();

// console.log(hashedPassword);
