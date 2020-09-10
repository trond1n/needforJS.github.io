//переменные
const score = document.querySelector('.game__score');
const start = document.querySelector('.game__start-button');
const gameArea = document.querySelector('.game__area');
const car = document.createElement('div');
const button = document.querySelector('.game__start-button');
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
    speed: 3,
    traffic: 3,
};


//функции
function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
    start.classList.add('hide');
    gameArea.innerHTML = '';

    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';

        enemy.style.top = (enemy.y) + 'px';
        enemy.style.background = "transparent url('./image/enemy.png') center / cover no-repeat";
        gameArea.appendChild(enemy);
    }


    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    car.style.top = 'auto';
    car.style.bottom = '10px';
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function playGame() {

    if (setting.start) {
        setting.score += setting.speed;
        score.innerHTML = 'SCORE<br>' + setting.score;
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight + 50) {
            line.y = -100;
        }
    });

}

function moveEnemy() {
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function (enemy) {
        let carRect = car.getBoundingClientRect();
        let enemyRect = enemy.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
            setting.start = false;
            button.textContent = 'Нажми, чтобы начать заново!';
            start.classList.remove('hide');
            start.style.top = score.offsetHeight;

        }
        enemy.y += setting.speed / 2;
        enemy.style.top = enemy.y + 'px';

        if (enemy.y >= document.documentElement.clientHeight + 50) {
            enemy.y = -100 * setting.traffic;
            enemy.style.left = Math.floor((Math.random() * (gameArea.offsetWidth - 50))) + 'px';

        }
    });

}


//обработчики событый
start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);