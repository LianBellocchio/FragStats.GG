var ID = "";

function iniciarSesion(correoBuscado, contrasenaIngresada) {
  fetch("http://plasmads.pythonanywhere.com/cuentas")
    .then((response) => response.json())
    .then((data) => {
      const objetoEncontrado = data.find(
        (objeto) => objeto.correo === correoBuscado
      );

      if (objetoEncontrado) {
        if (objetoEncontrado.contrasena === contrasenaIngresada) {
          ID = objetoEncontrado.id;
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
}

document
  .getElementById("botonIniciarSesion")
  .addEventListener("click", function (event) {
    event.preventDefault();
    var correo = document.getElementById("correo").value;
    var contrasena = document.getElementById("contrasena").value;
    iniciarSesion(correo, contrasena);
  });
