const ROWS = 40;
const COLS = 40;

/* DOCUMENT READY*/

$(function() {
    reset();

    createGrid(ROWS, COLS);
    
    document.addEventListener('keydown', checkKey);

    $("#stop-btn").hide();
});

/* HELPER FUNCTIONS*/

function arrayEquals(a1, a2) {
    return JSON.stringify(a1) == JSON.stringify(a2);
}