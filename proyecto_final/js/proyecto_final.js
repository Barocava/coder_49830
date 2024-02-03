import { casas } from '../db/casas.js'; 

const filtro_menor_mayor = (arreglo_objetos, filtro) => {
    let arreglo = arreglo_objetos.slice();
    let aux = 0;
    for (let i = 0;  i < arreglo_objetos.length - 1; i++ ){
        for (let j = i+1; j < arreglo_objetos.length; j++){
            if (filtro==="mayor") {
                if(arreglo[j].precio > arreglo[i].precio) {
                    aux = arreglo[i];
                    arreglo[i] = arreglo[j];
                    arreglo[j] = aux;
                }
            } else {
                if(arreglo[j].precio < arreglo[i].precio) {
                    aux = arreglo[i];
                    arreglo[i] = arreglo[j];
                    arreglo[j] = aux;
                }

            }
        }
    }
    return arreglo;
};

const renderizarCarta = (elemento_padre, objeto) => {
    let contenedor = document.createElement("div");
    contenedor.className = "card col col-lg-4 py-3 m-3";
    contenedor.innerHTML = `<img src="${objeto.miniatura}" class="card-img-top" alt="${objeto.titulo}">
    <div class="card-body">
        <h5 class="card-title">${objeto.titulo}</h5>
        <p class="card-text"><strong>Metros:</strong> ${objeto.metros} m²<br>
            <strong>Ubicación:</strong> ${objeto.ubicacion}<br>
            <strong>Constructor:</strong> ${objeto.constructora}<br>
            <strong>Calculista:</strong> ${objeto.calculista}<br>
            <strong>Precio:</strong> ${objeto.precio}
        </p>

        <div class="acerca_botones" style="padding-block: 0rem">
          <button id="boton-${objeto.id}-a" type="button" class="btn btn-primary">Agregar(${retornaID(objeto.id)["stock"]})</button>
          <button id="boton-${objeto.id}-q" type="button" class="btn btn-primary">Quitar(${retornaID(objeto.id)["stock"]})</button>
      </div>

    </div>`;
    elemento_padre.append(contenedor);
};

const renderizaTotal = () => {
    let total = document.getElementById("total");
    let totales = 0;
    for(const producto of JSON.parse(localStorage.getItem(`inventario`))){
        totales = totales + producto["stock"];
    }
    total.innerText = `Total Productos: ${totales}`   
};

const vaciarCarrito = () => {
    localStorage.clear();
    inicializarLocalStorage(casas);
    location.reload();
};

const agregarCarrito = (event) => {
    let id = event.srcElement.id.split("-")[1];
    sumaInventario(id);
    actualizaBotones(event.srcElement.id);
    renderizaTotal();
};

const quitarCarrito = (event) => {
    let id = event.srcElement.id.split("-")[1];
    restaInventario(id);
    actualizaBotones(event.srcElement.id);
    renderizaTotal();
};

const actualizaBotones = (elemento) => {
    let boton_1 = elemento;
    let id = boton_1.split("-")[1];
    let boton_a = document.getElementById(`boton-${id}-a`);
    let boton_q = document.getElementById(`boton-${id}-q`);
    boton_a.innerText = `Agregar(${retornaID(id)["stock"]})`;
    boton_q.innerText = `Quitar(${retornaID(id)["stock"]})`;
};

const retornaID = (id) => {
    for(const producto of JSON.parse(localStorage.getItem(`inventario`))){
        if(producto["id"]===Number(id)) {return producto;}
    }
    return null;
};

const sumaInventario = (id) => {
    let objeto = JSON.parse(localStorage.getItem("inventario"));
    for(const producto of objeto){
        if(producto["id"]==id) producto["stock"] = producto["stock"] + 1;
    }
    localStorage.setItem("inventario",JSON.stringify(objeto));
};

const restaInventario = (id) => {
    let objeto = JSON.parse(localStorage.getItem("inventario"));
    for(const producto of objeto){
        if(producto["id"]==id) {
            if(producto["stock"] > 0) producto["stock"] = producto["stock"] - 1;
        }
    }
    localStorage.setItem("inventario",JSON.stringify(objeto));
};

