const jsonURL = "/json/ranking.json";
const table = document.getElementById('ranking-table');
const tbody = table.querySelector('tbody');
const mensajeNoRegistros = document.getElementById('mensaje-no-registros');
const mensajeFaltaCategoria = document.getElementById('mensaje-faltacategoria');
const selectTipoTorneo = document.getElementById('tipo-torneo');
const radioCategorias = document.querySelectorAll('input[type="radio"][name="categoria"]');
const thRow = table.querySelector('thead tr');
let filtrosSeleccionados = false;

table.style.display = 'none';
mensajeNoRegistros.style.display = 'none';
mensajeFaltaCategoria.style.display = 'none';

const mostrarMensajes = () => {
    const tipoTorneoSeleccionado = selectTipoTorneo.value;
    const categoriaSeleccionada = document.querySelector('input[type="radio"][name="categoria"]:checked')?.value || 'todos';

    mensajeFaltaCategoria.style.display = (tipoTorneoSeleccionado !== 'todos' && categoriaSeleccionada === 'todos') ? 'block' : 'none';
};

const showData = (filteredData) => {
    if (filtrosSeleccionados) {
        mensajeNoRegistros.style.display = filteredData.length === 0 ? 'block' : 'none';
        tbody.innerHTML = '';

        if (filteredData.length > 0) {
            filteredData.sort((a, b) => b.puntosTotales - a.puntosTotales);
            let posicion = 1;

            filteredData.forEach((jugador, index) => {
                if (index > 0 && jugador.puntosTotales < filteredData[index - 1].puntosTotales) {
                    posicion = index + 1;
                }

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${posicion}</td>
                    <td>${jugador.nombre}</td>
                    <td>${jugador.categoria}</td>
                    <td>${jugador.torneosJugados}</td>
                    <td>${jugador.puntosTotales}</td>
                `;
                tbody.appendChild(row);
            });

            table.style.display = 'table';
            thRow.style.display = 'table-row'; // Mostrar los encabezados
        } else {
            thRow.style.display = 'none'; // Ocultar los encabezados
        }
    } else {
        table.style.display = 'none';
        mensajeNoRegistros.style.display = 'none';
        tbody.innerHTML = '';
        mostrarMensajes();
    }
};

radioCategorias.forEach((radio) => {
    radio.addEventListener('change', () => {
        filtrosSeleccionados = true;
        mostrarMensajes();
        showData([]);
    });
});

selectTipoTorneo.addEventListener('change', () => {
    const tipoTorneoSeleccionado = selectTipoTorneo.value;
    const categoriaSeleccionada = document.querySelector('input[type="radio"][name="categoria"]:checked');

    if (categoriaSeleccionada) {
        categoriaSeleccionada.checked = false;
    }

    mensajeFaltaCategoria.style.display = 'none';

    filtrosSeleccionados = false;
    showData([]);
});

fetch(jsonURL)
    .then((response) => response.json())
    .then((data) => {
        const originalData = data;

        const applyFilters = () => {
            const tipoTorneoSeleccionado = selectTipoTorneo.value;
            const categoriaSeleccionada = document.querySelector('input[type="radio"][name="categoria"]:checked')?.value || 'todos';
            let filteredData = originalData;

            if (tipoTorneoSeleccionado !== 'todos') {
                filteredData = filteredData.filter((jugador) => jugador.tipoTorneo === tipoTorneoSeleccionado);
            }

            if (categoriaSeleccionada !== 'todos') {
                filteredData = filteredData.filter((jugador) => jugador.categoria === categoriaSeleccionada);
            }

            showData(filteredData);
        };

        radioCategorias.forEach((radio) => {
            radio.addEventListener('change', applyFilters);
        });

        showData(originalData);
    })
    .catch((error) => console.error('Error al cargar el JSON: ' + error));


