/* App.js */

import React, { Component } from 'react';
import Chart from './../../componentes/chart.js'
import Fecha from './../../componentes/fecha.js'
import BtnExport from './../../componentes/btn-export';
import Tabla from './../../componentes/tabla';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import ToolTipPosition from "./../../componentes/ToolTipPositions";
import SelectGrafica from "./../../componentes/selectForGrafica";
import SelectYear from "./../../componentes/selectYear";
import SelectMonth from "./../../componentes/selectMonth";
import CanvasJSReact, {CanvasJS} from './../../canvasjs.react';
import Parser from 'html-react-parser';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PoblacionEstudiantil extends Component {

    constructor(){//constructor inicial
        super();
        this.state = {
            isUsed:false, //usado para saber si las aplicacion es usada
            showPopover: false, //usado para mostrar o no el popup
            verdades : {}, //usado para  ver que conceptos estan sieno usados
            chartData : {}, //usado para dar datos al FusionChart (cuadro)
            isChartLoaded: true, //usado para mostrat el FusionChart
            tableData: {}, //usado para dar datos a la tabla
            isTableLoaded: false, //usado para mostrar la tabla
            conceptsData: {}, //usado para guardar los conceptos de la BD
            isConceptsLoaded: false, //usado para saber si ya obtuvimos los conceptos de la BD
            infoType : "importes", //usado para saber el tipo de informacion mostrada
            titulo: 'REPORTE ESTADISTICO DE IMPORTES POR CONCEPTO', //usado para el titulo del cuadro
            subtitulo: 'DEL 03/01/2015 AL 06/01/2015', //usado para el subtitulo del cuadro
            fechaInicio: '1420243200', //usado para la fecha inicial del cuadro
            fechaFin: '1420502400', //usado para la fecha final del cuadro
            grafico : 'column2d', //usado para el tipo de grafico del cuadro
            anioini : '2015', //usado para el año inicial del cuadro
            aniofin : '2015', //usado para el año final del cuadro
            anio: '2015', //usado para el año a biscar con el intervalo del mes
            mesini : '1', //usado para el mes inicial del cuadro
            mesfin : '12', //usado para el mes final del cuadro/grafico
            opcion : 'fecha', //usado para la opcion del filtro
            colores : "", //usado para el tipo de color del cuadro/grafico
            grad : "0", //usado para el gradiente del cuadro
            prefijo : "S/", //usado para el prefijo del cuadro
            listaConceptos : "", //usado para guardar una lista de los conceptos del cuadro
            todos : true, //usado para marcar todos los checkbox
            conceptos : [], //usado para saber que checkboxes son marcados
            todosConceptos : [], //usado para saber todos los conceptos que hay en la BD en otro tipo formato de dato
            usuario : '', //usado para la sesion del usuario
            listaConceptosEncontrados : "", //usado para saber que conceptos se encontraron en la consulta,
            data: {},
            miHtml: '',
            miHtml2:''
        };
        this.miFuncion = this.miFuncion.bind(this);
        this.miFuncion();

    }


    miFuncion(){
        fetch('http://tallerbackend.herokuapp.com/ApiController/poblacionEstudiantil')//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{

            //console.log(result);

            var arregloDatos = [];
            var cadena1 = '<tr><th>Año</th>';
            var cadena2 = '<tr><td>Total</td>';

            for(var i in result){
                arregloDatos.push({y:parseInt(result[i]["count"]),label:result[i]["anio_ingreso"]});
                cadena1 = cadena1 + '<th>'+result[i]["anio_ingreso"]+'</th>';
                cadena2 = cadena2 + '<td>'+result[i]["count"]+'</td>';
            }
            cadena1 = cadena1 + '</tr>';
            cadena2 = cadena2 + '</tr>';

            this.setState({
                isChartLoaded : true,
                data: {
                    animationEnabled: true, 
                    title:{
                        text: "Población Estudiantil"
                    },
                    axisY : {
                        title: "Número de Alumnos",
                        includeZero: false
                    },
                    toolTip: {
                        shared: true
                    },
                    data: [{
                        type: "spline",
                        name: "Población Estudiantil",
                        showInLegend: true,
                        dataPoints: arregloDatos
                    }]
                },
                miHtml:cadena1,
                miHtml2:cadena2
            });
        })
    }

    render() {
        
        return (
            <div>
                <Tabs align="center" >
                    <Tab label="Tabla">
                        <div class="panel row align-items-center">
                            <div class="panel-heading mt-3 mb-3">
                                <h4 class="panel-title">Tabla de Demanda Social</h4>
                            </div>
                            <table className="table table-bordered table-striped col-md-11 mr-md-auto">
                                <thead>
                                    {Parser(this.state.miHtml)}  
                                </thead>
                                <tbody>
                                    {Parser(this.state.miHtml2)}                            
                                </tbody>
                            </table>          
                        </div>
                    </Tab>
                    <Tab label="Grafico">
                    <div class="panel row align-items-center">
                        <div class="panel-heading mt-3 mb-3">
                            <h4 class="panel-title">Grafica de Demanda Social</h4>
                        </div>
                        <div class="panel-body col-md-11 mr-md-auto ml-md-auto">
                            <CanvasJSChart options = {(this.state.isChartLoaded) ? this.state.data : (null)} />
                        </div>           
                    </div>
                    </Tab>
                </Tabs>
            </div>

        );
    }
}
export default PoblacionEstudiantil;
