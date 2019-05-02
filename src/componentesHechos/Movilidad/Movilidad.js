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
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Movilidad extends Component {

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
            data: {}
        };
        this.miFuncion = this.miFuncion.bind(this);
        this.miFuncion();

    }


    miFuncion(){
        fetch('http://tallerbackend.herokuapp.com/ApiController/listaConceptos')//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{

            //console.log(result);
            this.setState({
                isChartLoaded : true,
                data: {
                    animationEnabled: true, 
                    title:{
                        text: "Movilidad Alumnos vs Movilidad Docentes"
                    },
                    axisY : {
                        title: "Número de Personas",
                        includeZero: false
                    },
                    toolTip: {
                        shared: true
                    },
                    data: [{
                        type: "spline",
                        name: "Alumnos",
                        showInLegend: true,
                        dataPoints: [
                            { y: 155, label: "2009" },
                            { y: 150, label: "2010" },
                            { y: 152, label: "2011" },
                            { y: 148, label: "2012" },
                            { y: 142, label: "2013" },
                            { y: 150, label: "2014" },
                            { y: 146, label: "2015" },
                            { y: 149, label: "2016" },
                            { y: 153, label: "2017" },
                            { y: 158, label: "2018" },
                            { y: 154, label: "2018-2" }
                        ]
                    },
                    {
                        type: "spline",
                        name: "Docentes",
                        showInLegend: true,
                        dataPoints: [
                            { y: 172, label: "2009" },
                            { y: 173, label: "2010" },
                            { y: 175, label: "2011" },
                            { y: 172, label: "2012" },
                            { y: 162, label: "2013" },
                            { y: 165, label: "2014" },
                            { y: 172, label: "2015" },
                            { y: 168, label: "2016" },
                            { y: 175, label: "2017" },
                            { y: 170, label: "2018" },
                            { y: 165, label: "2018-2" }
                        ]
                    }]
                }
            });
        })
    }

    render() {
        
        return (

        <div>
            <CanvasJSChart options = {(this.state.isChartLoaded) ? this.state.data : (null)} />
        </div>
        );
    }
}
export default Movilidad;
