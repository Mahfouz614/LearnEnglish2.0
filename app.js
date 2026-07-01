(function () {
    'use strict';

    // State trackers
    let userScore = 0;
    let currentExerciseIdx = 0;
    let currentQuizIdx = 0;
    let itemsCompleted = 0;

    // DOM Mappings
    const dom = {
        score: document.getElementById('user-score'),
        progressText: document.getElementById('progress-text'),
        progressFill: document.getElementById('progress-fill'),
        
        exNum: document.getElementById('exercise-num'),
        exInstruction: document.getElementById('exercise-instruction'),
        exPrompt: document.getElementById('exercise-prompt'),
        exOptions: document.getElementById('exercise-options'),
        exFeedback: document.getElementById('exercise-feedback'),

        qzNum: document.getElementById('quiz-num'),
        qzPrompt: document.getElementById('quiz-prompt'),
        qzOptions: document.getElementById('quiz-options'),
        qzFeedback: document.getElementById('quiz-feedback'),

        modal: document.getElementById('secure-modal'),
        modalTitle: document.getElementById('modal-title'),
        modalMessage: document.getElementById('modal-message'),
        modalClose: document.getElementById('close-modal')
    };

    // Prevent content sniffing scripts or XSS
    function safeText(element, value) {
        element.textContent = value;
    }

    function renderExercise() {
        if (currentExerciseIdx >= EXERCISES_DATABASE.length) {
            dom.exPrompt.textContent = "🎉 Magnificent job! You completed all 50 interactive exercises!";
            dom.exOptions.innerHTML = "";
            return;
        }

        const item = EXERCISES_DATABASE[currentExerciseIdx];
        dom.exNum.textContent = currentExerciseIdx + 1;
        safeText(dom.exInstruction, item.instruction);
        safeText(dom.exPrompt, item.prompt);
        dom.exOptions.innerHTML = "";
        dom.exFeedback.textContent = "";

        item.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = "option-btn animate-pop";
            safeText(btn, opt);
            btn.addEventListener('click', () => verifyAnswer('exercise', idx, item.correct, btn));
            dom.exOptions.appendChild(btn);
        });
    }

    function renderQuiz() {
        if (currentQuizIdx >= QUIZ_DATABASE.length) {
            dom.qzPrompt.textContent = "🎉 Exceptional! All 50 advanced quizzes complete!";
            dom.qzOptions.innerHTML = "";
            return;
        }

        const item = QUIZ_DATABASE[currentQuizIdx];
        dom.qzNum.textContent = currentQuizIdx + 1;
        safeText(dom.qzPrompt, item.question);
        dom.qzOptions.innerHTML = "";
        dom.qzFeedback.textContent = "";

        item.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = "option-btn animate-pop";
            safeText(btn, opt);
            btn.addEventListener('click', () => verifyAnswer('quiz', idx, item.correct, btn));
            dom.qzOptions.appendChild(btn);
        });
    }

    function verifyAnswer(type, selected, correct, buttonElement) {
        const parent = type === 'exercise' ? dom.exOptions : dom.qzOptions;
        const feedback = type === 'exercise' ? dom.exFeedback : dom.qzFeedback;
        const buttons = parent.querySelectorAll('.option-btn');

        buttons.forEach(b => b.disabled = true);

        if (selected === correct) {
            buttonElement.classList.add('correct-visual');
            feedback.className = "feedback txt-correct";
            feedback.textContent = "Correct! +10 XP added.";
            
            userScore += 10;
            dom.score.textContent = userScore;
            itemsCompleted++;
            updateProgressBar();

            setTimeout(() => {
                if (type === 'exercise') {
                    currentExerciseIdx++;
                    if(currentExerciseIdx % 5 === 0) {
                        triggerMilestoneModal(`Exercise Milestone reached!`, `You have conquered ${currentExerciseIdx} custom syntax structures!`);
                    }
                    renderExercise();
                } else {
                    currentQuizIdx++;
                    if(currentQuizIdx % 5 === 0) {
                        triggerMilestoneModal(`Quiz Streak Active!`, `You have accurately solved ${currentQuizIdx} lexical quiz variations!`);
                    }
                    renderQuiz();
                }
            }, 1200);
        } else {
            buttonElement.classList.add('wrong-visual');
            feedback.className = "feedback txt-wrong";
            feedback.textContent = "Incorrect choice. Review syntax logic and try again!";
            
            buttonElement.classList.add('shake');
            buttonElement.addEventListener('animationend', () => buttonElement.classList.remove('shake'), {once: true});

            setTimeout(() => {
                buttons.forEach(b => {
                    b.disabled = false;
                    b.classList.remove('wrong-visual');
                });
                feedback.textContent = "";
            }, 1200);
        }
    }

    function updateProgressBar() {
        const total = EXERCISES_DATABASE.length + QUIZ_DATABASE.length; // 100
        const percentage = (itemsCompleted / total) * 100;
        dom.progressFill.style.width = `${percentage}%`;
        dom.progressText.textContent = `${itemsCompleted} / ${total} Completed`;
    }

    function triggerMilestoneModal(title, text) {
        safeText(dom.modalTitle, title);
        safeText(dom.modalMessage, text);
        dom.modal.classList.remove('hidden');
    }

    dom.modalClose.addEventListener('click', () => dom.modal.classList.add('hidden'));

    // Init Execution Loop
    renderExercise();
    renderQuiz();
})();
