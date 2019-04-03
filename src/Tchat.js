
// Importation des dépendances

import React, { Component } from 'react';
import './Tchat.css';

class Tchat extends Component
{
  constructor()
  {
    super();
    this.state = {msg: ''};
  }

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

    return (
      <div>
          <h4>Bienvenue {this.props.pseudo} !</h4>
          <div className="msg_div">
            <textarea className="t_msg" id="msg" onChange={this.setMsg.bind(this)}></textarea>
            <br/>
            <button onClick={this.env_msg.bind(this)}>Envoyer</button>
          </div>
      </div>
      
    );
  }

  setMsg(event)
  {
    this.setState({ msg: event.target.value });
  }

  env_msg()
  {
      //console.log(this.state.msg);
      
      var msg = document.getElementById('msg');
      msg.value='';
      /*
      ALGO :
      (ok) effacer msg textarea
      push en BDD le msg
      (ok) effacer state
      

      */
     
      this.setState({ msg: '' });
  }
}

export default Tchat;