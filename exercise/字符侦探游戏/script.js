const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `${selectedWord.split('').map(
        letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`
    ).join('')}`;
    const innerWord = wordEl.innerText.replace(/[ \n]/g, '');
    if(innerWord === selectedWord) {
        finalMessage.innerText = '恭喜！你赢了！';
        finalMessageRevealWord.innerText = '';
        popup.style.display = 'flex';
        playable = false;
    }
}

function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>错误</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    figureParts.forEach((part, index)=> {
        const errors = wrongLetters.length;
        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = '游戏结束';
        finalMessageRevealWord.innerText = `这个单词是: ${selectedWord}`;
        popup.style.display = 'flex';
        playable = false;
    }
}

function showNotification() {
    notification.classList.add('show');
    setInterval(() => {
        notification.classList.remove('show')
    }, 2000)
}

window.addEventListener('keydown', e => {
    if(playable) {
        if(e.keyCode >= 65 && e.keyCode <= 90){
            const letter = e.key.toLowerCase();
            if(selectedWord.includes(letter)) {
                if(!correctLetters.includes(letter)) {
                    correctLetters.push(letter);
                    displayWord();
                } else {
                    showNotification();
                }
            } else {
                if(!wrongLetters.includes(letter)) {
                    wrongLetters.push(letter);
                    updateWrongLettersEl();
                }else {
                    showNotification();
                }
            }
        }
    }
});

playAgainBtn.addEventListener('click', () => {
    playable = true;
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
});

displayWord();