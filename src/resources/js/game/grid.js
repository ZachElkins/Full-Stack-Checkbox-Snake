function createGrid(rows, cols) {
    let grid = $('#grid');
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            grid.append(createCheckbox(r, c));
        }
    }
}

function createCheckbox(rowNum, colNum) {
    return $('<input>')
        .attr({
            type: 'checkbox',
            id: `${rowNum}-${colNum}`,
            disabled: false,
            class: 'checkbox'
        });
}