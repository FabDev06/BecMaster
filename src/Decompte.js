
// Importation des dépendances

import React, { Component } from 'react';

const SEC = 3; // 5 secondes entre la détection d'un autre joueur en ligne et sinon partie avec le CPU

class Decompte extends Component
{
  constructor(props)
  {
    super(props);

    this.state =
    {
      decompt:SEC,
      carnaval:0
    };
  }

  componentDidMount()
  {
    console.log('Decompte.js : lancement compte à rebours '+this.state.decompt+'s.');
    this.decompte(this.state.decompt);
    this.props.jesuismonte(true);
  }
/*
  componentWillUnmount()
  {
    this.props.jesuismonte(false);
  }
  */
  render()
  {
        return (<div className="App-header">
          <p><br/></p>
            <h1>Recherche de partie en cours...</h1>
            <p><br/></p>
            <h2>{this.state.decompt}</h2>
          </div>);
  }

  decompte(decompt)
  {
    if(!this.state.carnaval) 
    {
      this.setState({carnaval:setInterval(() => this.decompte(this.state.decompt),1000)});
    }
    else
    {
      if(this.state.decompt>0)
      {
          this.setState({decompt:(decompt-1)});
      }
      else
      {
        //this.setState({carnaval:0});
        this.props.jesuispret(true);
      }
    }
  }
}

export default Decompte;