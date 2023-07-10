console.log(location.search); // lee los argumentos pasados a este formulario
var id = localStorage.getItem("id"); // cuenta_update.html?id=1

const { createApp } = Vue;
createApp({
  data() {
    return {
      id: localStorage.getItem("id"),
      nombre: "",
      correo: "",
      contrasena: "",
      favoritos: "",
      url: "http://plasmads.pythonanywhere.com/cuentas/" + id,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.id = data.id;
          this.nombre = data.nombre;
          this.correo = data.correo;
          this.contrasena = data.contrasena;
          this.favoritos = data.favoritos;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    modificar() {
      let cuenta = {
        nombre: this.nombre,
        correo: this.correo,
        contrasena: this.contrasena,
        favoritos: this.favoritos,
      };
      var options = {
        body: JSON.stringify(cuenta),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };

      fetch(this.url, options)
        .then(function () {
          alert("Registro modificado");
          window.location.href =
            "http://plasmads.pythonanywhere.com/cuentas/" + id; // navega a cuentas.html
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Modificar");
        });
    },
    eliminar() {
      const url = this.url;
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
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
