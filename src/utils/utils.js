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
      alert("Búscate un nombre mejor");
      return false;
    }
  }

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email !== undefined) {
    if (!regexEmail.test(email)) {
      alert("Email no válido.");
      return false;
    }
  }

  if (password !== undefined) {
    if (password.length < 6) {
      alert("La contraseña debe tener más de 6 caractéres");
      return false;
    }
  }

  return true;
}
