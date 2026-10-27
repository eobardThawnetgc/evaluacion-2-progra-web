import { secretNumber, generateNewNumber } from "../data/generateNumber.js";

export const verifySecretNumber = (req, res) => {
    const number = req.body.number;
    const parsedNumber = Number(number);
    if (
        number === undefined ||
        number === null ||
        number === "" ||
        !Number.isInteger(parsedNumber) ||
        parsedNumber < 1 ||
        parsedNumber > 100
    ) {
        return res.status(400).json({
            message: "Debes ingresar un número entero entre 1 y 100"
        });
    }

    // console.log("Numero a adivinar: ", secretNumber);   

    const isEqual = secretNumber === parsedNumber;
    const isLower = parsedNumber < secretNumber;

    if (isEqual) return res.status(200).json({
        message: "Adivinaste el número secreto",
        result: "correcto"
    })

    if (isLower) {
        return res.status(200).json({
            message: "El número ingresado es menor que el número secreto",
            result: "menor"
        });
    }

    return res.status(200).json({
        message: "El número ingresado es mayor que el número secreto",
        result: "mayor"
    });
}

export const resetSecretNumber = (req, res) => {
    generateNewNumber();
    res.status(200).json({ message: "Número secreto reiniciado exitosamente" });
}