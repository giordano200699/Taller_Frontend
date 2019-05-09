/* App.js */

import React, { Component } from 'react';
import './DemandaSocial.css';
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

class DemandaSocial extends Component {

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
            miHtml : ''
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
            // result['datasets'][0]['backgroundColor'] = 'rgba(54, 162, 235, 0.6)';

            // const chartData1=[];

            // for(var i in result.labels)
            // {
            //     this.setState({
            //         listaConceptosEncontrados : (this.state.listaConceptosEncontrados + result['labels'][i]+", ")
            //     })
            //   chartData1.push({
            //     label: result['labels'][i],
            //     value: result['datasets'][0]['data'][i]
            //   });
            // }

            this.setState({
                isChartLoaded : true,
                data: {
            title: {
                text: "Demanda Social"
            },
            data: result
        }
            });
        })

        fetch('http://localhost:8888/back-estadisticas/ApiController/demandaSocial')//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{
            //result = JSON.parse(result);

            console.log(result);
            let cadena="";
            var totalD=0;
            var totalA = [];
            var bandera=false;
            for(var i in result) {
                if(bandera==false){
                    bandera=true;
                    for(var j in result[i]){
                        totalA[j]=0;
                    }
                }
                totalD=0;
               cadena = cadena + "<tr><td>"+i+"</td>";
               for(var j in result[i]){
                if(result[i][j]==0){
                    cadena = cadena+"<td></td>";
                }else{
                    cadena = cadena+"<td>"+result[i][j]+"</td>";
                    totalD = totalD + result[i][j];
                    totalA[j]=totalA[j]+result[i][j];
                }
                
               }
               cadena = cadena + "<td>"+totalD+"</td></tr>";
               //"</tr>";
            }
            this.setState({
                miHtml: cadena
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
                                <tr>
                                    <th>Etiquetas</th>
                                    <th>2002</th>
                                    <th>2003</th>
                                    <th>2004</th>
                                    <th>2005</th>
                                    <th>2006</th>
                                    <th>2007</th>
                                    <th>2008</th>
                                    <th>2009</th>
                                    <th>2010</th>
                                    <th>2011</th>
                                    <th>2012</th>
                                    <th>2013</th>
                                    <th>2014</th>
                                    <th>2015</th>
                                    <th>2016</th>
                                    <th>2017</th>
                                    <th>2018</th>
                                    <th>Total General</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Parser(this.state.miHtml)}                                
                                <tr>
                                    <td>Total General</td>
                                    <td>20</td>
                                    <td>30</td>
                                    <td>40</td>
                                    <td>50</td>
                                    <td>60</td>
                                    <td>70</td>
                                    <td>80</td>
                                    <td>90</td>
                                    <td>100</td>
                                    <td>101</td>
                                    <td>120</td>
                                    <td>103</td>
                                    <td>140</td>
                                    <td>150</td>
                                    <td>160</td>
                                    <td>170</td>
                                    <td>180</td>
                                    <td>1110</td>
                                </tr>                         
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
            {/*<p>DISI: Doctorado en Ingeniería de Sistemas e Informática </p>*/}
        </div>
        );
    }
}
export default DemandaSocial;

/*

    { label: "DSI",  y: 0  },
    { label: "GTIC", y: 15  },
    { label: "ISW", y: 74  },
    { label: "DGTI", y: 74  },
    { label: "GIC",  y: 0  },
    { label: "GTI",  y: 0  },
    { label: "GPTI",  y: 0  },
    { label: "ASTI",  y: 0  }
*/