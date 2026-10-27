import express from "express";

import { verifySecretNumber, resetSecretNumber } from "./controllers/guessNumber.js";
import { obtenerMenu } from "./controllers/menuController.js";
import {
  obtenerReserva,
  agregarAReserva,
  actualizarPorciones,
  eliminarDeReserva,
} from "./controllers/reservaController.js";

const router = express.Router();

//endpoints para el ejercicio 1
router.post("/guessNumber", verifySecretNumber);
router.post("/guessNumber/reset", resetSecretNumber);

//endpoints para el ejercicio 2

router.get("/api/menu", obtenerMenu);
router.get("/api/reserva", obtenerReserva);
router.post("/api/reserva/agregar", agregarAReserva);
router.put("/api/reserva/actualizar-porciones/:id", actualizarPorciones);
router.delete("/api/reserva/eliminar/:id", eliminarDeReserva);

export default router;