//Calcular valor final de un producto seleccionado en función de impuestos y descuentos.
function calculaDescuento(precio, descuento) {
    precio = Number(precio);
    descuento = Number(descuento);
    if (esNaN(precio) || esNull(precio) || esNaN(descuento) || esNull(descuento)) {
        mensajeError();
        return null;
    } 
    if (esNegativo(precio) || esNegativo(descuento)) {
        mensajeNegativo();
        return null;
    } 
    let precio_final = precio - (precio * descuento/100);
    return `El precio final de su producto es de ${precio_final}`;
}

//Calcular pagos en cuotas sobre un monto determinado.
function pagoCuotas(monto, cuotas, interes){
    monto = Number(monto);
    cuotas = Number(cuotas);
    if (esNaN(monto) || esNull(monto) || esNaN(cuotas) || esNull(cuotas)) {
        mensajeError();
        return null;
    } 
    if (esNegativo(monto) || esNegativo(cuotas)) {
        mensajeNegativo();
        return null;
    } 
    let monto_final = 0;
    if (cuotas === 3 || cuotas === 12) monto_final = monto;
    else { monto_final = monto + monto*interes/100;}
    return `Su pago sera en ${cuotas} cuotas y el valor de cada cuota será de ${monto_final/cuotas}.\n Su costo total será de ${monto_final}`;

}

//Retorna si un numero es primo o no
function esPrimo(numero){
    entrada = Number(numero);
    if (esNaN(numero) || esNull(numero)) {
        mensajeError();
        return null;
    } 
    if (esNegativo(numero)) {
        mensajeNegativo();
        return null;
    } 
    techo = Math.round((Math.sqrt(entrada)));
    for(let x = 2; x<techo;x++){
        if(entrada%x === 0) return alert("Su numero no es primo");}
    return alert("Su numero es primo");
      
    
}
const esNaN = valor => (valor !== valor);
const esNull = valor => (valor === null);
const esNegativo = negativo => (negativo < 0 );
const esNeutro = neutro => (neutro === 0 );
const mensajeError = () => {
    console.log("Ha ingresado un valor incorrecto");
}
const mensajeNegativo = () => {
    console.log("Ha ingresado un numero Negativo");
}


function main() {
    while (true) {
      opcion = prompt(`
    Ingrese una opcion:\n
    1 - Calcular valor final de un producto seleccionado en función de impuestos y descuentos.\n
    2 - Calcular pagos en cuotas sobre un monto determinado.\n
    3 - Determina si un numero es primo\n`).toLowerCase();
      if (opcion === "esc") break;
      opcion = Number(opcion);

      switch (opcion) {
        case 1:
          let precio = prompt("Ingrese el precio de su producto");
          let descuento = prompt("Ingrese el descuento ( entre el 0-99 )");
          alert(calculaDescuento(precio, descuento));
          break;
        case 2:
          let monto = prompt("Ingrese el monto");
          let cuotas = prompt(
            "Ingrese el numero de cuotas\n\t3 y 12 cuotas sin interes"
          );
          alert(pagoCuotas(monto, cuotas, 20));
          break;
        case 3:
          let numero = prompt("Ingrese un numero");
          esPrimo(numero);
          break;
        default:
          alert("Ingrese un menu valido");
          break;
      }
    }
}

main();