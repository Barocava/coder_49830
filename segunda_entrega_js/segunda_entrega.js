class Casas {
  constructor(objeto){
    this.nombre = objeto.nombre;
    this.precio = objeto.precio;
  }
}

class Carrito {
  constructor(nombre){
    this.nombre = nombre;
    this.productos = [];
    this.precio = 0;
  }

  agregarProductos(objetoCasa){
    this.productos.push(objetoCasa);
    this.precio = this.precio + objetoCasa.precio;
  }

  quitarProductos(indice){
    this.precio = this.precio - this.productos[indice].precio;
    this.productos.splice(indice,1);
    
  }

  listarProductos(){
    let mensaje = "";
    let contador = 1;
    if(this.productos.length === 0){ return "Su lista de productos esta vacia" }
    else {
      for(let objeto of this.productos){
        mensaje = `${mensaje} ${contador} - ${objeto.nombre}, Precio: ${objeto.precio} \n`
        contador += 1;
      }
      return `Su carrito hasta los momentos:\n${mensaje}`;
    }
  }
}

function main(){
  let carrito = null;
  while(true){

    opcion = prompt(`
    Ingrese una opcion:\n
    0 - Crear carrito\n
    1 - Listar productos\n
    2 - Agregar productos\n
    3 - Quitar productos\n
    4 - Precio del Carrito\n
    5 - Elimnar Carrito\n
    6 - Salir\n`).toLowerCase();

    if (opcion === "6") break;
    opcion = Number(opcion);

    switch (opcion) {
      case 0:
        if(carrito === null){
          let nombre_carrito = prompt("Ingrese el nombre de su carrito");
          carrito = new Carrito(nombre_carrito);
        }
        else {
          alert("Ya tiene un carrito. Si desea crear uno nuevo, elimine el existente");
        }
        break;
      case 1:
        if(carrito === null) { alert("No tiene carrito creado");}
        else { 
          alert(carrito.listarProductos());
        }
        break;
      case 2:
        if(carrito === null) { alert("No tiene carrito creado");}
        else {
          let nombre = prompt("Ingrese el nombre de la casa que desea comprar");
          let precio = Number(prompt("Ingrese el precio de la propiedad"));
          const casa = new Casas({nombre:nombre, precio:precio});
          carrito.agregarProductos(casa);
        }
        break;
      case 3:
        if(carrito === null) { alert("No tiene carrito creado");}
        else if (carrito.productos.length < 1) { alert("No tiene productos en el carrito");}
        else {
          opcion = Number(prompt(`Que productos desea eliminar ?\nSeleccione una de las siguientes opciones mediente el numero que precede a su producto\n${carrito.listarProductos()}`));
          carrito.quitarProductos(opcion-1);
          alert("Su producto ha sido eliminado");
        }
        break;
      case 4:
        if(carrito === null) { alert("No tiene carrito creado");}
        else {
          alert(`El precio acumulado en el carrito es de ${carrito.precio}`)
        }
        break;
      case 5:
        carrito = null;
        alert("Su carrito ha sido eliminado");
        break;
      default:
        alert("Ingrese un menu valido");
        break;
    }

  }
}

main();