import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function renderTask(list = [], container, elemento) {
  container.innerHTML = "";

  list.forEach((e) => {
    const tag = document.createElement(`${elemento}`);
    tag.textContent = e;

    container.appendChild(tag);
  });
}

export function credentialValidations({ name, email, password }) {
  if (name !== undefined) {
    if (name.length < 2 || !name) {
      // alert("Búscate un nombre mejor");
      showToast({
        text: "Búscate un nombre mejor",
        type: "error",
      });
      return false;
    }
  }

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email !== undefined) {
    if (!regexEmail.test(email)) {
      // alert("Email no válido.");
      showToast({
        text: "Email no válido.",
        type: "error",
      });
      return false;
    }
  }

  if (password !== undefined) {
    if (password.length < 6) {
      // alert("La contraseña debe tener más de 6 caractéres");
      showToast({
        text: "La contraseña debe tener más de 6 caractéres",
        type: "error",
      });
      return false;
    }
  }

  return true;
}

export function showToast({
  text = "Something happened",
  type = "success",
  duration = 3000,
  position = "right",
  gravity = "top",
} = {}) {
  const colors = {
    success: "linear-gradient(to right, #00b09b, #96c93d)",
    error: "linear-gradient(to right, #ff416c, #ff4b2b)",
    info: "linear-gradient(to right, #2193b0, #6dd5ed)",
    warning: "linear-gradient(to right, #f7971e, #ffd200)",
  };

  Toastify({
    text,
    duration,
    close: true,
    gravity,
    position,
    style: {
      background: colors[type] || colors.info,
    },
  }).showToast();
}
