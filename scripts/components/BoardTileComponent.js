var React = require('react');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			winner: false,
			boardArray: ['','','','','','','','',''],
			turn: null,
			playerOne: '',
			playerTwo: '',
			plays: 0
		}
	},
	//this checks to see if all the moves have been made without a winner. I had to look up React lifecycles to figure this one out. A few times i tried to put it in the render, but i couldnt update the state while already in the process of updating the state.
	componentDidUpdate: function(){
		this.cats();
	},
	render: function() {
		
		if (this.state.turn){
			var playerTurn=(<div id="directions">{this.state.turn}`s Turn!!!</div>);
		}
		else{
			var playerTurn=(<div id="directions">Enter Player Names, and Click PLAY!</div>);
		}
		
		var counter=-1;
		//this returns all the board spaces as html the counter starts at -1 because it is added to immediately on each iteration of the boardArray and then it will serve as the index of the tile, via being its id
		var allSpaces= this.state.boardArray.map((tile)=>{
			counter=counter+1;
			return(
				<div onClick={this.choice} id={'a'+counter} key={counter} className="tile"><span>{tile}</span></div>
				)
			
		});
		var names = (<div className="vs">{this.state.playerOne} vs. {this.state.playerTwo}</div>);

		//this decides what to display when winner state is set
		if (this.state.winner){
			if (this.state.turn=='cats game!'){
				var playerTurn = (<div id="winner">{this.state.turn}</div>)
			}
			else{
				var playerTurn = (<div id="winner">{this.state.turn} Wins! Yay! You did it!</div>);
			}
			
		}
		return(
			<div>
				<div className="title">
					<h1>Tic-Tac-Bob</h1>
					<input onKeyUp={this.setPlayer1} ref="player1" placeholder="Type Player 1 Name"/>
					<input onKeyUp={this.setPlayer2} ref="player2" placeholder="Type Player 2 Name"/>
				</div>
				<div className="action">
					<button onClick={this.play}>Play!</button>
					{names}
					<button onClick={this.restart}>Restart</button>
				</div>
				<div className="instructions">
					{playerTurn}
				</div>
				<div id="board-container">
					<div className="board">
						{allSpaces}
					</div>
				</div>
				
				<footer className="footer">
					<div className="select">
						<select onChange={this.background} ref="select">
							<option value="1">Meadow +</option>
							<option value="2">Fall Colors +</option>
							<option value="3">By the Lake +</option>
						</select>
					</div>
					<div className="changeB">Change Background:</div>
				</footer>
			</div>
		)
	
		
		
	},
	//keyup functions when typing in who is playing
	setPlayer1: function(){
		this.setState({
			playerOne: this.refs.player1.value,
			turn: null,
			boardArray: ['','','','','','','','','']
		})
	},
	setPlayer2: function(){
		this.setState({
			playerTwo: this.refs.player2.value,
			turn: null,
			boardArray: ['','','','','','','','','']

		})
	},
	play: function(){
		//can only play if opponents have been entered
		if(this.state.playerOne!==''&&this.state.playerTwo!==''){
			this.setState({
				winner: false,
				boardArray: ['','','','','','','','',''],
				turn: this.state.playerOne
			})
		}
		
	},
	restart: function(){
		//makes sure game is actually going
		if (this.state.turn){
			this.setState({
				winner: false,
				boardArray: ['','','','','','','','',''],
				turn: this.state.playerOne,
				plays: 0
			})
		}
		
	},
	choice: function(i){
		//this is making sure the game doesn't continue if there is a winner already
		if(this.state.winner){
			console.log('winner');
		}

		else{
			//target is the tile picked. passed argument i into the function as a reference to the tile picked. i.target.id is the tile's id, [1] is the number of the tile (because id's can't just be numbers i put an a in front). i then take the number and associate it with that index in the boardArray

			var target=i.target.id[1];
			var array = this.state.boardArray;
			//if index of array is not empty, it has been chosen
			if (array[target]!==''){
				console.log('try again');
			}

			else{
				//if this.state.turn hasnt been declaired yet by typing in opponents, this if statement wont run. This keeps you from playing without setting player names.
				if (this.state.turn==this.state.playerOne){
					array[target]='x';
					//after it marked an x, it checks to see if there is a winner.
					if (
						array[0]=='x'&&array[1]=='x'&&array[2]=='x'||
						array[3]=='x'&&array[4]=='x'&&array[5]=='x'||
						array[6]=='x'&&array[7]=='x'&&array[8]=='x'||
						array[0]=='x'&&array[3]=='x'&&array[6]=='x'||
						array[1]=='x'&&array[4]=='x'&&array[7]=='x'||
						array[2]=='x'&&array[5]=='x'&&array[8]=='x'||
						array[0]=='x'&&array[4]=='x'&&array[8]=='x'||
						array[2]=='x'&&array[4]=='x'&&array[6]=='x'
						){
						console.log('winner if statement');
						this.setState({
							winner: true
						})
					}
					//each turn resets the state of whos turn it is, which re-renders with the next player's turn.
					else{
						this.setState({
							boardArray: array,
							turn: this.state.playerTwo,
							plays: this.state.plays+1
						})
					}
					
					
				}
				else if (this.state.turn==this.state.playerTwo){
					array[target]='o';
					if (
						array[0]=='o'&&array[1]=='o'&&array[2]=='o'||
						array[3]=='o'&&array[4]=='o'&&array[5]=='o'||
						array[6]=='o'&&array[7]=='o'&&array[8]=='o'||
						array[0]=='o'&&array[3]=='o'&&array[6]=='o'||
						array[1]=='o'&&array[4]=='o'&&array[7]=='o'||
						array[2]=='o'&&array[5]=='o'&&array[8]=='o'||
						array[0]=='o'&&array[4]=='o'&&array[8]=='o'||
						array[2]=='o'&&array[4]=='o'&&array[6]=='o'
						){
						this.setState({
							winner: true
						})
					}
					
					else{
						this.setState({
							boardArray: array,
							turn: this.state.playerOne,
							plays: this.state.plays+1
						})
					}
				}
			}
		}
		
		
	},
	background: function(){
		if (this.refs.select.value==1){
			document.getElementById('board-container').style.backgroundImage="url('../images/background3.jpg')";
			//http://www.wallpapereast.com/static/images/Free-Wallpaper-Nature-Scenes_Gg92QQ8.jpg
		}
		if (this.refs.select.value==2){
			document.getElementById('board-container').style.backgroundImage="url('../images/background2.jpg')";
			//http://www.wallpapereast.com/static/images/6801692-lovely-nature-wallpaper.jpg
		}
		if (this.refs.select.value==3){
			document.getElementById('board-container').style.backgroundImage="url('../images/background1.jpg')";
			//http://www.wallpapereast.com/static/images/nature-wallpaper-1080x1920.jpg
		}
	},
	cats: function(){
		if (this.state.plays==9&&this.state.winner==false){
			this.setState({
				winner: true,
				turn: 'cats game!'
			})
		}
	}
});



