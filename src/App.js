
// Importation des dépendances

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import Joueur from './Joueur';
import Tchat from './Tchat';
import Jeu from './Jeu';

import sequelize from './models/index';
import mJoueur from './models/Joueur';

class App extends Component
{
  constructor()
  {
    super();
    this.state = {pseudo: '', score :0 };
    this.joueur1 = new Joueur();
    this.joueur2 = new Joueur();
  }

  render()
  {
    return (
      <div className="App-header">
      <h1>&lt;Bienvenue dans Zbew Master Online /&gt;</h1>
      <p><br/></p>
        <p>Entre ton pseudo de joueur : </p>
        <p>
            <input onChange={this.setPseudo.bind(this)} onKeyPress={this.fixEnter.bind(this)} name="pseudo" type="text" placeholder="Pseudo dans le jeu" />
            &nbsp;<button onClick={this.lance_tchat.bind(this)}>Jouer</button>  
        </p>
    </div>
  );
  }

  setPseudo(event)
  {
    this.setState({ pseudo: event.target.value });
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

        if(this.joueur1.pseudo!==null)
          this.joueur2.pseudo=pseudo;
        else
          this.joueur1.pseudo=pseudo;

        /*
        ALGO:
        - pr résoudre l'erreur postgres chépaquoi : Télécharger le package : npm i pg-hstore --save
        - verif si joueur en bdd
        - si oui, récup score
        - si non, insert en bdd

        */

        // verif si joueur en bdd
        sequelize.mJoueur.findAll({ where: {pseudo: pseudo} }).then(users =>
        {
          if(users['pseudo']!==null)
          {
              //si oui, récup score
          }
          else
          {
            // si non, insert en bdd
            sequelize.mJoueur.create(
              {
                pseudo: pseudo,
                vie : 0,
                score : 0,
                online: 0,
                adrip : 'xxx.xxx.xxx.xxx'
              }).catch(function (e)
              {
                //gestion erreur
                console.log('erreur insert into... : '+e);
              });      
          }
        }).catch(function (e)
        {
            //gestion erreur
            console.log('erreur db.mJoueur.findAll : '+e);
        });

        ReactDOM.render(<Jeu />, document.getElementById('divjeu'));
    }
  }
}

export default App;