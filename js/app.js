const formulario  = document.querySelector('#formulario');
const resultado  = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded',()=>{
    formulario.addEventListener('submit',validarFormulario);
})

function validarFormulario(e){
    e.preventDefault();
    const terminoBusqueda = document.querySelector('#busqueda').value;

    if (terminoBusqueda.length < 3) {
        mostrarAlerta('Debe introducir términos superio a 3 caracteres')

        return
    }

    consultarAPI(terminoBusqueda);
}

function consultarAPI(busqueda){
    const githubUrl = `https://jobs.github.com/positions.json?search=${busqueda}`;

    const url = `https://api.allorigins.win/get?url=${ encodeURIComponent( githubUrl) }`;
    axios.get(url)

    .then(resultados => mostrarVacante(JSON.parse(resultados.data.contents)));
}

function mostrarVacante(vacantes){
    while (resultado.firstChild) {
        resultado.firstChild.remove();
    }

    if (vacantes.length > 0) {

        vacantes.forEach(vacante => {

            const { company, title, type, url, description } = vacante; 
            resultado.innerHTML += `
                <div class="shadow bg-white p-6 rounded">
                    <h2 class="text-2xl font-light mb-4">${title}</h2>
                    <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                    <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                    <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" href="${url}">Ver Vacante</a>
                </div>
            `;
        });
        
    }else{
        const noResultado = document.createElement('p');
        resultado.classList.remove('grid');
        noResultado.classList.add('text-center', 'mt-10', 'text-gray-600', 'w-full');
        noResultado.textContent = "No se encontraron resultados";
        resultado.appendChild(noResultado);

    }


}

function mostrarAlerta(mensaje){

    const alerta = document.querySelector('.alerta');

    if (!alerta) {
        const divAlerta = document.createElement('div');
        divAlerta.textContent = mensaje;
    
        divAlerta.classList.add('bg-gray-100', 'p-3', 'text-center', 'mt-3', 'alerta');
        formulario.appendChild(divAlerta);

        setTimeout(() => {
            divAlerta.remove();
        }, 3000);
    }

}
 