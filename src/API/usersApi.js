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
        password: user.regPassword,
        userCountry: user.regCountry,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al registrar el usuario");
    }
    const newUser = await response.json();
    console.log(`usuario creado ${newUser}`);
  } catch (error) {
    console.error(error);
  }
}
