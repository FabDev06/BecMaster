
// Importation des dépendances

import React, { Component } from 'react';

import './App.css';
import Accueil from './Accueil';
//import Serveur from './Serveur';

class App extends Component
{
  lance_tchat(pseudo)
  {
    console.log("Lancement tchat avec le joueur : "+pseudo);
  }

  render()
  {
    //console.log("Le joueur "+pseudo+" est connecté");
    return (
      <Accueil />
    );
  }
}

export default App;