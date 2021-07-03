let chart;
let myChart;

function secondsToTime(seconds) {
    let minutes = (seconds - (seconds % 60)) / 60
    seconds = seconds % 60;
    return `${leadingZeros(minutes, 2)}:${leadingZeros(seconds,2)}`;
}

function leadingZeros(num, size) {
    num = num.toString();
    while (num.length < size) { num = "0" + num }
    return num;
}

const title = (tooltipItems) => {
    return `${tooltipItems[0].raw.name}`
}

const label = (tooltipItems) => {
    return `Score: ${tooltipItems.raw.y} \nMoves: ${tooltipItems.raw.x} \nTime: ${secondsToTime(tooltipItems.raw.time)}`;
}

const footer = (tooltipItems) => {
    return '';
};


$(function() {
    updateData('medium');
    chart = $("#chart");
    console.log(chart);
    myChart = new Chart(chart, {
        type: 'bubble',
        data: {
            // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Scores',
                data: [{x: 2, y: 2, r: 50}, {x: 10, y: 5, r: 15}, {x: 20, y: 12, r: 10}],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        color: 'rgba(220, 220, 220, 0.5)',
                        text: 'score'
                    }
                },
                x: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        color: 'rgba(220, 220, 220, 0.5)',
                        text: 'moves'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    position: 'top',
                    text: 'Scores',
                    align: 'center'
                },
                tooltip: {
                    callbacks: {
                        footer: footer,
                        title: title,
                        label: label
                    }
                }
            }
        }
    });
});

function updateData(diff) {
    axios.get(`/score-data/${diff}`)
    .then((response) => {
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        $("#cards-header").html(`${diff} difficulty data`);
        updateChart(response.data.scores, diff);
        updateCards(response.data.avgs[0], response.data.highScore[0], response.data.gamesPlayed[0].games_played);
    });
}

function updateChart(scores, difficulty) {
    let first = true;
    let newData = scores.map(score => {
        if (first) {
            first = false;
            return {x: score.moves, y: score.score, r: score.time/5, time: score.time, name: `High Score: ${score.player}`}
        }
        return {x: score.moves, y: score.score, r: score.time/5, time: score.time, name: score.player}
    });
    
    let backgroundColors = [];
    let borderColors = [];

    for(let i = 0; i < scores.length; i++) {
        let col = chroma.random();
        let drk = chroma(col).darken();
        col = chroma(col).alpha(0.2);
        backgroundColors.push(col);
        borderColors.push(drk);
    }

    myChart.options.plugins.title.text = `Scores on ${difficulty} difficulty`;
    
    myChart.data.datasets[0].data = newData;
    
    first = true;
    myChart.data.datasets[0].backgroundColor = backgroundColors.map(col => {
        let rgba = chroma(col).get('rgba');
        if (first) {
            first = false;
            return 'rgba(255, 215, 0, .5)';
        }
        return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    });

    first = true;
    myChart.data.datasets[0].borderColor = borderColors.map(col => {
        let rgba = chroma(col).get('rgba');
        if (first) {
            first = false;
            return 'rgba(255, 215, 0, 1)';
        }
        return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    });

    myChart.update();
}

function updateCards(avgs, highScore, gamesPlayed) {
    $('#avgScore').html(avgs.avg_score);
    $('#highScore-user').html(`(${highScore.player} on ${new Date(highScore.date).toLocaleDateString()})`);
    $('#highScore').html(highScore.score);
    $('#avgTime').html(secondsToTime(parseInt(avgs.avg_time)));
    $('#avgMoves').html(avgs.avg_moves);
    $('#gamesPlayed').html(gamesPlayed);
}

// TODO: map bubbles from black to red, top 10 from red to gold?