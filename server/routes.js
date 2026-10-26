import express from "express";

import { verifySecretNumber, resetSecretNumber } from "./controllers/guessNumber.js";

const router = express.Router();

//endpoints para el ejercicio 1
router.post("/guessNumber", verifySecretNumber);
router.post("/guessNumber/reset", resetSecretNumber);

export default router;