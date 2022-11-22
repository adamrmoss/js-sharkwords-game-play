const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
    'strawberry',
    'orange',
    'apple',
    'banana',
    'pineapple',
    'kiwi',
    'peach',
    'pecan',
    'eggplant',
    'durian',
    'peanut',
    'chocolate',
];

let numWrong = 0;
let numCorrect = 0;

// Loop over the chars in `word` and create divs.
// The divs should be appended to the section with id="word-container".
const createDivsForChars = (word) => {
    const wordContainer = document.getElementById('word-container');
    for (let letter of word)
    {
        wordContainer.insertAdjacentHTML(
            'beforeend',
            `<div class="letter-box ${letter}"></div>`
        );
    }
};

// Loop over each letter in the alphabet and generate a button for each letter
// The buttons should be appended to the section with id="letter-buttons"
const generateLetterButtons = () => {
    const letterButtons = document.getElementById('letter-buttons');
    for (let letter of ALPHABET)
    {
        letterButtons.insertAdjacentHTML(
            'beforeend',
            `<button>${letter}</button>`
        );
    }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
    buttonEl.disabled = true;
};

// This is a helper function we will use in the future
// It should return `true` if `letter` is in the word
// For now, you should test it out to make sure it works

const isLetterInWord = (letter) => {
    const matchingLetterBox = document.querySelector(`.letter-box.${letter}`);
    return !!matchingLetterBox;
};

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
    const matchingLetterBoxes = document.querySelectorAll(`.letter-box.${letter}`);
    for (const matchingLetterBox of matchingLetterBoxes)
    {
        numCorrect++;
        matchingLetterBox.innerHTML = letter;
    }
};

//
// Called when `letter` is not in word.
// Increment `numWrong` and update the shark image.
const handleWrongGuess = () => {
    numWrong++;

    document.querySelector("#shark-img img")
        .setAttribute("src", `/static/images/guess${numWrong}.png`);
};

const disableAllButtons = () => {
    const allButtons = document.querySelectorAll('button');
    for (const button of allButtons)
    {
        button.disabled = true;
    }
};

const handleWin = () => {
    disableAllButtons();
    document.getElementById('win').style.display = '';
};

//
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.
const handleLoss = () => {
    disableAllButtons();
    document.getElementById('play-again').style.display = '';
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
    window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
    // For now, we'll hardcode the word that the user has to guess.
    const wordIndex = Math.floor(Math.random() * WORDS.length);
    const word = WORDS[wordIndex];

    createDivsForChars(word);
    generateLetterButtons();

    for (const button of document.querySelectorAll('button')) {
        button.addEventListener('click', (event) => {
            const button = event.target;
            const letter = button.innerHTML;
            button.disabled = true;

            if (isLetterInWord(letter))
            {
                handleCorrectGuess(letter);
            }
            else
            {
                handleWrongGuess();
            }

            if (numWrong >= 5)
            {
                handleLoss();
            }

            if (numCorrect == word.length)
            {
                handleWin();
            }
        });
    }

    // add an event handler to handle clicking on the Play Again links    
    document.getElementById('play-again').addEventListener('click', (event) => {
        resetGame();
    });

    document.getElementById('win').addEventListener('click', (event) => {
        resetGame();
    });
})();
