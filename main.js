//переменные
const score = document.querySelector('.game__score');
const start = document.querySelector('.game__start-button');
const gameArea = document.querySelector('.game__area');
const car = document.createElement('div');
car.classList.add('car');

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false,
};
const setting = {
    start: false,
    scoree: 0,
    speed: 3
};


//функции
function startGame() {
    start.classList.add('hide');
    setting.game = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);

}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function playGame() {
    if (setting.start) {
        requestAnimationFrame(playGame);
    }
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}


//обработчики событый
start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);