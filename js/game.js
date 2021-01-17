const Game = (function() {
    const POSITIONS = [
        [1, 0], [-1, 0], [0, 1], [0, -1],
        [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];

    const MINE = 'm';

    const STATUSES = {
        PENDING: 'PENDING',
        READY: 'READY',
        LOST: 'LOST',
        WON: 'WON'
    };

    let board = null;
    let status = STATUSES.PENDING;

    function startGame(w = 5, h = 5, difficulty = 0.1) {
        const mineBoard = new Array(h).fill(null)
            .map(() => new Array(w).fill(null)
                .map(() => {
                    const isMine = Math.random() <= difficulty;
                    return isMine ? MINE : '0';
                }));

        board = mineBoard.map((row, i) => row.map((col, j) => {
            if (col === MINE) return {
                value: MINE,
                revealed: false,
                flagged: false
            };

            const value = POSITIONS.reduce((result, [dI, dJ]) => {
                const newI = i + dI;
                const newJ = j + dJ;
                const hasMine = newI >= 0 && newI < h
                    && newJ >= 0 && newJ < w
                    && mineBoard[newI][newJ] === MINE;

                return hasMine ? result + 1 : result;
            }, 0) + '';

            return {
                value,
                revealed: false,
                flagged: false
            };
        }));

        status = STATUSES.READY;
        console.log(board);
    }

    function play(i, j) {
        if (status !== STATUSES.READY) {
            throw new Error('Game not started.');
        }

        const cell = board[i][j];

        if (cell.revealed) return;
        if (cell.value === MINE) status = STATUSES.LOST;

        cell.revealed = true;
    }

    function flag(i, j) {
        const cell = board[i][j];

        if (cell.revealed) return;
        cell.flagged = !cell.flagged;
    }

    function getBoard() {
        return board;
    }

    return {
        MINE,
        STATUSES,
        startGame,
        play,
        flag,
        getBoard
    };
})();
