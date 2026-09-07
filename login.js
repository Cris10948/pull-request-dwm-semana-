document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#loginModal form");
  const modalElement = document.getElementById("loginModal");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

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

    try {
      const res = await fetch("https://api.tu-pagina.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { email, password },
        }),
      });

      const { data, errors } = await res.json();

      if (errors || !data?.login) {
        alert("Credenciales incorrectas");
        return;
      }

      localStorage.setItem("authToken", data.login.token);

      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }

      alert("Inicio de sesión exitoso");
    } catch (err) {
      alert("Error de conexión");
    }
  });
});
