console.log('freeCodeCamp Simon Game');

// Get the four button elements
let buttons = {
    green: {
        el: document.getElementById('green'),
        sound: ''
    },
    red: {
        el: document.getElementById('red'),
        sound: ''
    },
    yellow: {
        el: document.getElementById('yellow'),
        sound: ''
    },
    blue: {
        el: document.getElementById('blue'),
        sound: ''
    }
};

// Add sound reference to buttons object
// and event listener for all audio tags for handle end of playing
for (let color in buttons) {
    if (buttons.hasOwnProperty(color)) {
        let button = buttons[color];

        // Add reference to children audio tag as sound property
        button.sound = button.el.children[0];

        // Add event listener for ended event
        button.sound.addEventListener('ended', function(evt) {
            // Add class active to the button that is playing
            button.el.classList.remove('active');
        });
    }
}

// Get the board element
let board = document.getElementById('board');
let start = document.querySelector('.start');

// Add event listener for handle click on the board buttons
board.addEventListener('click', function(evt) {
    if (SimonGame.gameStarted) {
        let target = evt.target;
        if (target && target.classList.contains('simon-button')) {
            SimonGame.playPlayerStep(target.id);
        }
    }
});

start.addEventListener('click', function(evt) {
    this.innerHTML = 'Restart';
    SimonGame.startGame();
});

function playSound(color) {
    let audio = buttons[color].sound;
    buttons[color].el.classList.add('active');
    audio.play();
}

function generateSerie(size = 20) {
    let colors = ['green', 'red', 'yellow', 'blue'];
    let serie = [];
    for (let i = 0; i < size; i++) {
        let index = Math.floor(Math.random() * 4);
        serie.push(colors[index]);
    }

    return serie;
}

function playSerie(serie, step = 0) {
    if (step + 1 <= serie.length) {
        for (let i = 0; i < step + 1; i++) {
            setTimeout(function (){
                playSound(serie[i]);
            }, 1000 * i + 1000);
        }
    }
}

let SimonGame = {
    gameStarted: false,
    strictMode: false,
    currentStep: 0,
    serie: [],
    serieSize: 20,
    playerSerie: [],
    playerStep: 0,
    isPlayingSerie: false,
    currentStepElement: document.querySelector('.current-step'),
    startGame() {
        this.serie = generateSerie(this.serieSize);
        this.gameStarted = true;
        this.currentStepElement.innerHTML = this.currentStep + 1;
        playSerie(this.serie);
    },
    playPlayerStep(color) {
        playSound(color);
        this.playerSerie.push(color);
        
        if(this.playerSerie[this.playerStep] !== this.serie[this.playerStep]) {
            this.currentStepElement.innerHTML = 'You Miss!!';
            this.currentStep = 0;
            this.playerSerie = [];
            this.playerStep = 0;
            setTimeout(() => {
                this.currentStepElement.innerHTML = this.currentStep + 1;
                playSerie(this.serie, this.currentStep);
            }, 1000);
        } else if (this.playerStep < this.currentStep) {
            this.playerStep++;
        } else {
            this.currentStep++;
            this.playerSerie = [];
            this.playerStep = 0;
            setTimeout(() => {
                this.currentStepElement.innerHTML = this.currentStep + 1;
                playSerie(this.serie, this.currentStep);
            }, 500);
        }
    }
}

console.log(SimonGame);