function gameBoard(){

    let gameState = [[null,null,null],[null,null,null],[null,null,null]];
    const player1 = Player('O');
    const player2 = Player("X");
    const players = [player1,player2]

    let playerTurn = 0;
    let winner =  null;

    const makeTurn = () => {
        displayBoard();
        let move = String(prompt(`Player ${playerTurn + 1}, Choose your next move!`));
        let row = parseInt(move.slice(0,1))-1;
        let column = parseInt(move.slice(-1))-1;

        while(gameState[row][column] !== null){
            move = String(prompt(`Player ${playerTurn + 1}, that position is taken. Choose again!`));
            row = parseInt(move.slice(0,1))-1;
            column = parseInt(move.slice(-1))-1;
        }

        gameState[row][column] = players[playerTurn].getSymbol();


        winner = checkWin();
        if (!winner){
            playerTurn = (playerTurn+1)%2;
            makeTurn();
        }
        else{
            if (winner=="Tie"){
                console.log(winner);
            }
            else{
                console.log(`Player ${playerTurn+1} is the winner`)
            }
            displayBoard();
        }
    }
    const displayBoard = () => {
        console.log(gameState[0]);
        console.log(gameState[1]);
        console.log(gameState[2]);
        console.log(' ');
    };

    const checkWin = () => {
        for(i=0;i<3;i++){
            if (gameState[i][0]==gameState[i][1]&&gameState[i][0]==gameState[i][2] && gameState[i][0]){
                return gameState[i][0];
            }
            else if(gameState[0][i]==gameState[1][i]&&gameState[0][i]==gameState[2][i] && gameState[0][i]){
                return gameState[0][i];
            }
            else if(gameState[0][0]==gameState[1][1]&&gameState[0][0]==gameState[2][2] && gameState[0][0]){
                return gameState[0][0]
            }
            else if(gameState[0][2]==gameState[1][1]&&gameState[1][1]==gameState[2][0] && gameState[1][1]){
                return gameState[0][2]
            }
        }
        if(gameState[0].includes(null)==false&&gameState[1].includes(null)==false&&gameState[2].includes(null)==false){
                return "Tie";
        }
        return null;
    }

    return {makeTurn,displayBoard};
}

function Player(symbol){
    const getSymbol = () => symbol;
    return {getSymbol};
}

const game = gameBoard();

game.makeTurn();