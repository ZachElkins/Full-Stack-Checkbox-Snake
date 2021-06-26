function openModal() {
    updateModal();
    $('#game-over-modal').modal();
}

function updateModal() {
    $('#score-display').html(score);
    $('#score').val(score);

    $('#moves-display').html(moves);
    $('#moves').val(moves);

    $('#difficulty-display').html(difficulty.charAt(0).toUpperCase()+difficulty.slice(1));
    $('#difficulty').val(difficulty);

    $('#time-display').html(timeAsString());
    $('#time').val(framesToSeconds());
}