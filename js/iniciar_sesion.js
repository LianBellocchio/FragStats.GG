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
              document.querySelector("#cerrarSesion").style.display = "inline";
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

// Ocultar registro y login y mostrar cerrar sesión cuando se está logueado
window.addEventListener("load", function () {
  if (localStorage.getItem("id") !== "") {
    document.querySelector(".registrado").style.display = "none";
    document.querySelector(".iniciado").style.display = "none";
    document.querySelector("#cerrarSesion").style.display = "inline";
  }
});

function cerrarSesion() {
  localStorage.setItem("id", "");
  document.querySelector("#cerrarSesion").style.display = "none";
  document.querySelector(".registrado").style.display = "inline";
  document.querySelector(".iniciado").style.display = "inline";
}
