export const generateNumber = () => Math.floor(Math.random() * 100) + 1;

export let secretNumber = generateNumber();

export const generateNewNumber = () => {
    const newNumber = generateNumber();
    secretNumber = newNumber;
}

