const containercomentarios = document.querySelector(".comentarios");
const formComentario = document.getElementById("form-comentario");

// ---------- Listado ----------
const mostrarComentarios = (arregloComentarios) => {
  containercomentarios.innerHTML = ""; // limpia la lista antes de volver a dibujarla

  if (arregloComentarios.length === 0) {
    const vacio = document.createElement("p");
    vacio.className = "sin-comentarios";
    vacio.appendChild(document.createTextNode("Todavía no hay comentarios. ¡Sé el primero!"));
    containercomentarios.appendChild(vacio);
    return;
  }

  arregloComentarios.forEach((c) => {
    const container_comentario = document.createElement("div");
    container_comentario.className = "contenedor-comentario";

    const nombre_fecha = document.createElement("div");
    nombre_fecha.className = "contenedornombre-fecha";

    const nombre = document.createElement("p");
    nombre.className = "comentario-nombre";
    nombre.appendChild(document.createTextNode(c.nombre));

    const fecha = document.createElement("p");
    fecha.className = "comentario-fecha";
    fecha.appendChild(document.createTextNode(c.fecha));

    const texto = document.createElement("p");
    texto.className = "comentario-texto";
    texto.appendChild(document.createTextNode(c.comentario));

    nombre_fecha.appendChild(nombre);
    nombre_fecha.appendChild(fecha);
    container_comentario.appendChild(nombre_fecha);
    container_comentario.appendChild(texto);
    containercomentarios.appendChild(container_comentario);
  });
};

const cajaComentarios = (url) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((ajaxResponse) => mostrarComentarios(ajaxResponse.data))
    .catch((error) => console.error("Error cargando comentarios:", error));
};

// ---------- Validación en el cliente ----------
const validarComentarioCliente = (texto) => {
  const errores = {};
  if (texto.length < 5 || texto.length > 200) {
    errores.texto = "El comentario debe tener entre 5 y 200 caracteres.";
  }
  return errores;
};

const mostrarErrores = (errores) => {
  document.getElementById("error-texto").textContent = errores.texto || errores.general || "";
};

// ---------- Envío asíncrono ----------
// El formulario solo existe si el usuario inició sesión
if (formComentario) {
  formComentario.addEventListener("submit", (event) => {
    event.preventDefault(); // evita que el navegador recargue la página

    const texto = formComentario.elements["comentario"].value.trim();

    const errores = validarComentarioCliente(texto);
    mostrarErrores(errores);
    if (Object.keys(errores).length > 0) {
      return; // no se envía nada si hay errores
    }

    fetch(urlAgregarComentario, {
      method: "POST",
      body: new FormData(formComentario),
    })
      .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          mostrarErrores(data.errores || {}); // errores que devolvió Flask
          return;
        }
        formComentario.reset();
        cajaComentarios(comentarios); // vuelve a cargar la lista con el comentario nuevo
      })
      .catch((error) => {
        console.error("Error enviando comentario:", error);
        mostrarErrores({ general: "No se pudo enviar el comentario. Intenta de nuevo." });
      });
  });
}

cajaComentarios(comentarios);
