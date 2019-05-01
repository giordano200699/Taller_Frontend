/* App.js */

import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DemandaSocial from './../DemandaSocial/DemandaSocial';
import Movilidad from './../Movilidad/Movilidad';
import { slide as Menu } from 'react-burger-menu';
import Formulario from "./../../componentes/formulario";
import './Index.css';

let opcionGlobal = 1;

class Index extends Component {

    constructor(){//constructor inicial
        super();
        this.state = {
            opcion:1
        };
        this.handleChangeOpcion = this.handleChangeOpcion.bind(this);
        this.handleApretarBoton = this.handleApretarBoton.bind(this);
        

    }

    handleChangeOpcion(event) { // cambiar opcion
        this.setState({
            opcion: event.target.value

        });
        
    }

    handleApretarBoton(event){
        opcionGlobal = this.state.opcion;
    }




    render() {
        
        return (

            <Router>
                <div className="row">
                    <div className="panel col-md-3">
                        <Tabs align="center" >
                            <Tab label="Datos" className="panelDibujado">
                                <div className="form-group">
                                    <label>Tipo:</label>
                                    <select className="form-control" value={this.state.opcion} onChange={this.handleChangeOpcion}>
                                        <option value="1">Demanda Social</option>
                                        <option value="2">Movilidad</option>
                                    </select>
                                </div>
                                
                                <button className="btn btn-success btn-block" onClick={this.handleApretarBoton}><Link to="/" className="btn btn-success btn-block" >Demanda Social</Link></button>
                            </Tab>
                        </Tabs>
                    </div>
                    <div className="panel col-md-9">
                        <Route path='/demandaSocial' component={DemandaSocial} />
                        <Route path='/movilidad' component={Movilidad} />
                        <Route path='/' component={miFuncion} />
                    </div>
                </div>
            </Router>
        );
    }

    
}
function miFuncion(){
    if(opcionGlobal ==1){
        return(<DemandaSocial />)
    }else{
        return(<Movilidad />)
    }
    
}


export default Index;
