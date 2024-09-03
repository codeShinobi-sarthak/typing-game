const quotes = [
    "There is nothing more deceptive than an obvious fact.",
    "The only way to do great work is to love what you do. — Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill",
    "In the end, we will remember not the words of our enemies, but the silence of our friends. — Martin Luther King Jr.",
    "Do not wait to strike till the iron is hot, but make it hot by striking. — William Butler Yeats",
    "The only limit to our realization of tomorrow is our doubts of today. — Franklin D. Roosevelt",
    "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it. — Jordan Belfort",
    "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
    "You must be the change you wish to see in the world. — Mahatma Gandhi",
    "Believe you can and you're halfway there. — Theodore Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. — Confucius"
    "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
    "I never make exceptions. An exception disproves the rule.",
    "What one man can invent another can discover.",
    "Nothing clears up a case so much as stating it to another person.",
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
