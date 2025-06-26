const main = document.getElementById("main-container");

// funcion para vistas dinámicas
async function loadView(viewName) {
  const response = await fetch(`views/${viewName}.html`);
  const html = await response.text();

  main.innerHTML = html;

  // if (viewName === "register") aquí irá la funcion que muestre register
  // if (viewName === "login")  aquí irá la funcion que muestre login
  // if (viewName === "profile")  aquí irá la funcion que muestre profile
}

// llamada inicial por defecto a login

loadView("login");
