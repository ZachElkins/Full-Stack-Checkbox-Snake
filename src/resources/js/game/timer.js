function updateTime() {
    $("#timer").html(timeAsString());
    frames++;
}

function framesToSeconds() {
    return Math.ceil(frames/FPS);
}

function secondsToTime(seconds) {
    minutes = (seconds - (seconds % 60)) / 60
    seconds = seconds % 60;
    return `${leadingZeros(minutes, 2)}:${leadingZeros(seconds,2)}`;
}

function leadingZeros(num, size) {
    num = num.toString();
    while (num.length < size) { num = "0" + num }
    return num;
}

function timeAsString() {
    return secondsToTime(framesToSeconds());
}
