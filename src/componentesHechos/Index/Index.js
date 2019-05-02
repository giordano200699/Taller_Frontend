/* App.js */

import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DemandaSocial from './../DemandaSocial/DemandaSocial';
import Movilidad from './../Movilidad/Movilidad';
import RelacionAlumnos from './../RelacionAlumnos/RelacionAlumnos';
import ProgramaAlumnos from './../ProgramaAlumnos/ProgramaAlumnos';
import PoblacionEstudiantil from './../PoblacionEstudiantil/PoblacionEstudiantil';
import { slide as Menu } from 'react-burger-menu';
import Formulario from "./../../componentes/formulario";
import './Index.css';

let opcionGlobal = 1;

class Index extends Component {

    constructor(){//constructor inicial
        super();
        this.state = {
            opcion:1,
            periodo:2009
        };
        this.handleChangeOpcion = this.handleChangeOpcion.bind(this);
        this.handleApretarBoton = this.handleApretarBoton.bind(this);
        this.handleChangePeriodo = this.handleChangePeriodo.bind(this);
        

    }

    handleChangeOpcion(event) { // cambiar opcion
        this.setState({
            opcion: event.target.value
        });
        
    }

    handleApretarBoton(event){
        opcionGlobal = this.state.opcion;
    }

    handleChangePeriodo(event){
        this.setState({
            periodo: event.target.value
        });
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
                                        <option value="3">Relación de Alumnos</option>
                                        <option value="4">Programa Alumnos</option>
                                        <option value="5">Población Estudiantil</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Periodo:</label>
                                    <select className="form-control" value={this.state.periodo} onChange={this.handleChangePeriodo}>
                                        <option value="2009">2009</option>
                                        <option value="2010">2010</option>
                                        <option value="2011">2011</option>
                                        <option value="2012">2012</option>
                                        <option value="2013">2013</option>
                                        <option value="2014">2014</option>
                                        <option value="2015">2015</option>
                                        <option value="2016">2016</option>
                                        <option value="2017">2017</option>
                                        <option value="2018">2018</option>
                                        <option value="2018-2">2018-2</option>
                                    </select>
                                </div>
                                
                                <button className="btn btn-success btn-block" onClick={this.handleApretarBoton}><Link to="/" className="btn btn-success btn-block" >Generar Gráfica</Link></button>
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
    if(opcionGlobal == 1){
        return(<DemandaSocial />)
    }else if(opcionGlobal == 2){
        return(<Movilidad />)
    }else if(opcionGlobal == 3){
        return(<RelacionAlumnos />)
    }else if(opcionGlobal == 4){
        return(<ProgramaAlumnos />)
    }else{
        return(<PoblacionEstudiantil />)
    }
    
}


export default Index;
