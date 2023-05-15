// Validación
function nameValidation() {
  const errors = {};
  const name = document.querySelector("#name");
  const regexName = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/;
  const errorName = document.querySelector("#errorName");

  !regexName.test(name.value) &&
    (errors.name =
      "⚠️ Por favor, verifique que haya escrito su nombre correctamente.");
  !name.value && (errors.name = "⚠️ El nombre es un campo obligatorio");
  if (errors.name) {
    errorName.textContent = errors.name;
  } else {
    errorName.textContent = "";
  }

  return errors;
}

function emailValidation() {
  const errors = {};
  const email = document.querySelector("#email");
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const errorEmail = document.querySelector("#errorEmail");

  !regexEmail.test(email.value) &&
    (errors.email =
      "⚠️ Por favor, verifica que hayas ingresado correctamente la dirección de correo electrónico.");
  !email.value && (errors.email = "⚠️ El email es un campo obligatorio");
  if (errors.email) {
    errorEmail.textContent = errors.email;
  } else {
    errorEmail.textContent = "";
  }

  return errors;
}

document.getElementById("name").addEventListener("blur", nameValidation);
document.getElementById("email").addEventListener("blur", emailValidation);

// Envío
document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  // Recupera los valores de los campos del formulario
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  const errorName = document.querySelector("#errorName");
  // Corroborando que el nombre sea correcto
  if (errorName.textContent === "") {
    // Envía el email usando EmailJS
    emailjs
      .send("service_ID", "template_ID", {
        from_name: name,
        from_email: email,
        message_html: message,
      })
      .then(
        function (response) {
          document.getElementById("myForm").reset();
          alert("Mensaje enviado correctamente");
        },
        function (error) {
          alert("Error al enviar el mensaje, intente nuevamente.");
        }
      );
  } else {
    alert("Por favor revise los mensajes de erorr");
  }
});
