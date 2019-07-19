

// Importation des dépendances
import React, { Component } from 'react';
import './Jeu.css';
import './Joueur.css';

import Joueur from './Joueur';
import Carte from './Carte';
import Fleche from './Fleche';
import Sprite from './Sprite';
import GameOver from './GameOver';

// images / sprites
import Chateau1 from './assets/zamek07.png';
import Chateau2 from './assets/zamek07r.png';
//import Zamek5 from './assets/zamek05.png';
import Zamek05 from './assets/zamek05r.png';
//import Zamek2 from './assets/zamek02.png';
import Zamek02 from './assets/zamek02r.png';
import Arc1 from './assets/arc.png';
import Arc2 from './assets/arcr.png';
import Reticule from './assets/reticule.png';

import Pwrafa from './assets/pwrafa.ogg';

const CHAWIDTH = 174;
const LIMITCHFLECHES = 4;
const ORDI = "Computa'";

class Jeu extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            ecranW:0,            ecranH:0,
            carte:null,
            joueur1:new Joueur({idj:'J1',pseudo:this.props.pseudo}),  //sonChatox:Chateau1,x:0,y:0,l:128,h:204,oMouse:true}),
            joueur2:new Joueur({idj:'J2',pseudo:ORDI}),  //,sonChatox:Chateau2,x:0,y:0,l:128,h:204,oMouse:false}),
            reticule1:null,            ret1x:0,            ret1y:0,
            reticule2:null,            cranx:0,            crany:0,
            trainee:null,
            fleches:[], //typeof Fleche            affFleches:false,
            lastFleche:0,son:null,collides:[],   // {ids:null,x1:0,y1:0,x2:0,y2:0}
            gameover:false
        };

        this.setReticule1 = this.setReticule1.bind(this);
        this.handleReticule2 = this.handleReticule2.bind(this);
        this.lanceFleche = this.lanceFleche.bind(this);
        this.supFleche = this.supFleche.bind(this);
        this.subLife = this.subLife.bind(this);
    }

    componentDidMount()
    {
        // A cause du non montage de Jeu, la div divjeu a une petite hauteur avant
        // l'appel à <Jeu props../>  du coup pour avoir la bonne hauteur d'écran
        // et pour les calculs de coordonnées, on set les sprites après le montage
        var ecranTemp = document.getElementById('divjeu');
        
        this.setState({ecranW:ecranTemp.clientWidth});
        this.setState({ecranH:ecranTemp.clientHeight});
        this.setState({carte:<Carte ecranW={ecranTemp.clientWidth} ecranH={ecranTemp.clientHeight} level={1} />});

        this.state.joueur1.chateau.push(<Sprite key={'spCh'+this.state.joueur1.idj} ids={'spCh'+this.state.joueur1.idj} src={Chateau1} oMouseM={this.handleReticule2} oMouseU={this.lanceFleche} x={0} y={ecranTemp.clientHeight-204} />);
        this.state.collides.push({ids:'spCh'+this.state.joueur1.idj,x1:0,y1:ecranTemp.clientHeight-204,x2:128,y2:ecranTemp.clientHeight});

        this.state.joueur2.chateau.push(<Sprite key={'spCh'+this.state.joueur2.idj} ids={'spCh'+this.state.joueur2.idj} src={Chateau2} oMouseM={null} x={ecranTemp.clientWidth-174} y={ecranTemp.clientHeight-204} />);
        this.state.collides.push({ids:'spCh'+this.state.joueur2.idj,x1:ecranTemp.clientWidth-160,y1:ecranTemp.clientHeight-204,x2:ecranTemp.clientWidth-174+74,y2:ecranTemp.clientHeight});
    }

    componentWillUnmount()
    {
        //this.props.gameover(this.state.joueur1);
        console.log('Jeu démonté.');
    }

    render()
    {
        /*if(this.state.gameover)
            var contenude=;
*/
        // TO DO : rafaichir la taille ecran (avec window.onResize ou un truc ds le genre)
        return <div className="ciel">
                        {this.state.gameover}
                        <div className="score" style={{top:48,left:'5%'}}>
                            <span className="board1">{this.state.joueur1.pseudo}</span>
                            <span className="rondJoueur">{this.state.joueur1.idj}</span>
                            <br/>
                            <span className="board2">Score : {this.state.joueur1.score}</span><br/>
                            <span className="board3">Vie : {this.state.joueur1.vie} %</span>
                        </div>
                        <div className="score" style={{top:48,left:'80%'}}>
                            <span className="board1">{this.state.joueur2.pseudo}</span>
                            <span className="rondJoueur">{this.state.joueur2.idj}</span>
                            <br/>
                            <span className="board2">Score : {this.state.joueur2.score}</span><br/>
                            <span className="board3">Vie : {this.state.joueur2.vie} %</span>
                        </div>
                        {this.state.son}
                        {this.state.carte}

                        {/* CHATEAU JOUEUR */}
                        {this.state.joueur1.chateau[0]}

                        {/* CHATEAU Computa */}
                        {this.state.joueur2.chateau[0]}
                        {this.state.degatJ2}

                        <div style={{position:'absolute',bottom:140,left:90}} onMouseUp={this.setReticule1}><img src={Arc1} alt="" /></div>
                        <div style={{position:'absolute',bottom:140,left:this.state.ecranW-CHAWIDTH}}><img src={Arc2} alt="" /></div>

                        {this.state.reticule1}{this.state.trainee}{this.state.reticule2}
                        {this.state.affFleches && this.state.fleches.map(unefleche => unefleche)}
                    </div>;
    }

    setReticule1(e)
    {
        // clic sur l'arc
        var mousex=e.clientX-34,mousey=e.clientY-44;
        this.setState({ret1x:mousex,ret1y:mousey,reticule1:<div style={{position:'absolute',left:mousex,top:mousey}}><img src={Reticule} alt="" /></div>});
    }

    handleReticule2(e)
    {
        if(this.state.reticule1!==null)
        {
            //var clic=e.button;
            var mousex=e.clientX-20;
            var mousey=e.clientY-50;

            // sécurité anti visée au delà de l'arc affiché
            var ret1x=this.state.ret1x;
            if(ret1x-8>mousex)
            {
                this.setState({reticule2:<div style={{position:'absolute',left:mousex,top:mousey-5}}><img src={Reticule} alt="" /></div>});

                // calcul de la pente de la trainee (les 5 étoiles qui relient le mouvement)
                var ret1y=this.state.ret1y;
    
                var cranx=(ret1x-mousex)/6;
                var moitiePixelRet=11/2;
                var crany=((mousey-moitiePixelRet)-ret1y)/6;

                cranx=Math.round(cranx);
                crany=Math.round(crany);

                this.setState({cranx:cranx});
                this.setState({crany:crany});
                crany=Math.abs(crany);
    
                if(mousey<=ret1y)
                    this.setState({trainee:<>
                    <div className="visee" style={{fontSize:25,left:mousex+cranx,top:mousey+crany}}></div>                    <div className="visee" style={{fontSize:20,left:mousex+(cranx*2),top:mousey+(crany*2)}}></div>                    <div className="visee" style={{fontSize:15,left:mousex+(cranx*3),top:mousey+(crany*3)}}></div>                    <div className="visee" style={{fontSize:10,left:mousex+(cranx*4),top:mousey+(crany*4)}}></div>                    <div className="visee" style={{fontSize:5,left:mousex+(cranx*5),top:mousey+(crany*5)}}></div></>});
                else
                    this.setState({trainee:<>
                    <div className="visee" style={{fontSize:25,left:mousex+cranx,top:mousey-crany}}></div>                    <div className="visee" style={{fontSize:20,left:mousex+(cranx*2),top:mousey-(crany*2)}}></div>                    <div className="visee" style={{fontSize:15,left:mousex+(cranx*3),top:mousey-(crany*3)}}></div>                    <div className="visee" style={{fontSize:10,left:mousex+(cranx*4),top:mousey-(crany*4)}}></div>                    <div className="visee" style={{fontSize:5,left:mousex+(cranx*5),top:mousey-(crany*5)}}></div></>});
            }
        }
    }

    lanceFleche()
    {
        // lancement d'une flèche        
        if(!this.state.gameover && this.state.reticule2!==null && this.state.fleches.length<LIMITCHFLECHES)
        {
            this.setState({trainee:''});

            var nbf;
            var ecranW = this.state.ecranW;
            var ecranH = this.state.ecranH;
            //console.log('Jeu : fleches.length='+this.state.fleches.length);
            if(this.state.fleches.length<=0)
            {
                nbf=1;
                this.setState({lastFleche:1});
            }
            else
            {
                nbf=1+this.state.lastFleche;
                this.setState({lastFleche:nbf});
            }

            this.setState({affFleches:true});

            // son du lancement d'une flèche
            this.setState({son:<div>
                                <object type="audio/ogg" width="0" height="0" data={Pwrafa}>&nbsp;</object>
                            </div>});

            // Ajout d'une flèche <Fleche> dans le tableau Array this.state.fleches
            //console.log('push Fleche ecranW='+ecranW+' ecranH='+ecranH+' funct='+this.supFleche+' key={f'+nbf+'} idf={f'+nbf+'} vx='+this.state.cranx/3+' vy='+this.state.crany/4+' rx='+this.state.ret1x+' ry='+this.state.ret1y+' collitre='+this.state.collides+' subLife='+this.subLife);
            this.state.fleches.push(<Fleche ecranW={ecranW} ecranH={ecranH} funct={this.supFleche} key={'f'+nbf} idf={'f'+nbf} vx={this.state.cranx/3} vy={this.state.crany/4} rx={this.state.ret1x} ry={this.state.ret1y} collitre={this.state.collides} subLife={this.subLife}/>);
            this.state.joueur1.addlancees();

            setTimeout(()=>
            {
                this.setState({son:null});
                //console.log('Jeu : kill son de lancement {Pwrafa}'+this.state.minuterie);
            },300);
        }
    }

    supFleche(idf)
    {
      if(this.state.fleches.length>0)
      {
        var flecheTemp = this.state.fleches.filter((cle)=>{return cle.key!==idf});
        this.setState({fleches:flecheTemp});
  
        //console.log('Jeu : suppr. flèche id='+idf+' il reste '+this.state.fleches.length+' flèche(s).');
        if(this.state.fleches.length<1)
        {
            this.setState({affFleches:false});
            console.log('Jeu : plus de flèches à afficher, RAZ fleches[] affFleches='+this.state.affFleches);
        }
       }
    }

    subLife(idj,degats)
    {
      if(!this.state.gameover && idj===this.state.joueur2.idj)
      {
        this.state.joueur2.setVie(this.state.joueur2.vie-degats);
        this.state.joueur1.setScore(this.state.joueur1.score+5*degats);
        this.state.joueur1.addmouchees();

        var lesAutres = this.state.collides.filter((cle)=>{return cle.ids!=='spChJ2'});

        if(this.state.joueur2.vie<=66)
        {
            //this.setState({joueur2:{chateau:null}});
            this.state.joueur2.chateau.shift();
            this.state.joueur2.chateau.push(<Sprite key={'spCh'+this.state.joueur2.idj} ids={'spCh'+this.state.joueur2.idj} src={Zamek05} oMouseM={null} x={this.state.ecranW-128-43} y={this.state.ecranH-182-14} />);
            
            this.setState({collides:lesAutres});
            this.state.collides.push({ids:'spCh'+this.state.joueur2.idj,x1:this.state.ecranW-150,y1:this.state.ecranH-204+25,x2:this.state.ecranW-174+74,y2:this.state.ecranH});
        }

        if(this.state.joueur2.vie<=33)
        {
            this.state.joueur2.chateau.shift();
            this.state.joueur2.chateau.push(<Sprite key={'spCh'+this.state.joueur2.idj} ids={'spCh'+this.state.joueur2.idj} src={Zamek02} oMouseM={null} x={this.state.ecranW-100-64} y={this.state.ecranH-155-28} />);

            this.setState({collides:lesAutres});
            this.state.collides.push({ids:'spCh'+this.state.joueur2.idj,x1:this.state.ecranW-140,y1:this.state.ecranH-204+50,x2:this.state.ecranW-174+74,y2:this.state.ecranH});
        }

        if(this.state.joueur2.vie<=0)
        {
            // GAGNéééé !!!!
            this.state.joueur2.setVie(0);
            // nettoyer les objets avant de changer de page/divjeu
            //this.setState({collides:[]});
            this.setState({reticule1:null});
            this.setState({reticule2:null});
            this.setState({gameover:<GameOver joueur={this.state.joueur1} relance={this.props.gameover} />})
            /*
            setTimeout(
                this.setState({gameover:true})
            ,2000);
            
            
            while(this.state.fleches.length>0)
                this.state.fleches.shift();

            this.setState({affFleches:false});
            this.setState({trainee:''});
            this.setState({reticule1:null});
            this.setState({reticule2:null});
            this.setState({carte:null});*/
        }
      }
    }
}

export default Jeu;
