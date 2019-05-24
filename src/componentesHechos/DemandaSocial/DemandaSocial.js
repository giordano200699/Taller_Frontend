/* App.js */

import React, { Component } from 'react';
import './DemandaSocial.css';
//import Chart from './../../componentes/chart.js'
//import Fecha from './../../componentes/fecha.js'
//import BtnExport from './../../componentes/btn-export';
//import Tabla from './../../componentes/tabla';
import {Tabs, Tab} from 'react-bootstrap-tabs';
//import ToolTipPosition from "./../../componentes/ToolTipPositions";
//import SelectGrafica from "./../../componentes/selectForGrafica";
//import SelectYear from "./../../componentes/selectYear";
//import SelectMonth from "./../../componentes/selectMonth";
import CanvasJSReact, {CanvasJS} from './../../canvasjs.react';
import Parser from 'html-react-parser';


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var opciones = ({
        title: {
            text: "Demanda Social"
        },
        data: [{
            type:"column",
            name: "2002",
            showInLegend: true,
            dataPoints:[
                {label:"DISI ",y:0},
                {label:"GTIC ",y:0},
                {label:"ISW ",y:15},
                {label:"GIC ",y:0},
                {label:"GTI ",y:0},
                {label:"GPTI ",y:0},
                {label:"ASTI ",y:0},
                {label:"GPGE ",y:0},
                {label:"DGTI ",y:74},
                {label:"SATD ",y:0}
            ]
        },
        {
            type:"column",
            name: "2003",
            showInLegend: true,
            dataPoints:[
                {label:"DISI ",y:0},
                {label:"GTIC ",y:0},
                {label:"ISW ",y:18},
                {label:"GIC ",y:0},
                {label:"GTI ",y:0},
                {label:"GPTI ",y:0},
                {label:"ASTI ",y:0},
                {label:"GPGE ",y:0},
                {label:"DGTI ",y:37},
                {label:"SATD ",y:0}
            ]
        }]
    });

class DemandaSocial extends Component {

    constructor(props){//constructor inicial
        super(props);
        this.state = {
            isUsed:false, //usado para saber si las aplicacion es usada
            showPopover: false, //usado para mostrar o no el popup
            verdades : {}, //usado para  ver que conceptos estan siendo usados
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
            anioini : ''+this.props.anioIni, //usado para el año inicial del cuadro
            aniofin : ''+this.props.anioFin, //usado para el año final del cuadro
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
            miHtml : '',
            miLeyenda: '',
            data2: {},
            cadenaAnios:''
        };
        this.miFuncion = this.miFuncion.bind(this);
        this.miFuncion();

        this.funcionPrueba = this.funcionPrueba.bind(this);
        this.funcionPrueba();

    }

    funcionPrueba(){

        console.log(this.state.data2);

    }

