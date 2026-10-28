// Es basicamente nuestra base de datos en memoria. 
// Se reiniciara cada vez que se reinicia el servidor por que son
// datos predeterminados.

export const menu = [
  { id: 101, nombre: "Pollo a la plancha", precio: 5.5, stock: 12, categoria: "Fuerte", imagen: "/img/plato-101.jpg" },
  { id: 102, nombre: "Pasta Alfredo", precio: 4.75, stock: 8, categoria: "Fuerte", imagen: "/img/plato-102.jpg" },
  { id: 103, nombre: "Ensalada Cesar", precio: 3.25, stock: 10, categoria: "Entrada", imagen: "/img/plato-103.jpg" },
  { id: 104, nombre: "Sopa del Dia", precio: 2.5, stock: 15, categoria: "Entrada", imagen: "/img/plato-104.jpg" },
  { id: 105, nombre: "Pupusas (3 unidades)", precio: 2.6, stock: 20, categoria: "Fuerte", imagen: "/img/plato-105.jpg" },
  { id: 106, nombre: "Pastel de Chocolate", precio: 2.75, stock: 6, categoria: "Postre", imagen: "/img/plato-106.jpg" },
  { id: 107, nombre: "Limonada Natural", precio: 1.5, stock: 25, categoria: "Bebida", imagen: "/img/plato-107.jpg" },
  { id: 108, nombre: "Lasaña de Carne", precio: 6.0, stock: 0, categoria: "Fuerte", imagen: "/img/plato-108.jpg" },
];

export const tiempoLimite = 3000; //Tiempo en segundos

export const reserva = {
  saldo: 25.0, //El dinero actual por default esta a $25
  itemsReservados: [], // [{ id: 101, cantidad: 2 }]
  expiraEn: null, //Usare timestamp
};

export const redondear = (valor) => 
  Math.round(valor * 100) / 100;

//Retornar el plato buscado por id donde el resultado sea true, sino indefinido
export const buscarPlato = (id) => 
  menu.find((plato) => plato.id === id);

//Retornar el Item Reservado buscado por id donde el resultado sea true, sino indefinido
export const buscarItemReservado = (id) =>
  reserva.itemsReservados.find((item) => item.id === id);

//Para todos los items reservados acumula el precio y se redondea
export const calcularTotal = () => {
  const total = reserva.itemsReservados.reduce((acumulado, item) => {
    const plato = buscarPlato(item.id);
    return acumulado + plato.precio * item.cantidad;
  }, 0);

  return redondear(total);
};

//Retorna un JSON con el resumen de la reserva y estado (tiempo restante)
export const obtenerResumenReserva = () => ({
  saldo: reserva.saldo,
  itemsReservados: reserva.itemsReservados.map((item) => { //Recorre todos los items reservados
    const plato = buscarPlato(item.id);
    return {
      id: item.id,
      cantidad: item.cantidad,
      nombre: plato.nombre,
      precio: plato.precio,
    };
  }),
  total: calcularTotal(),
  segundosRestantes: reserva.expiraEn === null ? null : Math.max(0, Math.ceil((reserva.expiraEn - Date.now()) / 1000)),
  //Se actualiza en cada consulta el tiempo restante
});

//Un temporizador que iniciara cuando se agregue el primer plato
export const iniciarTemporizador = () => {
  if (reserva.expiraEn === null) {
    reserva.expiraEn = Date.now() + tiempoLimite * 1000;
  }
};

//Si se acaba el tiempo, cada plato regresa al menu y vacia la reservacion
export const liberarSiExpiro = () => {
  if (reserva.expiraEn === null || Date.now() < reserva.expiraEn) return false;

  //Volver a los valores predeterminados
  reserva.itemsReservados.forEach((item) => {
    buscarPlato(item.id).stock += item.cantidad;
  });
  reserva.itemsReservados = [];
  reserva.expiraEn = null;
  return true;
};