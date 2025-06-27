const urlBase =
  "https://68511f618612b47a2c08b47f.mockapi.io/api/codespace/users";

//Esto es una función POST para registro de usuario

export async function createUser(user) {
  const url = urlBase;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user.regName,
        userEmail: user.regEmail,
        password: user.hashedPassword,
        userCountry: user.regCountry,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario");
    }
    const newUser = await response.json();
  } catch (error) {
    console.error(error);
  }
}

//Request of all users GET

export async function getAllUsers() {
  const url = urlBase;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }

    const allUsers = await response.json();
    return allUsers;
  } catch (error) {
    console.error(error);
  }
}

//  peticion PUT edición user taskList

export async function updateUserTask(id, taskList) {
  const url = `${urlBase}/${id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskList,
      }),
    });

    if (!response.ok) {
      throw new Error("Error:", response.status);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
