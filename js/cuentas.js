const { createApp } = Vue;
createApp({
  data() {
    return {
      cuentas: [],
      url: "http://plasmads.pythonanywhere.com/cuentas",
      error: false,
      cargando: true,
      /*atributos para el guardar los valores del formulario */
      id: 0,
      nombre: "",
      correo: "",
      contrasena: "",
    };
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
      };
      var options = {
        body: JSON.stringify(cuenta),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado");
          window.location.href = "http://plasmads.pythonanywhere.com/cuentas"; // recarga cuentas.html
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabar");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
