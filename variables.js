async function login(email, password) {
  const query = `
    mutation IniciarSesion($email: String!, $password: String!) {
      login(input: { email: $email, password: $password }) {
        token
        user {
          id
          email
        }
      }
    }
  `;

  const response = await fetch("https://api.tu-pagina.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { email, password },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    console.error("Error al autenticar:", errors);
    return null;
  }

  localStorage.setItem("authToken", data.login.token);
  return data.login;
}
