var React = require('react');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			selection: ''
		}
	},
	render: function() {
		return(
			<div onClick={this.choice} id={'a'+this.props.counter} key={this.props.counter} className="tile">{}</div>
			)
	},
	choice: function(){
		console.log(this.id);
	}
});
