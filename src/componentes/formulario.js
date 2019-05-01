import React, {Component} from 'react';
import Fecha from './fecha.js'

class Formulario extends Component{

    constructor(props){
        super(props);
        this.state = {
            "inicio" : props.inicio,
            "fin" : props.fin
        }
        this.onClickPreventDefault = this.onClickPreventDefault.bind(this);
    }

    onClickPreventDefault(e) {
        console.log("hola");
        e.preventDefault();
    }

    render(){
        return(
            <form>
                <div className="form-group">
                    <label>Fecha inicial</label>
                    <Fecha/>
                </div>
                <div className="form-group">
                    <label>Fecha final</label>
                    <Fecha/>
                </div>
                <div className="form-group">
                    <button onClick={this.onClickPreventDefault} className="btn btn-primary">Generar</button>
                </div>
            </form>
        )
    }
}

export default Formulario;
