const BUFFER_TIME = 25 // ms

function checkKey(e) {
    // currMove = new Date().getTime();
    // console.log("Time: ", currMove - lastMove)
    // if(currMove - lastMove < BUFFER_TIME && e.keyCode != 80) {
    //     console.log("not moving:", currMove - lastMove)
    //     return;
    // }
    // lastMove = new Date().getTime();
    if(!moveAvailable && (e.keyCode >= 37 && e.keyCode <= 40)) {
        return;
    }

    moveAvailable = false;

    e = e || window.event;
    // console.log(`${e.key}: ${e.keyCode}`);
    switch (e.keyCode) {
        case 38:
            // move('up');
            setDir([-1, 0]);
            break;
        case 40:
            // move('down');
            setDir([1, 0]);
            break;
        case 37:
            // move('left');
            setDir([0, -1]);
            break;
        case 39:
            // move('right');
            setDir([0, 1]);
            break;
        case 80:
            pauseGame();
            break;
        case 70:
            generateFood();
            break;
    }
}