
import React, { Component } from 'react';
import App from './App';

class Accueil extends Component
{
  constructor()
  {
		super();
    this.state = {pseudo: ''};
  }

  render()
  {
    return (
        <div className="App-header">
        <h1>Bienvenue dans Zbew Master Online</h1>
        <p><br/></p>
          <p>Entre ton pseudo de joueur : </p>
          <p>
              <input onChange={this.setPseudo.bind(this)} onKeyPress={this.fixEnter.bind(this)} name="pseudo" type="text" placeholder="Pseudo dans le jeu" />
              &nbsp;<button onClick={this.validePseudo.bind(this)}>Jouer</button>  
          </p>
      </div>
      );
  }

  setPseudo(event)
  {
    this.setState({
			pseudo: event.target.value
    })
  }

  // fix du caractère Entrée si on ne clique pas sur Jouer mais si on fait "entrée"
  fixEnter(event)
  {
    if(window.event.keyCode===13)
      this.validePseudo();
  }

  validePseudo()
  {
    App.lance_tchat(this.state.pseudo);
  }
}

export default Accueil;