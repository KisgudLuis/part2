
const formMantenimiento = document.getElementById("form-mantenimiento");
const tablaMantenimiento = document.getElementById("tabla-mantenimiento");
const mensajeMantenimiento = document.getElementById("mensaje-mantenimiento");

// Arreglo que almacena los objetos de mantenimiento.
let listaMantenimiento = [];

// Muestra los registros en la tabla.
function mostrarMantenimiento() {

    tablaMantenimiento.innerHTML = "";

    for (let i = 0; i < listaMantenimiento.length; i++) {

        const item = listaMantenimiento[i];
        const fila = document.createElement("tr");

        const celdaComponente = document.createElement("td");
        celdaComponente.textContent = item.componente;

        const celdaHoras = document.createElement("td");
        celdaHoras.textContent = item.horas + " hrs";

        const celdaEstado = document.createElement("td");
        celdaEstado.textContent = item.estado;

        const celdaAccion = document.createElement("td");
        const boton = document.createElement("button");

        boton.textContent = "Eliminar";
        boton.className = "btn-eliminar";
        boton.dataset.indice = i;
        boton.type = "button";

        celdaAccion.appendChild(boton);

        fila.appendChild(celdaComponente);
        fila.appendChild(celdaHoras);
        fila.appendChild(celdaEstado);
        fila.appendChild(celdaAccion);

        tablaMantenimiento.appendChild(fila);
    }
}

// Agrega un nuevo registro al arreglo.
function agregarMantenimiento(evento) {

    evento.preventDefault();

    const componente = document.getElementById("componente").value.trim();
    const horasTexto = document.getElementById("horas").value;
    const horas = Number(horasTexto);
    const estado = document.getElementById("estado").value;

    if (componente === "" || horasTexto === "" ||
        !Number.isFinite(horas) || horas < 0) {

        mensajeMantenimiento.textContent =
            "Error: Ingrese un componente y horas válidas.";

        return;
    }

    // Crear objeto.
    const nuevoRegistro = {
        componente: componente,
        horas: horas,
        estado: estado
    };

    // Agregar objeto al arreglo.
    listaMantenimiento.push(nuevoRegistro);

    formMantenimiento.reset();

    mensajeMantenimiento.textContent =
        "Registro agregado correctamente.";

    mostrarMantenimiento();
}

// Elimina un registro.
function eliminarMantenimiento(indice) {

    listaMantenimiento.splice(indice, 1);

    mensajeMantenimiento.textContent =
        "Registro eliminado correctamente.";

    mostrarMantenimiento();
}

// Evento del formulario.
formMantenimiento.addEventListener("submit", agregarMantenimiento);

// Evento de eliminación.
tablaMantenimiento.addEventListener("click", function(evento) {

    if (evento.target.classList.contains("btn-eliminar")) {

        const indice = Number(evento.target.dataset.indice);

        eliminarMantenimiento(indice);
    }
});

// Mostrar tabla inicialmente.
mostrarMantenimiento();
