
// Importation des dépendances

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap.min.css';
import App from './App';
import Joueur from './Joueur';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('divjeu'));

var joueur1 = new Joueur();
var joueur2 = new Joueur();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
