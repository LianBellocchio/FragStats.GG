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

          if (objetoEncontrado) {
            if (objetoEncontrado.contrasena === this.contrasena) {
              localStorage.setItem("id", `${objetoEncontrado.id}`);
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
