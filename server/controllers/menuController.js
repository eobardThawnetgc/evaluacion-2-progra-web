import { menu } from "../data/store.js";

// GET /api/menu
export const obtenerMenu = (req, res) => {
  res.status(200).json(menu); //Mensaje de exito a nuestra api get y mostra json
};