const displayStatus = document.querySelector('.status');

let gameOn = true;

let currentPlayer = 'X';

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let gameState = ['','','','','','','','',''];

const winMSg = () => `player ${currentPlayer} won!`;
const drawMsg = () => `draw!`;
const turnMsg = () => `it's player ${currentPlayer}'s turn`;

/*The initial display status */
displayStatus.innerHTML = turnMsg();

function handleSquarePlayed(clickedSquare, clickedSquareIndex) {

    /*locates the exact emtry gameState string/index and then fills it with X*/
    gameState[clickedSquareIndex] = currentPlayer;
    /*adds an X on the given html attribute's UI*/
    clickedSquare.innerHTML = currentPlayer;
}

function handleSquareClicked(clickedSquareEvent) {

    /*Brings in the targeted event handler param and assigns it a variable*/
    const clickedSquare = clickedSquareEvent.target;
    /*Finds the index number of the clicked attribute*/
    const clickedSquareIndex = parseInt(
        clickedSquare.getAttribute('square-index')
    );
    
    if (gameState[clickedSquareIndex] !== "") {
        return;
    }
    /*Hands off the currently click event and the index to the handleSquarePlayed() function*/
    handleSquarePlayed(clickedSquare,clickedSquareIndex);
    /*checks to see who's turn it is and if any player has won*/
    handleGameStatus();
}

function handleGameStatus() {
    /*initally sets the round to zero winners*/
    let roundStatusWin = false;
    /*iterates each possible winning condition*/
    for (i=0;i <= 7;i++) {
        const win = winConditions[i];
        /*Finds each positions element, inside of each winning condition*/
        let a = gameState[win[0]];
        let b = gameState[win[1]];
        let c = gameState[win[2]];
        /*conditional to find out if all elements are filled within a winning condition. either the round continues or wins */
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundStatusWin = true;
            break
        }
    }
    /*displays the winner*/
    if (roundStatusWin) {
        displayStatus.innerHTML = winMSg();
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        displayStatus.innerHTML = drawMsg();
        return;
    }
    /*if the conditional above is "continue" then the code drops to here and switches the player's turn */
    handleChangePlayer();
}

function handleChangePlayer() {
    /* within handleGameStatus(), whatever player is currently playing with switch when this function is invoked*/
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    /*changes the status message to the new turn's player */
    displayStatus.innerHTML = turnMsg();
}

/*The initial click for each time clicked */
document.querySelectorAll('.square').forEach(square => square.addEventListener('click', handleSquareClicked));