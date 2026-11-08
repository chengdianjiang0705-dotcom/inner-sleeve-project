// A small artist-identification game using arrays, conditions and DOM events.
const questions = [
    { type: 'A closer listen', clue: 'In "Self Control", a spare guitar setting opens into layered voices. Whose approach to memory and perspective are we hearing?', answer: 'frank', explanation: 'Frank Ocean. The contrast between the intimate opening and layered ending is a useful starting point for listening to Blonde.' },
    { type: 'Voice & space', clue: '"Let Me Go" belongs to NEVER ENOUGH. This artist often places a close, expressive lead vocal against spacious R&B arrangements. Who is it?', answer: 'daniel', explanation: 'Daniel Caesar. Listen for the way his phrasing and the space around his voice can suggest intimacy and distance at once.' },
    { type: 'Memory & colour', clue: 'On "November", this artist uses the name of a month as a way into memory. His Flower Boy world pairs reflection with warm, colourful imagery. Who is it?', answer: 'tyler', explanation: 'Tyler, the Creator. The track invites a reading of November as a personal place in memory, rather than simply a calendar date.' },
    { type: 'Sleeve notes', clue: 'A white sleeve, green hair and a hand across the face: Blonde is the 2016 album by which artist?', answer: 'frank', explanation: 'Frank Ocean. The supplied Blonde sleeve anchors his artist study; its restrained sleeve is part of the visual identity of Blonde.' },
    { type: 'Sleeve notes', clue: 'A deep blue image sets the visual mood for NEVER ENOUGH, the 2023 album containing "Cool" and "Let Me Go". Which artist made it?', answer: 'daniel', explanation: 'Daniel Caesar. Both tracks belong to NEVER ENOUGH; the newer "Who Knows" and "Sins Of The Father" belong to Son Of Spergy.' },
    { type: 'Sleeve notes', clue: 'Sunflowers, orange skies and a carefully built visual world: Flower Boy contains "See You Again" and "911 / Mr. Lonely". Who created it?', answer: 'tyler', explanation: 'Tyler, the Creator. His production and visual direction make the album a useful case study in how colour and sound work together.' },
    { type: 'Find the connection', clue: 'One listening route moves from the early "Acura Integurl" to "White Ferrari", then to the standalone single "Chanel". Which artist connects these tracks?', answer: 'frank', explanation: 'Frank Ocean. These selections move between an early track, Blonde and a later single, rather than staying inside one album.' },
    { type: 'Find the connection', clue: '"Who Knows" and "Sins Of The Father" appear on Son Of Spergy, while "Cool" offers an earlier entry point. Whose listening route is this?', answer: 'daniel', explanation: 'Daniel Caesar. The route connects NEVER ENOUGH (2023) with Son Of Spergy (2025), giving a small view of his development.' },
    { type: 'Find the connection', clue: '"EARFQUAKE" opens a door into IGOR. "See You Again" and "911 / Mr. Lonely" take us back to Flower Boy. Which artist connects these worlds?', answer: 'tyler', explanation: 'Tyler, the Creator. Different albums build different musical and visual identities, while his attention to melody runs through both.' }
];
const artistNames = { frank: 'Frank Ocean', daniel: 'Daniel Caesar', tyler: 'Tyler, the Creator' };
let questionIndex = 0;
let score = 0;
let answered = false;
const intro = document.getElementById('game-intro');
const play = document.getElementById('game-play');
const result = document.getElementById('game-result');
const answers = document.querySelectorAll('[data-answer]');
const nextButton = document.getElementById('next-question');

function showQuestion() {
    answered = false;
    const question = questions[questionIndex];
    document.getElementById('round-number').textContent = String(questionIndex + 1);
    document.getElementById('score').textContent = String(score);
    document.getElementById('clue-type').textContent = question.type;
    document.getElementById('game-question').textContent = question.clue;
    document.getElementById('feedback').textContent = 'Choose one artist. Take your time; there is no timer.';
    document.getElementById('progress-fill').style.width = (questionIndex / questions.length * 100) + '%';
    for (let i = 0; i < answers.length; i++) {
        answers[i].disabled = false;
        answers[i].classList.remove('correct', 'incorrect');
    }
    nextButton.disabled = true;
    nextButton.textContent = questionIndex === questions.length - 1 ? 'See result \u2192' : 'Next clue \u2192';
    document.getElementById('game-question').focus();
}

function startGame() {
    questionIndex = 0;
    score = 0;
    intro.hidden = true;
    result.hidden = true;
    play.hidden = false;
    showQuestion();
}

for (let i = 0; i < answers.length; i++) {
    answers[i].addEventListener('click', function () {
        // Ignore additional clicks once this round has been answered.
        if (answered) return;
        answered = true;
        const question = questions[questionIndex];
        const correct = answers[i].dataset.answer === question.answer;
        if (correct) score++;
        document.getElementById('score').textContent = String(score);
        for (let j = 0; j < answers.length; j++) {
            answers[j].disabled = true;
            if (answers[j].dataset.answer === question.answer) answers[j].classList.add('correct');
        }
        if (!correct) answers[i].classList.add('incorrect');
        document.getElementById('feedback').textContent = (correct ? 'Correct. ' : 'The answer is ' + artistNames[question.answer] + '. ') + question.explanation;
        document.getElementById('progress-fill').style.width = ((questionIndex + 1) / questions.length * 100) + '%';
        nextButton.disabled = false;
    });
}

nextButton.addEventListener('click', function () {
    if (!answered) return;
    if (questionIndex < questions.length - 1) {
        questionIndex++;
        showQuestion();
    } else {
        play.hidden = true;
        result.hidden = false;
        document.getElementById('final-score').textContent = score + ' out of ' + questions.length;
        document.getElementById('result-message').textContent = score >= 7
            ? 'You are finding the connections. Return to a favourite track and see what else you notice.'
            : 'Every clue is a listening invitation. Explore the artist studies, then try another round.';
        document.getElementById('result-heading').focus();
    }
});
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('restart-game').addEventListener('click', startGame);
document.getElementById('play-again').addEventListener('click', startGame);
