
import React from 'react';
import './Fleche.css';

import Sfleche from './assets/fleche.gif';
import Explosion from './assets/explosion.gif';
import Tarkey from './assets/tarkey.png';

import Pwexplo from './assets/pwexplo.ogg';

const LARGEURFLECHE = 88;
const CORNATEUR = 10000;

class Fleche extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            ecranW:this.props.ecranW,            ecranH:this.props.ecranH,
            idf:this.props.idf,            sprite:Sfleche,
            //joueur:this.props.jou,
            x:this.props.rx,            y:this.props.ry,
            vitx:this.props.vx,            vity:this.props.vy||-1.2,    // si la props=0 (par son calcul) on met à -1,2 pour alourdir la flèche (sinon tir droit parfait non réaliste)
            angle:0,
            decompte:null,            son:null,
            collision:false,            degatJ2:null
        };
        //console.log('Fleche : une flèche est créée : idf='+this.state.idf+',vitx='+this.state.vitx+',vity='+this.state.vity+',x='+this.state.x+',y='+this.state.y);
    }

    componentDidMount()
    {
        //console.log('Fleche : je suis montée comme un guidon.');
        this.setState({decompte:setInterval(() => this.bouge(),8)});
    }

    componentWillUnmount()
    {
        //console.log('Fleche : démontée ! Terrible');
    }

    render()
    {
        //console.log('Fleche : render=<div id={f'+this.state.idf+'} style={{position:absolute,left:'+this.state.x+',top:'+this.state.y+'}}><img src={Sfleche} alt="fleche" /></div>');
        return(<div>
                {this.state.son}
                <div style={{transform:'rotate('+this.state.angle+'deg)',position:'absolute',left:this.state.x,top:this.state.y}}>
                    <img src={this.state.sprite} alt="" />
                </div>
                {this.state.degatJ2}
        </div>);
    }

    bouge()
    {
        var sonx=this.state.x;
        var sony=this.state.y;
        //console.log('appel bouge() AVANT x='+sonx);

        //var clonexTemp=this.state.clonex+this.state.vity; //Math.round((1/this.state.vity)*20)+this.state.clonex;
        //console.log('crany='+this.state.vity);
        //this.setState({clonex:clonexTemp});

        //-----------------------------------------------
        //
        // controle de la flèche bien à l'int. de l'écran
        //
        // sonx<this.state.ecranx-largeurFleche = bord droit écran
        // sony<this.state.ecrany               = bas de l'écran
        // sony>0                               = haut de l'écran
        //-----------------------------------------------
        if(sonx<this.state.ecranW-LARGEURFLECHE/2 && sony<this.state.ecranH && !this.state.collision)
        {
            // TO DO A FAIRE : cas d'un tir parfaitement "droit"
            /*
            if(this.state.vity===0)
                this.setState({vity:-1.4});
*/
            //clonexTemp-=this.state.foffset;
            //sonx-=this.state.foffset;
            //sony=Math.round((clonexTemp*clonexTemp)/260);
            //sony-=(sonx-this.state.foffset)*(sonx-this.state.foffset); //Math.round((sonx*sonx)/260);
            sonx+=this.state.vitx;

            var capoussehein = this.state.vity*100;

            if(sonx-capoussehein<0)
            {
                sony-=((sonx-capoussehein)*(sonx-capoussehein)/CORNATEUR);
                //this.setState({angle:-sony/6});
            }
            else
            {
                sony+=((sonx-capoussehein)*(sonx-capoussehein)/CORNATEUR);
                //this.setState({angle:sony/6});
            }

            // si la flèche par au dessus de l'écran, on met l'effet brawhalla hors screen ^^
            if(sony<0)
            {
                sony=0;
                this.setState({sprite:Tarkey});
            }
            else    
                this.setState({sprite:Sfleche});

            var angle = (this.state.y-sony)/(sonx-this.state.x)*-12;
            if(angle<-60)
                angle=-60;
            if(angle>60)
                angle=60;

            this.setState({angle:angle});
            this.setState({x:sonx});
            this.setState({y:sony});

            /*
                    GESTION COLLISIONS
            */
            // Collision avec le Chateau2 de J2
            //var fx=this.state.x;
            //var fy=this.state.y;
            // envoi des coord. de la flèche au parent (Jeu)
            //this.props.gereCollisions(this.state.idf,sonx,sony);
            //this.setState({collitre:true});                
            //console.log('Fleche : appel bouge() angle='+this.state.angle+' | x='+sonx+',y='+sony);
            if(this.props.collitre.length>0)
            {
                var objStrange = this.props.collitre.filter((cle)=>{return cle.ids==='spChJ2'});
                //console.log('Jeu : {'+idf+'}: x='+fx+',y='+fy+'objStrange='+objStrange[0].x2);

                if(objStrange.length>0)
                {
                    var fx=sonx;
                    var fy=sony;

                    if(fx>objStrange[0].x1 && fx<objStrange[0].x2 && fy>objStrange[0].y1 && fy<objStrange[0].y2)
                    {
                        var critical=Math.random()>.8?5:2;
                        //console.log('Fleche : COLLISION J2 !!');
    
                        if(critical<5)
                            this.setState({degatJ2:<div className="degat" style={{top:fy+Math.random()*66-33,left:fx-18+Math.random()*44-22,color:'gold'}}>-{critical}</div>});
                        else
                            this.setState({degatJ2:<div className="degat" style={{top:fy+Math.random()*66-33,left:fx-18+Math.random()*44-22,color:'red'}}>-{critical}&nbsp;<span className="degatCrit">Critical!</span></div>});
    
                        this.setState({collision:true});
                        this.props.subLife('J2',critical);
                    }
                }
            }
        }
        else
        {
            // son de l'explosion d'une flèche
            this.setState({angle:0});
            // petit effet si y'a pluie de flèches, les explosions seront eparses
            this.setState({x:sonx+Math.random()*40-20});
            this.setState({y:sony+Math.random()*40-20});
            this.setState({sprite:Explosion});

            this.setState({son:<div>
                                <object type="audio/ogg" width="0" height="0" data={Pwexplo}>&nbsp;</object>
                            </div>});

            clearInterval(this.state.decompte);
            this.setState({decompte:0});
            //console.log('Fleche : fin course flèche : div id={'+this.state.idf+'} left:'+this.state.x+',top:'+this.state.y+',vitx:'+this.state.vitx+',vity:'+this.state.vity+' /div');

            setTimeout(() => {
                this.setState({son:null});
                //console.log('Jeu : kill son boum {Pwexplo}');
            }, 300);

            setTimeout(() => {
                this.props.funct(this.state.idf);
            }, 1000);
        }
    }
}

export default Fleche;