    miFuncion(){
        //alert("SOY LLAMADO "+this.state.anioini+"  "+this.state.aniofin+"  -- "+this.props.anioFin );
        //fetch('http://tallerbackend.herokuapp.com/ApiController/listaConceptos?fecha_inicio='+this.state.anioini+'&fecha_fin='+this.state.aniofin)//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
        fetch('http://tallerbackend.herokuapp.com/ApiController/listaConceptos?fecha_inicio='+this.state.anioini+'&fecha_fin='+this.state.aniofin)
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{

            /*DEBE BOTAR ALGO ASI :
                [{
                    "type":"column",
                    "name": "2002",
                    "showInLegend": true,
                    "dataPoints":[{"label":"DISI ","y":0},
                    {"label":"GTIC ","y":0},
                    {"label":"ISW ","y":15},
                    {"label":"GIC ","y":0},
                    {"label":"GTI ","y":0},
                    {"label":"GPTI ","y":0},
                    {"label":"ASTI ","y":0},
                    {"label":"GPGE ","y":0},
                    {"label":"DGTI ","y":74},
                    {"label":"SATD ","y":0}]
                },
                {
                    "type":"column",
                    "name": "2003",
                    "showInLegend": true,
                    "dataPoints":[{"label":"DISI ","y":0},
                    {"label":"GTIC ","y":0},
                    {"label":"ISW ","y":18},
                    {"label":"GIC ","y":0},
                    {"label":"GTI ","y":0},
                    {"label":"GPTI ","y":0},
                    {"label":"ASTI ","y":0},
                    {"label":"GPGE ","y":0},
                    {"label":"DGTI ","y":37},
                    {"label":"SATD ","y":0}]
                }]
            */

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

        fetch('http://tallerbackend.herokuapp.com/ApiController/demandaSocial?fecha_inicio='+this.state.anioini+'&fecha_fin='+this.state.aniofin)//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{
            //result = JSON.parse(result);

            //console.log(result);
            let cadena="";
            let leyenda = "";
            let sigla = "";
            var totalD=0;
            var totalA = [];
            var bandera = false;
            var totalTotal = 0;
            var cadenaAnios = '';

            for(var i=parseInt(this.state.anioini);i<=parseInt(this.state.aniofin);i++){
                cadenaAnios += '<th>'+i+'</th>';
            }

            for(var i in result) {
                if(bandera==false){
                    bandera=true;
                    for(var j in result[i]){
                        totalA[j]=0;
                    }
                }
                totalD=0;
                cadena = cadena + "<tr><td>"+ i +"</td>";

                for(var j in result[i]){
                    if(result[i][j]==0){
                        cadena = cadena+"<td></td>";
                    }else{
                        cadena = cadena+"<td>"+result[i][j]+"</td>";
                        totalD = totalD + result[i][j];
                        totalA[j]=totalA[j]+result[i][j];
                } 
               }
               cadena = cadena + "<td><H6><b>"+totalD+"</b></H6></td>";
               totalTotal= totalTotal + totalD;
            }
            cadena = cadena + "<tr><td><H6><b>Total General</b></H6></td>";
            for(var i in totalA){
                cadena = cadena+"<td><H6><b>"+totalA[i]+"</b></H6></td>";
            }
            cadena = cadena + "<td><H6><b>"+totalTotal+"</b></H6></td>";
            leyenda += "<hr></hr>"
            leyenda += "<h6 className='leyenda'><tr><td>ASTI: AUDITORIA Y SEGURIDAD DE TECNOLOGIA DE INFORMACION</td></h6>";
            leyenda += "<h6 className='leyenda'><tr><td>DISI: DOCTORADO EN INGENIERIA DE SISTEMAS E INFORMATICA</td></h6>";
            leyenda += "<h6 className='leyenda'><tr><td>GIC: GESTION DE LA INFORMACION Y DEL CONOCIMIENTO</td></h6>";
            leyenda += "<h6 className='leyenda'><tr><td>GPTI: GERENCIA DE PROYECTOS DE TECNOLOGIA DE INFORMACION</td></h6>";
            leyenda += "<h6 className='leyenda'><tr><td>GTI: GOBIERNO DE TECNOLOGIAS DE INFORMACION</td></h6>";
            leyenda += "<h6 className='leyenda'><tr><td>GTIC: GESTION DE TECNOLOGIA DE INFORMACION Y COMUNICACIONES</td></h6>";
            leyenda += "<h6 className='leyenda'><tr><td>ISW: INGENIERIA DE SOFTWARE</td></h6>";

            this.setState({
                miHtml: cadena,
                cadenaAnios:cadenaAnios,
                miLeyenda: leyenda
            });
        })

    }



    render() {
        if(this.props.anioFin!=this.state.aniofin || this.props.anioIni!=this.state.anioini){
            this.setState({
                aniofin: this.props.anioFin,
                anioini: this.props.anioIni
            },() => {
                this.miFuncion();
            });
            //this.miFuncion();
        }

        const aI = this.props.anioIni;
        const aF = this.props.anioFin;
        
        return (
            <div>
            <Tabs align="center" >
                <Tab label="Tabla">
                    <div className="panel row align-items-center">
                        <div className="panel-heading mt-3 mb-3">
                            <h5 className="titulo">LEYENDA: {Parser(this.state.miLeyenda)} </h5>
                            <hr></hr>
                            {aI == aF ? (<h4 className="titulo">Tabla de Datos - Demanda Social del año {this.props.anioIni}</h4>) : 
                            (<h4 className="titulo">Tabla de Datos - Demanda Social del {this.props.anioIni} al {this.props.anioFin}</h4>)}
                        </div>                    
                        <table className="table table-bordered table-striped col-md-11 mr-md-auto">
                            <thead>
                                <tr>
                                    <th>Etiquetas</th>
                                    {Parser(this.state.cadenaAnios)} 
                                    <th>Total General</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Parser(this.state.miHtml)}                                  
                            </tbody>
                        </table>
                    </div>
                </Tab>
                <Tab label="Grafico">
                <div className="panel row align-items-center">
                    <div className="panel-heading mt-3 mb-3">
                        <h4 className="panel-title">Gráfica de Demanda Social</h4>
                    </div>
                    <div className="panel-body col-md-11 mr-md-auto ml-md-auto">
                        <CanvasJSChart options = {(this.state.isChartLoaded) ? this.state.data : (null)} />
                    </div>           
                </div>
                </Tab>
                <Tab label="GraficoPrueba">
                <div className="panel row align-items-center">
                    <div className="panel-heading mt-3 mb-3">
                        <h4 className="panel-title">Grafica de Demanda Social</h4>
                    </div>
                    <div className="panel-body col-md-11 mr-md-auto ml-md-auto">
                        <CanvasJSChart options = {opciones} />
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