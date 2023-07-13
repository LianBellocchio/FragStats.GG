var id = localStorage.getItem("id");

const { createApp } = Vue;
createApp({
  data() {
    return {
      id: localStorage.getItem("id"),
      nombre: "",
      correo: "",
      contrasena: "",
      favoritos: "",
      url: "https://plasmads.pythonanywhere.com/cuentas/" + id,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
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
          location.reload();
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
          localStorage.setItem("id", "");
          window.location.href =
            "https://lianbellocchio.github.io/FragStats.GG/";
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
