

import React, {Component} from 'react';

import Marble from './assets/marble.png';
import Marbleko from './assets/marbleko.png';

import './Carte.css';
import Sprite from './Sprite';

class Carte extends Component
{
    constructor(props)
    {
        super(props);

        this.state=
        {
            wid:this.props.ecranW,
            hei:this.props.ecranH,
            bloc:[],        // Array vide, car si on précise bloc:[<Sprite/>] il va crée un 1er element Sprite qui n'aura pas de "key" du coup y'aura erreur "each child unique key..."
            level:this.props.level
        };

        console.log("Carte.js : la carte du jeu fait "+this.state.wid+' x '+this.state.hei);
        var nb_bloc=Math.round(this.state.wid/44);  // 44 pixels tailles d'un bloc "marble/ko"

       switch(this.props.level)
       {
        /*
            LEVEL 1
        */
        case 1:
            // 1er étage de blocs
            for(let i=1;i<=nb_bloc;i++)
                this.state.bloc.push(<Sprite ids={'bup'+i} key={'bup'+i} src={Marble} x={(i-1)*44} y={this.state.hei-88} l={44} h={44} />);
                //<div key={'bup'+this.state.bloc.length} style={{left:((i-1)*44)+'px',bottom:'44px'}} className="divbloc"><img src={Marble} alt="" /></div>);
            // 2è étage
            for(let i=1;i<=nb_bloc;i++)
                this.state.bloc.push(<Sprite ids={'bdw'+i} key={'bdw'+i} src={.5+Math.random()>.9?Marble:Marbleko} x={(i-1)*44} y={this.state.hei-44} l={44} h={44} />);
                //<div key={'bdw'+this.state.bloc.length} style={{left:((i-1)*44)+'px',bottom:'0px'}} className="divbloc"><img src={.5+Math.random()<1?Marble:Marbleko} alt="" /></div>);

            // 3è étage
            this.state.bloc.push(<Sprite ids={'bm1'} key={'bm1'} src={.5+Math.random()>.9?Marble:Marbleko} x={7*44} y={this.state.hei-132} l={44} h={44} />);
            this.state.bloc.push(<Sprite ids={'bm2'} key={'bm2'} src={.5+Math.random()>.9?Marble:Marbleko} x={8*44} y={this.state.hei-132} l={44} h={44} />);
            this.state.bloc.push(<Sprite ids={'bm3'} key={'bm3'} src={.5+Math.random()>.9?Marble:Marbleko} x={9*44} y={this.state.hei-132} l={44} h={44} />);
            this.state.bloc.push(<Sprite ids={'bm4'} key={'bm4'} src={.5+Math.random()>.9?Marble:Marbleko} x={10*44} y={this.state.hei-132} l={44} h={44} />);
            this.state.bloc.push(<Sprite ids={'bm5'} key={'bm5'} src={.5+Math.random()>.9?Marble:Marbleko} x={8*44} y={this.state.hei-176} l={44} h={44} />);
            this.state.bloc.push(<Sprite ids={'bm6'} key={'bm6'} src={.5+Math.random()>.9?Marble:Marbleko} x={9*44} y={this.state.hei-176} l={44} h={44} />);
        break;

        default:
        break;
       }
    }
    
    render()
    {
        return this.state.bloc.map((element) => element);
    }
}

export default Carte;