new Vue({
  el: "#register-modal",
  data: {
    cuentas: [],
    //url:'http://localhost:5000/cuentas',
    // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
    url: "https://plasmads.pythonanywhere.com/cuentas", // si ya lo subieron a pythonanywhere
    error: false,
    cargando: true,
    /*atributos para el guardar los valores del formulario */
    id: 0,
    nombre: "",
    correo: "",
    contrasena: "",
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.cuentas = data;
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(id) {
      const url = this.url + "/" + id;
      var options = {
        method: "DELETE",
      };
      fetch(url, options)
        .then((res) => res.text()) // or res.json()
        .then((res) => {
          alert("Registro Eliminado");
          location.reload(); // recarga el json luego de eliminado el registro
        });
    },
    grabar() {
      let cuenta = {
        nombre: this.nombre,
        correo: this.correo,
        contrasena: this.contrasena,
        favoritos: null,
      };
      var options = {
        body: JSON.stringify(cuenta),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then((response) => response.json())
        .then((data) => {
          document.querySelector(".registrado").style.display = "none";
          document.querySelector(".iniciado").style.display = "none";
          document.querySelector("#miCuenta").style.display = "inline";
          document.querySelector("#cerrarSesion").style.display = "inline";
          localStorage.setItem("id", data.id);
          closeModal("register-modal");
          alert("Registro grabado");
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabar"); // puedes mostrar el error también
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
});
