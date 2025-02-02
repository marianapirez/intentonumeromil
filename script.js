// Lista de invitados con sus cupos asignados
const invitados = {
    "Makinson dos Santos": 1,
    "Sandra dos Santos Gómez": 2,
    "Jazmín Rivero": 3,
    "Carina Ramos": 4,
    "Loy Gomez": 1
};

// Función para cambiar de sección sin recargar la página
function cambiarSeccion(esconder, mostrar) {
    document.getElementById(esconder).style.display = "none";
    document.getElementById(mostrar).style.display = "block";
}

// Página 1 → Buscar invitado y pasar a Página 2
function buscarInvitado(event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    if (nombre === "") {
        alert("Por favor, ingrese su nombre.");
        return;
    }

    if (invitados[nombre] !== undefined) {
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("cupos", invitados[nombre]);

        document.getElementById("nombreInvitado").textContent = nombre;
        document.getElementById("cupos").textContent = invitados[nombre];

        cambiarSeccion("pagina1", "pagina2");
    } else {
        alert("Nombre no encontrado en la lista de invitados.");
    }
}

// Página 2 → Confirmar asistencia y pasar a Página 3
function guardarConfirmacion(event) {
    event.preventDefault();

    const asistencia = document.querySelector('input[name="asistencia"]:checked');
    const lugares = document.getElementById("lugaresConfirmados").value;

    if (!asistencia) {
        alert("Por favor, seleccione si asistirá.");
        return;
    }

    if (asistencia.value === "si") {
        const cuposDisponibles = parseInt(localStorage.getItem("cupos"));
        const lugaresConfirmados = parseInt(lugares);

        if (isNaN(lugaresConfirmados) || lugaresConfirmados < 1 || lugaresConfirmados > cuposDisponibles) {
            alert(`Ingrese un número válido de lugares (máximo ${cuposDisponibles}).`);
            return;
        }
    }

    localStorage.setItem("asistenciaConfirmada", asistencia.value);
    cambiarSeccion("pagina2", "pagina3");
    cargarMensajeGracias();
}

// Página 3 → Mensaje personalizado
function cargarMensajeGracias() {
    const asistencia = localStorage.getItem("asistenciaConfirmada");
    const mensajeGracias = document.getElementById("mensajeGracias");
    const detalleGracias = document.getElementById("detalleGracias");

    if (asistencia === "si") {
        mensajeGracias.textContent = "¡Gracias por confirmar tu asistencia!";
        detalleGracias.textContent = "Nos vemos en los quince años de Luciana.";
    } else {
        mensajeGracias.textContent = "Lamentamos que no puedas asistir.";
        detalleGracias.textContent = "Espero verte en otra ocasión. ¡Gracias por avisarme!";
    }
}

// Asignar eventos
window.onload = function() {
    document.getElementById("continuarBtn").addEventListener("click", buscarInvitado);
    document.getElementById("confirmarBtn").addEventListener("click", guardarConfirmacion);
};

