const quotes = [
    "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
    "There is nothing more deceptive than an obvious fact.",
    "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
    "I never make exceptions. An exception disproves the rule.",
    "What one man can invent another can discover.",
    "Nothing clears up a case so much as stating it to another person.",
    "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
    "hello world",
];

let words = [];
let wordIndex = 0;
let startTime = Date.now();

const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");
const displayTypedValue = document.getElementById("display-typed-value");
const start = document.getElementById("start");

document.getElementById("start").addEventListener("click", function () {
    // Hide the start button
    document.getElementById("start-container").style.display = "none";
    // Show the game container
    const gameContainer = document.getElementById("game-container");
    gameContainer.style.display = "block";
    gameContainer.style.opacity = 0;
    // Animate the fade-in
    setTimeout(() => {
        gameContainer.style.opacity = 1;
    }, 50);

    // Continue with the game logic
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(" ");
    wordIndex = 0;

    const spanWords = words.map((word) => `<span>${word} </span>`);
    quoteElement.innerHTML = spanWords.join("");
    quoteElement.childNodes[0].className = "highlight";
    messageElement.innerText = "";
    typedValueElement.value = "";
    typedValueElement.focus();
    startTime = new Date().getTime();
});

typedValueElement.addEventListener("input", (e) => {
    const typedValue = e.target.value;
    const currentWord = words[wordIndex];

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        messageElement.innerText = `CONGRATULATIONS! You finished in ${
            elapsedTime / 1000
        } seconds.`;
        quoteElement.childNodes[wordIndex].className = "completed";
    } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
        e.target.value = "";
        wordIndex++;

        for (const wordElement of quoteElement.childNodes) {
            wordElement.classList.remove("highlight");
        }
        if (wordIndex < quoteElement.childNodes.length) {
            quoteElement.childNodes[wordIndex].className = "highlight";
            quoteElement.childNodes[wordIndex - 1].className = "completed";
        }

        displayTypedValue.innerHTML += " " + typedValue.trim();
    } else if (currentWord.startsWith(typedValue)) {
        typedValueElement.className = "";
    } else {
        typedValueElement.className = "error";
    }
});
