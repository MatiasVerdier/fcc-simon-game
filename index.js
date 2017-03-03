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

// Add event listener for handle click on the board buttons
board.addEventListener('click', function(evt) {
    let target = evt.target;
    if (target && target.classList.contains('simon-button')) {
        playSound(target.id);
    }
});


function playSound(color) {
    let audio = buttons[color].sound;
    buttons[color].el.classList.add('active');
    audio.play();
}
