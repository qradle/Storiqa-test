const fs = require('fs');
const SIZE = 8;
const MINE_SIGN = 'X';

fs.readFile('./input', 'utf-8', (err, data) => {
    if (err) throw err;
    const table = [];
    const rowSplitter = '\n';
    const signSplitter = ' ';
    let rowCounter = 0;

    for (const row of data.split(rowSplitter)) {
        const rowArray = row.split(signSplitter);
        if (rowArray.length !== SIZE) {
            throw Error('Invalid input data');
        }
        table.push(rowArray);
        rowCounter++;
    }
    if (rowCounter !== SIZE) {
        throw Error('Invalid input data');
    }

    /**
     * Count nearest 'X' symbols for chosen point
     * @param x
     * @param y
     */
    function count(x, y) {
        let counter = 0;
        const areaLength = 1;
        for (let i = x - areaLength; i <= x + areaLength; i++) {
            if (i < 0 || i > SIZE - 1) continue;
            for (let j = y - areaLength; j <= y + areaLength; j++) {
                if (j < 0 || j > SIZE - 1) continue;
                if (table[i][j] === MINE_SIGN) {
                    counter++;
                }
            }
        }
        return counter;
    }

    const result = table.map((row, i) => {
        return row.map((value, j) => {
           if (value === MINE_SIGN) return value;
           return count(i, j);
        });
    });
    process.stdout.write(result.map((row) => row.join(signSplitter)).join(rowSplitter));
    process.stdout.write('\n');
});