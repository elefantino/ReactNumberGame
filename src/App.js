import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

//StarsFrame component
class StarsFrame extends React.Component {
  render() {
    //add stars to the array 'stars' according to generated number
    var stars = [];
    for(var i = 1; i <= this.props.numberOfStars; i++) {
      stars.push(<span className="glyphicon glyphicon-star" key={i}></span>);
    }
    return (
      <div id="stars-frame">
        <div className="well">
          {stars}
        </div>
      </div>
    );
  }
}

//ButtonFrame component
class ButtonFrame extends React.Component {
  render() {
    var disabled,
      button,
      correct = this.props.correct;
    switch(correct) {
      case true:
        button = (
          <button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        );
        break;
      case false:
        button = (
          <button className="btn btn-danger btn-lg">
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        );
        break;
      default:
        disabled = (this.props.selectedNumbers.length === 0);
        button = (
          <button className="btn btn-primary btn-lg" disabled={disabled} onClick={this.props.checkAnswer}>
            =
          </button>
        );
    }
    //console.log("button frame", button);
    return (
      <div id="button-frame">
        {button}
        <hr/>
        <button className="btn btn-warning btn-xs" onClick={this.props.redraw} disabled={this.props.redraws===0}>
          <span className="glyphicon glyphicon-refresh"></span>
          &nbsp;
          {this.props.redraws}
        </button>
      </div>
    );
  }
}

//AnswerFrame component
class AnswerFrame extends React.Component {
  //render selected numbers from props
  render() {
    var selectedNumbers = this.props.selectedNumbers.map((i) => 
      <div className="number" key={i} onClick={this.props.unselectNumber.bind(null, i)}>
        {i}
      </div>
    );
    return (
      <div id="answer-frame">
        <div className="well">
          {selectedNumbers}
        </div>
      </div>
    );
  }
}

//NumbersFrame component
class NumbersFrame extends React.Component {
  render() {
    //add 1..9 numbers to the array 'numbers'
    var numbers = [], 
      className, 
      selectNumber = this.props.selectNumber,
      selectedNumbers = this.props.selectedNumbers,
        usedNumbers = this.props.usedNumbers;
    for(var i = 1; i <= 9; i++) {
      className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
      className += " used-" + (usedNumbers.indexOf(i) >= 0);
      numbers.push(
        <div className={className} key={i} onClick={selectNumber.bind(null, i)}>
          {i}
        </div>
      );
    }
    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
}

//DoneFrame component: when the game is over
class DoneFrame extends React.Component {
  render() {
    return (
      <div className="well text-center">
        <h2>{this.props.doneStatus}</h2>
      </div>
    );
  }
}

//Game component
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNumbers: [],
      numberOfStars: this.randomNumber(),
      usedNumbers: [],
      correct: null,
      redraws: 5,
      doneStatus: null
    };    
  }
  //generate random number from 1 to 9
  randomNumber = () => {
    return Math.floor(Math.random()*9) + 1
  }
  //select number in the numbers frame
  selectNumber = (clickedNumber) => {
    if (this.state.selectedNumbers.indexOf(clickedNumber) < 0) {
      this.setState({
        selectedNumbers: this.state.selectedNumbers.concat(clickedNumber),
        correct: null
      });
    }
  }
  //unselect number in the answer frame
  unselectNumber = (clickedNumber) => {
    var selectedNumbers = this.state.selectedNumbers,
      indexOfNumber = selectedNumbers.indexOf(clickedNumber);
    //remove the element from the array
    selectedNumbers.splice(indexOfNumber, 1);
    this.setState({
      selectedNumbers: selectedNumbers,
      correct: null
    });
  }
  //sum selected numbers
  sumOfSelectedNumbers = () => {
    return this.state.selectedNumbers.reduce((p,n) => {return p + n}, 0);
  }
  //check the answer
  checkAnswer = () => {
    var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
    this.setState({correct: correct});
  }
  //accept the answer
  acceptAnswer = () => {
    var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    //!as far as setState is asynchronous, we use its second argument (callback function) 
    //to check the 'doneStatus' after the state is updated
    this.setState({
      selectedNumbers: [],
      usedNumbers: usedNumbers,
      correct: null,
      numberOfStars: this.randomNumber()
    }, () => this.updateDoneStatus());
  }
  //redraw the stars
  redraw = () => {
	  if (this.state.redraws > 0) {
			this.setState({
				selectedNumbers: [],
				correct: null,
				numberOfStars: this.randomNumber(),
				redraws: this.state.redraws - 1
			}, () => this.updateDoneStatus());
		}
  }
  //update the 'doneStatus'
  updateDoneStatus = () => {
    //if all the numbers are used, the game is won
    if (this.state.usedNumbers.length === 9) {
      this.setState({doneStatus: 'Done. Nice job!'});
      return;
    }
    //game over
    if (this.state.redraws === 0) {
      this.setState({doneStatus: 'Game over!'});
    }
  }
  //render a game's frames html with the data in 'state'
  render() {
    var selectedNumbers = this.state.selectedNumbers,
      numberOfStars = this.state.numberOfStars,
      usedNumbers = this.state.usedNumbers,
      correct = this.state.correct,
      redraws = this.state.redraws,
      doneStatus = this.state.doneStatus,
      bottomFrame;
    if (doneStatus) {
      bottomFrame = <DoneFrame doneStatus={doneStatus} />;
    }
    else {
      bottomFrame = <NumbersFrame selectedNumbers={selectedNumbers} usedNumbers={usedNumbers} 
          selectNumber={this.selectNumber} />;
    }
    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr/>
        <div className="clearfix">
          <StarsFrame numberOfStars={numberOfStars} />
          <ButtonFrame selectedNumbers={selectedNumbers} correct={correct} redraws={redraws}
            checkAnswer={this.checkAnswer} 
            acceptAnswer={this.acceptAnswer} 
            redraw={this.redraw}  />
          <AnswerFrame selectedNumbers={selectedNumbers} 
            unselectNumber={this.unselectNumber} />
        </div>
        {bottomFrame}
      </div>  
    );
  }
}

//App component
class App extends React.Component {
  render() {
    return (
      <div id="container" className="container">
        <Game />
      </div>
    );
  }
}

export default App;
