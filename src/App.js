
// Importation des dépendances

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';
import Tchat from './Tchat';
import Jeu from './Jeu';

//import Joueur from './Joueur';

class App extends Component
{
  constructor()
  {
    super();
    this.state = {pseudo: ''};
    /*
    this.joueur1 = new Joueur();
    this.joueur2 = new Joueur();
    */
    this.setPseudo = this.setPseudo.bind(this);
    this.fixEnter = this.fixEnter.bind(this);
    this.lance_tchat = this.lance_tchat.bind(this);
  }

  render()
  {
    return (
      <div className="App-header">
      <h1>&lt;Bienvenue dans Bec Master Online /&gt;</h1>
      <p><br/></p>
        <p>Entre ton pseudo de joueur : </p>
        <p>
            <input onChange={this.setPseudo} onKeyPress={this.fixEnter} name="pseudo" type="text" placeholder="Pseudo dans le jeu" required />
            &nbsp;<button onClick={this.lance_tchat}>Jouer</button>  
        </p>
    </div>
  );
  }

  setPseudo(e)
  {
    this.setState({ pseudo: e.target.value });
  }

  // fix du caractère Entrée si on ne clique pas sur Jouer mais si on fait "entrée"
  fixEnter()
  {
    if(window.event.keyCode===13)
      this.lance_tchat();
  }

  lance_tchat()
  {
    var pseudo = this.state.pseudo;
    if(pseudo !=='' && pseudo !==' ')
    {
        console.log("Le joueur "+pseudo+" est connecté");
        ReactDOM.render(<Tchat pseudo={pseudo} />, document.getElementById('chatroom'));

        /*
        if(this.joueur1.pseudo!==null)
          this.joueur2.pseudo=pseudo;
        else
          this.joueur1.pseudo=pseudo;
        */

        /*
        ALGO:
        - pr résoudre l'erreur postgres chépaquoi : Télécharger le package : npm i pg-hstore --save
        - verif si joueur en bdd
        - si oui, récup score
        - si non, insert en bdd

        */
        
        ReactDOM.render(<Jeu />, document.getElementById('divjeu'));
    }
  }
}

export default App;