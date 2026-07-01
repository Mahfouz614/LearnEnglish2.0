// --- Secure App Encapsulation Architecture ---
(function () {
    'use strict';

    // State Variables (kept within private IIFE closure scope to protect manipulation)
    let totalScore = 0;
    let currentQuizIndex = 0;

    // --- Secure Content Repositories (Medium Level Difficulty) ---
    const exercisesData = {
        correctAnswer: "i have not seen him for three years",
        alternativeAnswer: "i haven't seen him for three years"
    };

    const quizQuestions = [
        {
            question: "Choose the correct idiom: Sarah had to ________ her presentation because the project scope changed completely.",
            options: ["go back to the drawing board", "hit the nail on the head", "burn the midnight oil", "bite the bullet"],
            correct: 0
        },
        {
            question: "Complete the sentence: If I ________ known you were arriving early, I would have met you at the station.",
            options: ["would have", "had", "should have", "have"],
            correct: 1
        },
        {
            question: "Identify the correct structure: Not only ________ the match, but they also broke the tournament record.",
            options: ["they won", "did they win", "they did win", "won they"],
            correct: 1
        }
    ];

    // --- DOM Cache Element Reference ---
    const elements = {
        scoreDisplay: document.getElementById('user-score'),
        exerciseInput: document.getElementById('exercise-input'),
        submitExerciseBtn: document.getElementById('submit-exercise'),
        exerciseFeedback: document.getElementById('exercise-feedback'),
        quizQuestionText: document.getElementById('quiz-question'),
        quizOptionsGrid: document.getElementById('quiz-options'),
        quizFeedback: document.getElementById('quiz-feedback'),
        secureModal: document.getElementById('secure-modal'),
        modalTitle: document.getElementById('modal-title'),
        modalMessage: document.getElementById('modal-message'),
        closeModalBtn: document.getElementById('close-modal')
    };

    // --- Security Sanitization Helper Utility ---
    // Prevents Cross-Site Scripting (XSS) by translating special characters to raw safe values
    function sanitizeInput(string) {
        const tempElement = document.createElement('div');
        tempElement.innerText = string;
        return tempElement.innerHTML.trim();
    }

    // --- Exercise Processing ---
    function checkExerciseAnswer() {
        const rawInput = elements.exerciseInput.value;
        const cleanInput = sanitizeInput(rawInput).toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");

        if (!cleanInput) {
            triggerShake(elements.exerciseInput);
            return;
        }

        if (cleanInput === exercisesData.correctAnswer || cleanInput === exercisesData.alternativeAnswer) {
            elements.exerciseFeedback.className = "feedback correct-state";
            elements.exerciseFeedback.textContent = "Excellent execution! That is structurally perfect.";
            updateScore(15);
            showSecureModal("Exercise Completed!", "Fantastic! You successfully resolved the sentence structure transformation (+15 XP).");
            elements.submitExerciseBtn.disabled = true;
        } else {
            elements.exerciseFeedback.className = "feedback wrong-state";
            elements.exerciseFeedback.textContent = "Not quite correct. Review your use of the Present Perfect tense with 'for'.";
            triggerShake(elements.exerciseInput);
        }
    }

    // --- Quiz Dynamic Render Engine ---
    function generateQuizQuestion() {
        if (currentQuizIndex >= quizQuestions.length) {
            elements.quizQuestionText.textContent = "🎉 You have cleared all available quizzes today!";
            elements.quizOptionsGrid.innerHTML = "";
            return;
        }

        const currentData = quizQuestions[currentQuizIndex];
        
        // Secure Injection using Safe Text Assignment
        elements.quizQuestionText.textContent = `Question ${currentQuizIndex + 1}: ${currentData.question}`;
        elements.quizOptionsGrid.innerHTML = "";
        elements.quizFeedback.textContent = "";

        currentData.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = "option-btn animate-pop";
            btn.textContent = option; // Safe text Node insertion
            btn.addEventListener('click', () => verifyQuizChoice(index));
            elements.quizOptionsGrid.appendChild(btn);
        });
    }

    function verifyQuizChoice(selectedIdx) {
        const currentData = quizQuestions[currentQuizIndex];
        const optionButtons = elements.quizOptionsGrid.querySelectorAll('.option-btn');

        // Disable options immediately to prevent race conditions or double clicks
        optionButtons.forEach(btn => btn.disabled = true);

        if (selectedIdx === currentData.correct) {
            elements.quizFeedback.className = "feedback correct-state";
            elements.quizFeedback.textContent = "Correct! Spot on logic.";
            updateScore(10);
            
            setTimeout(() => {
                currentQuizIndex++;
                generateQuizQuestion();
            }, 1500);
        } else {
            elements.quizFeedback.className = "feedback wrong-state";
            elements.quizFeedback.textContent = "Incorrect option choice. Try reading the full context clue.";
            triggerShake(optionButtons[selectedIdx]);
            
            // Re-enable after delay for retry
            setTimeout(() => {
                optionButtons.forEach(btn => btn.disabled = false);
            }, 1000);
        }
    }

    // --- Mechanics & Feedback Infrastructure ---
    function updateScore(points) {
        totalScore += points;
        elements.scoreDisplay.textContent = totalScore;
    }

    function triggerShake(element) {
        element.classList.add('shake');
        element.addEventListener('animationend', () => {
            element.classList.remove('shake');
        }, { once: true });
    }

    function showSecureModal(title, msg) {
        elements.modalTitle.textContent = title;
        elements.modalMessage.textContent = msg;
        elements.secureModal.classList.remove('hidden');
    }

    function hideSecureModal() {
        elements.secureModal.classList.add('hidden');
    }

    // --- Hook Application Listeners ---
    elements.submitExerciseBtn.addEventListener('click', checkExerciseAnswer);
    elements.closeModalBtn.addEventListener('click', hideSecureModal);
    elements.exerciseInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkExerciseAnswer();
    });

    // Initialize System
    generateQuizQuestion();

})();
