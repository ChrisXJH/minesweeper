const startBtn = document.getElementById('startBtn');
const boardContainer = document.getElementById('boardContainer');

function makeClickHandler(i, j) {
    return () => {
        Game.play(i, j);
        update();
    };
}

function generateBoardElem(board) {
    const boardRoot = document.createElement('div');
    
    board.forEach((row, i) => {
        const rowRoot = document.createElement('div');

        rowRoot.className = 'row';

        row.forEach((col, j) => {
            const celElem = document.createElement('div');
            
            let displayText = col.flagged ? 'f' : '';
            if (col.revealed) displayText = col.value;

            celElem.className = 'cel';
            celElem.innerText = displayText;
            celElem.onclick = makeClickHandler(i, j);
    
            rowRoot.appendChild(celElem);
        })

        boardRoot.appendChild(rowRoot);
    });

    return boardRoot;
}

function update() {
    const board = Game.getBoard();
    const boardElem = generateBoardElem(board);

    boardContainer.innerHTML = '';
    boardContainer.appendChild(boardElem);
}

startBtn.onclick = function() {
    Game.startGame(10, 10);
    update();
};

