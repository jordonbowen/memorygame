//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import nba from "./nba.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    nba,
    clickedNba: [],
    score: 0
  };

//when you click on a card ... the player is taken out of the array
  imageClick = event => {
    const currentNba = event.target.alt;
    const NbaAlreadyClicked =
      this.state.clickedNba.indexOf(currentNba) > -1;

//if you click on a player that has already been selected, the game is reset and cards reordered
    if (NbaAlreadyClicked) {
      this.setState({
        nba: this.state.nba.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedNba: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available player, your score is increased and cards reordered
    } else {
      this.setState(
        {
          nba: this.state.nba.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedNba: this.state.clickedNba.concat(
            currentNba
          ),
          score: this.state.score + 1
        },
//if you get all 12 players correct you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              nba: this.state.nba.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedNba: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.nba.map(nba => (
            <FriendCard
              imageClick={this.imageClick}
              id={nba.id}
              key={nba.id}
              image={nba.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;