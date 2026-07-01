// --- QUIZ COMPONENT DATA & LOGIC ---
const quizData = [
    {
        question: "Choose the correct sentence:",
        options: ["She don't like coffee.", "She doesn't likes coffee.", "She doesn't like coffee."],
        correct: 2
    },
    {
        question: "Which word completes the sentence: 'I am looking forward ___ meeting you.'",
        options: ["to", "for", "at"],
        correct: 0
    }
];

let currentQuizIndex = 0;

function loadQuiz() {
    const data = quizData[currentQuizIndex];
    document.getElementById("question-text").innerText = data.question;
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    
    document.getElementById("quiz-feedback").classList.add("hidden");
    document.getElementById("next-quiz-btn").classList.add("hidden");

    data.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.innerText = option;
        button.onclick = () => selectQuizAnswer(index);
        optionsContainer.appendChild(button);
    });
}

function selectQuizAnswer(selectedIndex) {
    const data = quizData[currentQuizIndex];
    const feedback = document.getElementById("quiz-feedback");
    feedback.classList.remove("hidden");
    
    // Disable all options after answering
    document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);

    if (selectedIndex === data.correct) {
        feedback.innerText = "Correct answer! Well done.";
        feedback.className = "feedback correct";
    } else {
        feedback.innerText = `Incorrect. The right answer was: "${data.options[data.correct]}"`;
        feedback.className = "feedback incorrect";
    }
    
    document.getElementById("next-quiz-btn").classList.remove("hidden");
}

document.getElementById("next-quiz-btn").onclick = () => {
    currentQuizIndex = (currentQuizIndex + 1) % quizData.length;
    loadQuiz();
};

// --- EXERCISE COMPONENT LOGIC (Sentence Builder) ---
const exerciseCorrectOrder = ["She", "reads", "a", "book."];
let initialWords = ["reads", "book.", "She", "a"];

function initExercise() {
    const wordBank = document.getElementById("word-bank");
    const workspace = document.getElementById("workspace");
    const feedback = document.getElementById("exercise-feedback");
    
    wordBank.innerHTML = "";
    workspace.innerHTML = `<p class="placeholder-text">Click words above to build your sentence</p>`;
    feedback.classList.add("hidden");

    initialWords.forEach(word => {
        const tile = document.createElement("span");
        tile.className = "word-tile";
        tile.innerText = word;
        tile.onclick = () => handleTileClick(tile, wordBank, workspace);
        wordBank.appendChild(tile);
    });
}

function handleTileClick(tile, wordBank, workspace) {
    const placeholder = workspace.querySelector(".placeholder-text");
    if (placeholder) placeholder.remove();

    if (tile.parentElement === wordBank) {
        workspace.appendChild(tile);
    } else {
        wordBank.appendChild(tile);
        if (workspace.children.length === 0) {
            workspace.innerHTML = `<p class="placeholder-text">Click words above to build your sentence</p>`;
        }
    }
}

document.getElementById("check-exercise-btn").onclick = () => {
    const userWords = Array.from(document.getElementById("workspace").querySelectorAll(".word-tile"))
                           .map(tile => tile.innerText);
    const feedback = document.getElementById("exercise-feedback");
    feedback.classList.remove("hidden");

    const isCorrect = userWords.length === exerciseCorrectOrder.length && 
                      userWords.every((val, index) => val === exerciseCorrectOrder[index]);

    if (isCorrect) {
        feedback.innerText = "Excellent! The sentence is structurally perfect.";
        feedback.className = "feedback correct";
    } else {
        feedback.innerText = "Not quite right. Double-check your capitalization and syntax placement.";
        feedback.className = "feedback incorrect";
    }
};

document.getElementById("reset-exercise-btn").onclick = initExercise;

// --- INITIALIZE EVERYTHING ON RUN ---
window.onload = () => {
    loadQuiz();
    initExercise();
};
