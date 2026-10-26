import {
  menu,
  reserva,
  buscarPlato,
  buscarItemReservado,
  calcularTotal,
  obtenerResumenReserva,
} from "../data/store.js";

//Funcion para poder verificar si es un tipo int y mayo a 0
const esEnteroPositivo = (valor) => Number.isInteger(valor) && valor > 0;

// GET /api/reserva
export const obtenerReserva = (req, res) => {
  res.status(200).json(obtenerResumenReserva());
};

// POST /api/reserva/agregar  { platoID, cantidad }
export const agregarAReserva = (req, res) => {
  const { platoID, cantidad } = req.body;

  if (!esEnteroPositivo(platoID) || !esEnteroPositivo(cantidad)) {
    return res.status(400).json({ mensaje: "platoID y cantidad deben ser numeros enteros positivos" });
  }

  const plato = buscarPlato(alimentoId);
  if (!plato) {
    return res.status(404).json({ mensaje: "El platillo no existe" });
  }

  if (plato.stock < cantidad) {
    return res.status(400).json({ mensaje: "Stock insuficiente" });
  }

  if (calcularTotal() + plato.precio * cantidad > reserva.saldo) {
    return res.status(400).json({ mensaje: "Saldo insuficiente para esta cantidad" });
  }

  const itemExistente = buscarItemReservado(alimentoId);
  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    reserva.itemsReservados.push({ id: alimentoId, cantidad });
  }

  plato.stock -= cantidad; // bloquea el stock o lo retiene

  res.status(201).json({
    mensaje: "Platillo añadido a la reserva",
    reserva: obtenerResumenReserva(),
  });
};

// PUT /api/reserva/actualizar-porciones/:id  { cantidad }
export const actualizarPorciones = (req, res) => {
  const id = Number(req.params.id);
  const { cantidad } = req.body;

  if (!esEnteroPositivo(cantidad)) {
    return res.status(400).json({ mensaje: "La cantidad debe ser un entero mayor a 0" });
  }

  const item = buscarItemReservado(id);
  if (!item) {
    return res.status(404).json({ mensaje: "El platillo no está en tu reserva" });
  }

  const plato = buscarPlato(id);
  const diferencia = cantidad - item.cantidad; // positivo = sube, negativo = baja

  if (diferencia > 0) {
    if (plato.stock < diferencia) {
      return res.status(400).json({ mensaje: "Stock insuficiente" });
    }
    if (calcularTotal() + plato.precio * diferencia > reserva.saldo) {
      return res.status(400).json({ mensaje: "Saldo insuficiente para esta cantidad" });
    }
  }

  plato.stock -= diferencia; // si baja, devuelve la diferencia y si sube, las descuenta
  item.cantidad = cantidad;

  res.status(200).json({
    mensaje: "Porciones actualizadas",
    reserva: obtenerResumenReserva(),
  });
};

// DELETE /api/reserva/eliminar/:id
export const eliminarDeReserva = (req, res) => {
  const id = Number(req.params.id);

  const item = buscarItemReservado(id);
  if (!item) {
    return res.status(404).json({ mensaje: "El platillo no está en tu reserva" });
  }

  const plato = buscarPlato(id);
  plato.stock += item.cantidad; // devuelve las unidades o platos al menu de regreso

  reserva.itemsReservados = reserva.itemsReservados.filter((i) => i.id !== id);

  res.status(200).json({
    mensaje: "Platillo eliminado de la reserva",
    reserva: obtenerResumenReserva(),
  });
};