const inicializarLocalStorage = (casas) => { 
    if(!JSON.parse(localStorage.getItem(`inventario`))){
    localStorage.setItem(`inventario`, JSON.stringify([]));
    for (const casa of casas){
        let objeto = JSON.parse(localStorage.getItem(`inventario`))
        objeto.push({"id":casa.id, "stock": casa.enCarrito});
        localStorage.setItem(`inventario`, JSON.stringify( objeto ));
    }
}
};

const filtro = (event) => {
    event.srcElement.id === "mayor" ? 
    sessionStorage.setItem("casas_ordenadas", JSON.stringify(filtro_menor_mayor(casas,"mayor"))) : 
    sessionStorage.setItem("casas_ordenadas", JSON.stringify(filtro_menor_mayor(casas,"menor")));
    location.reload();
};

const main = () => {
    inicializarLocalStorage(casas);
    renderizaTotal();
    sessionStorage.getItem("casas_ordenadas") || sessionStorage.setItem("casas_ordenadas", JSON.stringify(filtro_menor_mayor(casas,"mayor")));
    let casas_ordenadas = JSON.parse(sessionStorage.getItem("casas_ordenadas"));

    let section_1 = document.getElementById("section-1");
    let section_2 = document.getElementById("section-2");
    let section_3 = document.getElementById("section-3");
    let section_4 = document.getElementById("section-4");

    let i = 0;
    section_1 != null && casas_ordenadas.length > i && renderizarCarta(section_1,casas_ordenadas[i]);
    i++;
    section_1 != null && casas_ordenadas.length > i && renderizarCarta(section_1,casas_ordenadas[i]);
    i++;
    section_1 != null && casas_ordenadas.length > i && renderizarCarta(section_1,casas_ordenadas[i]);
    i++;
    section_2 != null && casas_ordenadas.length > i && renderizarCarta(section_2,casas_ordenadas[i]);
    i++;
    section_2 != null && casas_ordenadas.length > i && renderizarCarta(section_2,casas_ordenadas[i]);
    i++;
    section_2 != null && casas_ordenadas.length > i && renderizarCarta(section_2,casas_ordenadas[i]);
    i++;
    section_3 != null && casas_ordenadas.length > i && renderizarCarta(section_3,casas_ordenadas[i]);
    i++;
    section_3 != null && casas_ordenadas.length > i && renderizarCarta(section_3,casas_ordenadas[i]);
    i++;
    section_3 != null && casas_ordenadas.length > i && renderizarCarta(section_3,casas_ordenadas[i]);
    i++;
    section_4 != null && casas_ordenadas.length > i && renderizarCarta(section_4,casas_ordenadas[i]);
    i++;
    section_4 != null && casas_ordenadas.length > i && renderizarCarta(section_4,casas_ordenadas[i]);
    i++;
    section_4 != null && casas_ordenadas.length > i && renderizarCarta(section_4,casas_ordenadas[i]);
    i++;

    let boton_a = [];
    let boton_q = [];
    for (const casa of casas_ordenadas){
        let botones_a = document.getElementById(`boton-${casa.id}-a`);
        let botones_q = document.getElementById(`boton-${casa.id}-q`);
        botones_a != null && boton_a.push(botones_a);
        botones_q != null && boton_q.push(botones_q);
    }
    for(const listener of boton_a) {
        listener.addEventListener("click", agregarCarrito);
    }

    for(const listener of boton_q) {
        listener.addEventListener("click", quitarCarrito);
    }

    document.getElementById(`vaciar`).addEventListener("click", vaciarCarrito);
    document.getElementById(`mayor`).addEventListener("click", filtro);
    document.getElementById(`menor`).addEventListener("click", filtro);
};

const obtenerDatos = async () => {
    try {
      let response = await fetch('https://mindicador.cl/api/uf'); // Primer await: espera a que se complete la solicitud de red
      let data = await response.json(); // Segundo await: espera a que se lean los datos de la respuesta
      console.log(data['serie'][0]['valor']);
      return data['serie'][0]['valor'];
    } catch (error) {
      console.error('Error:', error);
      return 0;
    }
  }
  

obtenerDatos();
main();