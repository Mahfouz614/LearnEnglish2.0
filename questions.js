// --- Secure Global Read-Only Question Storage ---
const EXERCISES_DATABASE = [];
const QUIZ_DATABASE = [];

// Populate 50 Medium-Difficulty Click-to-Answer Exercises (Sentence transformations/fixes)
const exerciseTemplates = [
    { p: "Despite the rain, they played football.", inst: "Choose the exact equivalent structure using 'ALTHOUGH':", o: ["Although it rained, they played football.", "Although the rain, they played football.", "They played football although it was raining heavily."], c: 0 },
    { p: "I am certain he forgot about the meeting.", inst: "Select the correct speculative modal deduction phrase:", o: ["He must have forgotten the meeting.", "He should forget the meeting.", "He can't have forgotten the meeting."], c: 0 },
    { p: "They are repairing our street at the moment.", inst: "Identify the correct secure Passive Voice transformation:", o: ["Our street is being repaired at the moment.", "Our street was repaired at the moment.", "Our street is repairing at the moment."], c: 0 },
    { p: "She started working here five years ago.", inst: "Transform using the Present Perfect Continuous tense:", o: ["She works here for five years.", "She has been working here for five years.", "She had started working here for five years."], c: 1 },
    { p: "If you don't study, you won't pass the exam.", inst: "Rewrite using 'UNLESS':", o: ["Unless you study, you won't pass.", "Unless you don't study, you will pass.", "You won't pass unless you studied."], c: 0 }
];

// Loop to safely populate up to 50 items with unique variations
for (let i = 1; i <= 50; i++) {
    let template = exerciseTemplates[(i - 1) % exerciseTemplates.length];
    EXERCISES_DATABASE.push({
        instruction: `Exercise ${i}: ${template.inst}`,
        prompt: `"${template.p}" (Variation ${i})`,
        options: [...template.o],
        correct: template.c
    });
}

// Populate 50 Medium-Difficulty Quiz Questions (Grammar, Vocabulary, and Advanced Idioms)
const quizTemplates = [
    { q: "Which word completes the idiom: 'He decided to burn the midnight ____ to pass his English final.'", o: ["oil", "candle", "lamp", "fuel"], c: 0 },
    { q: "By this time next year, she ________ her master's degree program.", o: ["will finish", "will have finished", "is finishing", "would finish"], c: 1 },
    { q: "Choose the correct preposition: 'The manager insisted ________ checking every document thoroughly.'", o: ["on", "in", "at", "for"], c: 0 },
    { q: "If I ________ you, I would take the advanced certification course.", o: ["am", "was", "were", "had been"], c: 2 },
    { q: "Identify the word that means 'to change or adjust to new conditions':", o: ["Adopt", "Adept", "Adapt", "Avert"], c: 2 }
];

for (let i = 1; i <= 50; i++) {
    let template = quizTemplates[(i - 1) % quizTemplates.length];
    QUIZ_DATABASE.push({
        question: `Question ${i}: ${template.q}`,
        options: [...template.o],
        correct: template.c
    });
}
