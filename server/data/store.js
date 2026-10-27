// Es basicamente nuestra base de datos en memoria. 
// Se reiniciara cada vez que se reinicia el servidor por que son
// datos predeterminados.

export const menu = [
  { id: 101, nombre: "Pollo a la plancha", precio: 5.5, stock: 12, categoria: "Fuerte" },
  { id: 102, nombre: "Pasta Alfredo", precio: 4.75, stock: 8, categoria: "Fuerte" },
  { id: 103, nombre: "Ensalada Cesar", precio: 3.25, stock: 10, categoria: "Entrada" },
  { id: 104, nombre: "Sopa del Dia", precio: 2.5, stock: 15, categoria: "Entrada" },
  { id: 105, nombre: "Pupusas (3 unidades)", precio: 2.6, stock: 20, categoria: "Fuerte" },
  { id: 106, nombre: "Pastel de Chocolate", precio: 2.75, stock: 6, categoria: "Postre" },
  { id: 107, nombre: "Limonada Natural", precio: 1.5, stock: 25, categoria: "Bebida" },
  { id: 108, nombre: "Lasaña de Carne", precio: 6.0, stock: 0, categoria: "Fuerte" },
];

export const tiempoLimite = 180; //Tiempo en segundos

export const reserva = {
  saldo: 25.0, //El dinero actual por default esta a $25
  itemsReservados: [], // [{ id: 101, cantidad: 2 }]
  expiraEn: null, //Usare timestamp
};

const redondear = (valor) => 
  Math.round(valor * 100) / 100;

export const buscarPlato = (id) => 
  menu.find((plato) => plato.id === id);

export const buscarItemReservado = (id) =>
  reserva.itemsReservados.find((item) => item.id === id);

export const calcularTotal = () => {
  const total = reserva.itemsReservados.reduce((acumulado, item) => {
    const plato = buscarPlato(item.id);
    return acumulado + plato.precio * item.cantidad;
  }, 0);

  return redondear(total);
};


export const obtenerResumenReserva = () => ({
  saldo: reserva.saldo,
  itemsReservados: reserva.itemsReservados.map((item) => {
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
});

//Iniciara cuando se agregue el primer plato
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