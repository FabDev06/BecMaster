
// Importation des dépendances

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './App.css';

import Tuto1 from './assets/tuto1.mp4';
import Tuto2 from './assets/tuto2.mp4';

import Tchat from './Tchat';
import Decompte from './Decompte';
import Jeu from './Jeu';

class App extends Component
{
  constructor()
  {
    super();

    this.state =
    {
      pseudo:'',
      decompteMountedu:false,
      contenu:<div className="App-header">
                  <p></p>
                  <h1>&lt;Bienvenue dans Bec Master Online /&gt;</h1>
                  <br/>
                    <p>Entre ton pseudo de joueur : <input onChange={this.setPseudo.bind(this)} onKeyPress={this.fixEnter.bind(this)} name="pseudo" type="text" placeholder="Pseudo dans le jeu" required />&nbsp;<button onClick={this.lance_tchat.bind(this)}>Jouer</button></p>
                    <p><br/></p>
                    <p>Instructions de jeu :</p>

                    <div style={{position:'relative'}}>
                      <div className="dVideo">
                        <video width={200} height={200} autoPlay={true} loop={true} controls={true}><source src={Tuto1} type="video/mp4"></source>Votre navigateur ne prend pas en charge les vidéos HTML5</video>
                        <br/><br/>
                        1) Un simple clic sur l'arc de votre chateau mettra en place la visée (réticule).
                        <br/>
                      </div>

                      <div className="dVideo">
                        <video width={200} height={200} autoPlay={true} loop={true} controls={true}><source src={Tuto2} type="video/mp4"></source>Votre navigateur ne prend pas en charge les vidéos HTML5</video>
                        <br/><br/>
                        2) En glissant la souris vers le chateau, un guide apparait. Un clic sur le chateau permet de lancer la flèche.
                      </div>
                    </div>
              </div>
      };

    this.lance_jeu = this.lance_jeu.bind(this);
    this.decompteMount = this.decompteMount.bind(this);
    this.relance = this.relance.bind(this);
  }
/*
  componentDidMount()
  {
    this.setState({contenu:this.state.contenu+<div><video className="video-container video-container-overlay" width="200" height="200" autoplay="true"><source src="assets/tuto1.mp4" type="video/mp4">Votre navigateur ne prend pas en charge les vidéos</video></div>});
  }
*/
  render()
  {
    return <>{this.state.contenu}</>;
  }

  setPseudo(e)
  {
    this.setState({pseudo:e.target.value});
  }

  // fix du caractère Entrée si on ne clique pas sur Jouer mais si on fait "entrée"
  fixEnter()
  {
    if(window.event.keyCode===13)
      this.lance_tchat();
  }

  decompteMount(boulboul)
  {
    if(boulboul)
      this.setState({decompteMountedu:true});
    else
      this.setState({decompteMountedu:false});
  }

  lance_tchat()
  {
    var pseudo = this.state.pseudo;
    if(pseudo !=='' && pseudo !==' ')
    {
        console.log("App.js : le joueur "+pseudo+" est connecté.");

        if(this.state.decompteMountedu===false)
        {
          this.setState({contenu:(<Decompte pseudo={pseudo} jesuismonte={this.decompteMount} jesuispret={this.lance_jeu}/>)});
          this.decompteMount(true);
        }

        ReactDOM.render(<Tchat pseudo={pseudo} />, document.getElementById('chatroom'));
    }
  }

  lance_jeu(param=false)
  {
    if(param)
      this.setState({contenu:(<Jeu pseudo={this.state.pseudo} gameover={this.relance}/>)});
  }

  relance()
  {
    this.setState({contenu:(<Decompte pseudo={this.state.pseudo} jesuismonte={this.decompteMount} jesuispret={this.lance_jeu}/>)});  
  }

}

export default App;