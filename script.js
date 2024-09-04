function gameBoard(){

    let gameState = [[null,null,null],[null,null,null],[null,null,null]];
    const player1 = Player('O');
    const player2 = Player("X");
    const players = [player1,player2]

    let playerTurn = 0;
    let winner =  null;

    const makeTurn = (target) => {
        pos = String(target.id);
        let row = parseInt(pos.slice(0,1))-1;
        let column = parseInt(pos.slice(-1))-1;

        if(gameState[row][column] !== null){
            alert("That Position is Occupied");
            return;
        }

        gameState[row][column] = players[playerTurn].getSymbol();
        target.innerText = players[playerTurn].getSymbol();


        winner = checkWin();
        if (!winner){
            playerTurn = (playerTurn+1)%2;
        }
        else{
            if (winner=="Tie"){
                showAlert(winner);
            }
            else{
                showAlert(playerTurn+1);
            }
            reset();
        }
    }

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

    const reset = () => {
        gameState = [[null,null,null],[null,null,null],[null,null,null]];
        playerTurn = 0;
        winner = null;
        buttons.forEach(btn => {
            btn.innerText = '';
        })
    }

    return {makeTurn};
}

function Player(symbol){
    const getSymbol = () => symbol;
    return {getSymbol};
}

const game = gameBoard();

let buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener("click", event => {
        game.makeTurn(event.target);
    })
})
//game.makeTurn();

function showAlert(winner) {
    const alertBox = document.getElementById('customAlert');
    const alertText = document.querySelector("#customAlert p");
    if(winner=="Tie"){
        alertText.innerText = "Tie";
        alertBox.style.backgroundColor = "#e20f0f";
    }else{
        alertText.innerText = 'Player ' + winner + ' is the winner';
        alertBox.style.backgroundColor = "#4CAF50";
    }
    alertBox.style.display = 'block';
}

function closeAlert() {
    const alertBox = document.getElementById('customAlert');
    alertBox.style.display = 'none';
}