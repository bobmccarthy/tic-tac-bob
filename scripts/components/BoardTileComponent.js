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
	render: function() {
		console.log(this.state.plays);
		if (this.state.turn){
			var playerTurn=(<div id="directions">{this.state.turn}`s Turn!!!</div>);
		}
		else{
			var playerTurn=(<div id="directions">Enter Player Names, and Click PLAY!</div>);
		}
		
		var counter=-1;
		var allSpaces= this.state.boardArray.map((tile)=>{
			counter=counter+1;
			return(
				<div onClick={this.choice} id={'a'+counter} key={counter} className="tile"><span>{tile}</span></div>
				)
			
		})
		var names = (<div className="vs">{this.state.playerOne} vs. {this.state.playerTwo}</div>);
		if (this.state.winner){
			var playerTurn = (<div id="winner">{this.state.turn} Wins! Yay! You did it!</div>);
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
		this.setState({
			winner: false,
			boardArray: ['','','','','','','','',''],
			turn: this.state.playerOne
		})
	},
	restart: function(){
		this.setState({
			winner: false,
			boardArray: ['','','','','','','','',''],
			turn: this.state.playerOne,
			plays: 0
		})
	},
	choice: function(i){
		// console.log(i.target.id[1]);
		if(this.state.winner){
			console.log('winner');
		}
		else{
			var target=i.target.id[1];
			var array = this.state.boardArray;
			if (array[target]!==''){
				console.log('try again');
			}
			else{
				if (this.state.turn==this.state.playerOne){
					array[target]='x';
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
						this.setState({
							winner: true
						})
					}
					
					else{
						this.setState({
							boardArray: array,
							turn: this.state.playerTwo,
							plays: this.state.plays+1
						})
					}
					if (this.state.plays==8){
						this.setState({
							winner: true,
							turn: 'Cats Game'
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
					if (this.state.plays==8){
						this.setState({
							winner: true,
							turn: 'Cats Game'
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
	}
});



