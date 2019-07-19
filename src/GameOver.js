import React from 'react';

class GameOver extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            joueur:this.props.joueur
            /*
            pseudo:this.props.joueur.pseudo,
            score:this.props.joueur.score,
            accuracy:this.props.accuracy
            */
        };
    }

    render()
    {
        return (<div className="divGameover"><br/>
                    <h1>Victoire {this.state.joueur.pseudo} !</h1>
                    <br/>
                    <div className="divStats">
                        <h2>Ton score : {this.state.joueur.score}</h2>
                        <br/>
                        <h2>Précision : {Math.round(this.state.joueur.mouchees/this.state.joueur.lancees*1000)/10} %</h2>
                        <br/>
                        <h4>{this.state.joueur.lancees} flèches lancées</h4>
                        <br/>
                        <h4>{this.state.joueur.mouchees} flèches gagnantes</h4>
                        <br/>
                        <button onClick={this.props.relance}> Rejouer ?</button>
                    </div>
                </div>);
                
    }
}

export default GameOver;
