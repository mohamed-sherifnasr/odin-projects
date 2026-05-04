//Game Board
let gameBoard = (function(){
  
  return {board: [
   //  0  1  2
     ['','',''], // 0
     ['','',''], // 1
     ['','','']  // 2 
      ], reset(){
        this.board = this.board.map((row)=> row.fill(''));
      }, mark(r, c, value){
        this.board[r][c] = value;
      }, crossHorizontal(){
            if (this.board[0][0] == this.board[0][1] && this.board[0][0] == this.board[0][2] && this.board[0][0] != '') {return {won: true, symbol: this.board[0][0]}}; 
            if (this.board[1][0] == this.board[1][1] && this.board[1][0] == this.board[1][2] && this.board[1][0] != '') {return {won: true, symbol: this.board[1][0]}};
            if (this.board[2][0] == this.board[2][1] && this.board[2][0] == this.board[2][2] && this.board[2][0] != '') {return {won: true, symbol: this.board[2][0]}} else {return {won: false}};
      }, crossVertical(){
            if (this.board[0][0] == this.board[1][0] && this.board[0][0] == this.board[2][0] && this.board[0][0] != '') {return {won: true, symbol: this.board[0][0]}};
            if (this.board[0][1] == this.board[1][1] && this.board[0][1] == this.board[2][1] && this.board[0][1] != '') {return {won: true, symbol: this.board[0][1]}};
            if (this.board[0][2] == this.board[1][2] && this.board[0][2] == this.board[2][2] && this.board[0][2] != '') {return {won: true, symbol: this.board[0][2]}} else {return {won: false}};
      }, crossAcross(){
            if ((this.board[0][0] == this.board[1][1] && this.board[0][0] == this.board[2][2] && this.board[0][0] != '') || 
                (this.board[0][2] == this.board[1][1] && this.board[0][2] == this.board[2][0] && this.board[0][2] != '')){return {won: true, symbol: this.board[1][1]}} else {return {won: false}};;
      }, isFull(){
        let emptyCells = this.board.reduce((acc, row)=>{
            row.forEach((cell)=>{
                if (cell == '') acc+=1
            }); return acc;}, 0)
        if (emptyCells == 0) return true; return false;
      }
          
          
         }
   
})();

//Player
let player = function(name){
  return {
    name: name,
    score: 0,
    resetScore: function(){this.score = 0;}
    };
}

//Game Flow
// win
//Horizontal => [00 01 02], [10 11 12], [20 21 22]
//Vertical   => [00 10 20], [01 11 21], [02 12 22]
//Across     => [00 11 22], [02 11 20]
let GameController = function(gboard, player1, player2, view){      
    return {
        winner: undefined,
        turn: undefined,
        tied: undefined,
        randomizePlayer(){
            if (Math.floor(Math.random()*10) > 4){
                this.turn = player1;
                player1.symbol = 'X';
                player2.symbol = 'O';
                view.showDisplay(`${this.turn.name} goes first as X!`)
                } 
            else {
                this.turn = player2;
                player2.symbol = 'X';
                player1.symbol = 'O';
                view.showDisplay(`${this.turn.name} goes first as X!`)
                }
            },
        switchTurn(){this.turn == player1? this.turn = player2 : this.turn = player1; view.showDisplay(`${this.turn.name}'s turn of Symbol ${this.turn.symbol}!`)},
        init(){
            this.tied = undefined;
            this.winner = undefined;
            this.turn = undefined;
            gboard.reset();
            Renderer.render(gboard.board);
        }, hasWon(){
            if (gboard.crossHorizontal().won == true){
                if(gboard.crossHorizontal().symbol == player1.symbol)
                    {this.winner = player1; this.winner.score += 1 ;view.showScore(`${this.winner.name} has won! ${player1.name} ${player1.score} against ${player2.name} ${player2.score}`); this.init(); return true}
                else {this.winner = player2; this.winner.score += 1 ; view.showScore(`${this.winner.name} has won! ${player2.name} ${player2.score} against ${player1.name} ${player1.score}`);this.init(); return true}}
            if (gboard.crossVertical().won == true){
                if(gboard.crossVertical().symbol == player1.symbol)
                    {this.winner = player1; this.winner.score += 1 ;view.showScore(`${this.winner.name} has won! ${player1.name} ${player1.score} against ${player2.name} ${player2.score}`);  this.init() ; return true} 
                else {this.winner = player2;  this.winner.score += 1 ;view.showScore(`${this.winner.name} has won! ${player2.name} ${player2.score} against ${player1.name} ${player1.score}`);this.init() ; return true}}
            if (gboard.crossAcross().won == true){
                if(gboard.crossAcross().symbol == player1.symbol)
                    {this.winner = player1; this.winner.score += 1 ;view.showScore(`${this.winner.name} has won! ${player1.name} ${player1.score} against ${player2.name} ${player2.score}`); this.init() ; return true} 
                else {this.winner = player2; this.winner.score += 1 ; view.showScore(`${this.winner.name} has won! ${player2.name} ${player2.score} against ${player1.name} ${player1.score}`);this.init() ;return true}}
            else return false;
        }, hasTied(){
            if (gboard.isFull() == true) {view.showScore("It is a Tie!"); this.tied = true; this.init();}
        }, playGame(){
            this.init();
            this.randomizePlayer();
            document.querySelector('.container').addEventListener('click', (event)=>{this.clickHandler(event)});
            document.querySelector('#restart').addEventListener('click', (event)=>{this.restartHandler(event)});
            view.render(gboard.board);
        }, clickHandler(e){
            if (e.target.textContent != '') {view.showDisplay("Cell is already marked! Choose another cell ..."); return};
            gboard.mark(e.target.getAttribute('data-position').charAt(0), e.target.getAttribute('data-position').charAt(1), this.turn.symbol);
            view.showDisplay(this.turn);
            view.render(gboard.board);
            if(this.hasWon() || this.hasTied()){this.randomizePlayer(); return};
            this.switchTurn();
        }, restartHandler(e){
            this.init();
            player1.resetScore();
            player2.resetScore();
            view.reset();
            this.randomizePlayer();
        }

    };
};

//UI

let Renderer = (function (){
    return{
        parent: document.querySelector(".container"),
        display: document.querySelector("#display"),
        score: document.querySelector("#score"),
        render: function(board){
            let parent = document.querySelector(".container");
            parent.replaceChildren();
            let fragment = document.createDocumentFragment();
            board.forEach((row, rowIndex) => {
                row.forEach((cell, cellIndex) => {
                    let element = document.createElement('div');
                    element.textContent = cell;
                    element.setAttribute('data-position', `${rowIndex}${cellIndex}`);
                    fragment.appendChild(element);
                })    
            });
            parent.appendChild(fragment);
        }, showDisplay: function(msg){
            this.display.textContent = msg;
        }, showScore: function(msg){
            this.score.textContent = msg;
        }, reset: function(){
            this.display.textContent = "---";
            this.score.textContent = "---";
        }
    }
})();   

//Flow

let player1 = new player(prompt("Player1's name: "));
let player2 = new player(prompt("Player2's name: "));

let gControl = new GameController(gameBoard, player1, player2, Renderer);

Renderer.render(gameBoard.board);
gControl.playGame();