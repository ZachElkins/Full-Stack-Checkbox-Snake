let snake, dir, food, score, moves, frames;
let lastMove;
let timer = null;
let looping = true;
let FPS = 30;
let difficulty = "medium";
let gameInProgress = false;
let moveAvailable = false;
let paused = false;

/* GAME LOOP LOGIC */

function setDifficulty(speed, diff) {
    FPS = speed;
    difficulty = diff;
    console.log(`Setting speed: ${FPS}, difficulty: ${difficulty}`)
}

function reset() {
    clearGrid();
    snake = [[0, 3], [0, 2], [0, 1], [0, 0]];
    dir = [0, 1];
    score = 0;
    moves = 0;
    frames = 0;
    $("#game-score").html(score);
    generateFood();
    updateTime();
}

function startGame() {
    snake = [[0, 3], [0, 2], [0, 1], [0, 0]];
    $("#start-btn").hide();
    $("#stop-btn").show();
    
    clearGrid();
    renderSnake(true);
    gameInProgress = true;
    paused = false;

    timer = setInterval(function() {
        if(document.hasFocus()){ loop(); }
    }, 1000/FPS);
}

function stopGame(loss) {
    $("#start-btn").show();
    $("#stop-btn").hide();

    if (loss) {
        openModal();
        snake = [];
    }
    pauseGame(true);
    reset();
    gameInProgress = false;
}

function loop() {
    move();
    renderSnake(false);
    renderFood();
    updateTime();
    if (frames % 50 == 0) {
        cleanGrid();
    }
    moveAvailable = true;
}

function pauseGame(override=false) {
    if (paused && ! override) {
        startGame();
        paused = false;
    } else {
        clearInterval(timer);
        paused = true;
    }
}

function cleanGrid() {
    let checkedBoxes = $('div').find('input[type="checkbox"]:checked');
    // Should be snake.length + 1 to account for food. Related to issue in render snake function;
    if (checkedBoxes.length > snake.length) {
        console.log(checkedBoxes.length, snake.length);
        clearGrid();
        renderSnake(true);
        renderFood();
    }
}

function clearGrid() {
    $('div').find('input[type="checkbox"]').prop('checked', false);
}

/* SNAKE LOGIC */

function renderSnake(full) {
    // TODO This shouldnt be length-1 ... hmmm...
    if (!full) {
        let l = snake.length-1;
        $(`#${snake[0][0]}-${[snake[0][1]]}`).prop('checked', true);
        $(`#${snake[l][0]}-${[snake[l][1]]}`).prop('checked', false);
    } else {
        for(let i = 0; i < snake.length - 1; i++) {
            $(`#${snake[i][0]}-${[snake[i][1]]}`).prop('checked', true);
        }
    }
}

function setDir(newDir) {
    if (!(dir[0] == -1*newDir[0] || dir[1] == -1*newDir[1]) && !paused) {
        if (!arrayEquals(dir, newDir)) {
            dir = newDir;
            moves++;
        }
    }
}

function move() {
    let newHead = [snake[0][0]+dir[0], snake[0][1]+dir[1]];

    if (difficulty == 'hard') {
        if (newHead[0] < 0 || newHead[0] >= COLS ||
            newHead[1] < 0 || newHead[1] >= ROWS) {
                stopGame(true);
            }
    }

    if (looping) {
        if (newHead[0] >= ROWS) {
            newHead[0] = 0;
        } else if (newHead[0] < 0) {
            newHead[0] = ROWS;
        } else if (newHead[1] >= COLS) {
            newHead[1] = 0;
        } else if (newHead[1] < 0) {
            newHead[1] = COLS;
        }
    }
    // Add new head
    snake.unshift(newHead);

    // If food is eaten, keep the last section
    if (arrayEquals(newHead, food)) {
        score++;
        $("#game-score").html(score);
        generateFood();
    } else {
        // Remove the lats section of snake.
        snake.pop();
    }

    for (let i = 1; i < snake.length; i++) {
        if (arrayEquals(newHead, snake[i])) {
            stopGame(true);
        }
    }
}

/* FOOD LOGIC */

function generateFood() {
    newFood = [Math.floor(Math.random()*ROWS),Math.floor(Math.random()*COLS)];
    for (let i = 0; i < snake.length; i++) {
        if (snake[i][0] != newFood[0] && snake[i][1] != newFood[1]) {
            food = newFood;
            return;
        } else {
            generateFood();
        }
    }
    
}

function renderFood() {
    $(`#${food[0]}-${food[1]}`).prop('checked', true);
}
