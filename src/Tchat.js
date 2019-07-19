
// Importation des dépendances

import React, { Component } from 'react';
import './Tchat.css';

class Tchat extends Component
{
  constructor()
  {
    super();
    this.state = {
                  msg: '',
                  liste:[{id:0, heure:'', message:''}]
                };

    this.set_msg = this.set_msg.bind(this);
    this.env_msg = this.env_msg.bind(this);
    this.fixEnter = this.fixEnter.bind(this);
  }

/*
https://blog.vjeux.com/2013/javascript/scroll-position-with-react.html

  componentWillUpdate()
  {
    var node = this.getDOMNode();
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }
   
  componentDidUpdate()
  {
    if (this.shouldScrollBottom)
    {
      var node = this.getDOMNode();
      node.scrollTop = node.scrollHeight;
    }
  }
*/

  render()
  {
      /*
      ALGO :
      toutes les 1000 ms, faire :
        {
        - lire les messages en BDD (model Messages)
        - Les écrires dans le contenu de textarea id="msg" (+ horodatage)
        - boucle (1000 ms)
        }

      */

    return (<div>
          <h4>Bienvenue {this.props.pseudo} !</h4>
          
          <div ref={scroll => this.liste = scroll} className="liste_msg">
          {this.state.liste.map(element =>
          {
              // le !=='' différent de vide permet de ne pas afficher le 1er élément
              // qui est ajouté dans le constructeur lors de l'instanciation
              // l'attribut key des différentes div permet à React de les différencier (vu grace à un warning en console)
              return element.message!=='' && ( <div key={element.id}>[{element.heure}] <strong>{this.props.pseudo}</strong> : {element.message}<br/></div> );
          })}
          </div>

          <div className="new_msg_div">
            <textarea ref={valeur => this.newValeur = valeur} className="t_msg" id="msg" onChange={this.set_msg} onKeyPress={this.fixEnter}></textarea>
            <br/>
            <button onClick={this.env_msg}>Envoyer</button>
          </div>
      </div>);
  }

  fixEnter(e)
  {
    if(window.event.keyCode===13)
    {
      // on empêche de prendre en compte le caractère entrée
      // qui sera répercuté après le value='' asynchrone
      // et de ce fait le textarea gardera le saut à la ligne
      // au lieu du curseur de saisie au départ
      e.preventDefault();
      this.env_msg();
    }
  }

  set_msg()
  {
    if(this.newValeur.value!==' ')
      this.setState({ msg: this.newValeur.value });
  }

  env_msg()
  {
      /*
      ALGO :
      (ok) effacer msg textarea
      push en BDD le msg
      (ok) effacer state
      */
     let ladate = new Date();
     this.state.liste.push({id:this.state.liste.length,heure:ladate.getHours()+':'+(ladate.getMinutes()<10?'0'+ladate.getMinutes():ladate.getMinutes()), message:this.state.msg});
     this.setState({ msg: '' });
     // reset du textarea par référence ref
     this.newValeur.value='';
     // scroll vers le bas si tous les messages dépassent la hauteur de la div liste
     // 13.04 : ne fonctionne pas, il faudrait connaitre la hauteur en pixels d'un msg envoyé
     // comme le msg ptet en plusieurs lignes, c'est peine perdue pr l'instant
     this.liste.scrollTop = this.liste.scrollHeight + this.liste.offsetHeight;
    }
}

export default Tchat;