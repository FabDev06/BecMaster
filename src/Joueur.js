

class Joueur
{
    constructor(oblet)      // idj,pseudo,ids,sonChatox,x,y,l,h,oMouseM=null,oMouseU=null)
    {
        this.idj=oblet.idj;
        this.pseudo=oblet.pseudo;
        this.online=true;
        this.chateau=[];       //<Sprite key={'spCh'+oblet.idj} src={oblet.sonChatox} oMouseM={oblet.oMouse && this.oMouseM} oMouseU={oblet.oMouse && this.oMouseU} x={oblet.x} y={oblet.y} l={oblet.l} h={oblet.h} />,
        this.vie=15;
        this.score=0;

        this.lancees=0;
        this.mouchees=0;

        this.setVie = this.setVie.bind(this);
        this.setScore = this.setScore.bind(this);
        this.addlancees = this.addlancees.bind(this);
        this.addmouchees = this.addmouchees.bind(this);
    }

    setVie(nVie)
    {
        this.vie=nVie;
    }

    setScore(nScore)
    {
        this.score=nScore;
    }

    addlancees()
    {
        this.lancees++;
    }

    addmouchees()
    {
        this.mouchees++;
    }
}

export default Joueur;