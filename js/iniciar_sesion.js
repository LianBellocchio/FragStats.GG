new Vue({
  el: "#login-modal",
  data: {
    correo: "",
    contrasena: "",
    usuario: "",
  },
  methods: {
    iniciarSesion() {
      fetch("http://plasmads.pythonanywhere.com/cuentas")
        .then((response) => response.json())
        .then((data) => {
          const objetoEncontrado = data.find(
            (objeto) => objeto.correo === this.correo
          );
          console.log("1");
          if (objetoEncontrado) {
            if (objetoEncontrado.contrasena === this.contrasena) {
              localStorage.setItem("id", `${objetoEncontrado.id}`);
              document.querySelector(".registrado").style.display = "none";
              document.querySelector(".iniciado").style.display = "none";
              closeModal("login-modal");
              alert("Inicio de sesión correcto");
            } else {
              alert("Contraseña incorrecta");
            }
          } else {
            alert("Correo no encontrado");
          }
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
    },
    closeModal(modalId) {
      // Implementa la función para cerrar el modal
    },
  },
});
