// Importation des dépendances
import React from 'react';

class Sprite extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            ids:this.props.ids,
            displayS:'block',
        };
    }

    render()
    {
        // && this.state.oMouseU!==null) un seul oMouse suffit pr tester si on colle les events ou non 
        if(this.props.oMouseM!==null)
            return(<div onMouseMove={this.props.oMouseM} onMouseUp={this.props.oMouseU} style={{display:this.state.displayS,position:'absolute',top:this.props.y,left:this.props.x}}><img src={this.props.src} alt="" /></div>); // onSelect={(e)=>{e.preventDefault()}}
        else
            return(<div style={{display:this.state.displayS,position:'absolute',top:this.props.y,left:this.props.x}}><img src={this.props.src} alt="" /></div>);
    }
}

export default Sprite;