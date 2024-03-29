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
import Pdf from '../Pdf/pdf';
import PDFViewer from '../Pdf/PDFViewer';
import PDFJs from '../Pdf/backends/pdfjs';
import WebviewerBackend from '../Pdf/backends/webviewer';
import html2canvas from 'html2canvas';
import { Font } from '@react-pdf/renderer';
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

//var pdf = require('html-pdf');


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
            tablaFooter:'',
            miLeyenda: '',
            data2: {},
            cadenaAnios:'',
            imagen: null,
            cargoImagen:false,
            imagen2:null,
            cargoImagen2:false,
            key:"1",
            esVisible:false
        };
        this.miFuncion = this.miFuncion.bind(this);
        this.miFuncion();


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
            var miContador = this.state.anioini;
            var resultado =[];
           for (let fila of result) {
                console.log(fila);
                fila.name=''+miContador;
                fila.showInLegend=true;
                miContador++;
                resultado.push
            }

            console.log(result);

            this.setState({
                isChartLoaded : true,
                data: {
                    title: {
                        text: "Demanda Social"
                    },
                    data: result
                }
            });

            const input2 = document.getElementById('graficax');
            html2canvas(input2)
            .then((canvas2) => {
                const imgData2 = canvas2.toDataURL('image/png');
                this.setState({
                    imagen2 : imgData2,
                    cargoImagen2:true
                },()=>{
                    this.setState({
                        esVisible:false
                    });
                });
                
                
            });
        })

        //fetch('http://tallerbackend.herokuapp.com/ApiController/demandaSocial?fecha_inicio='+this.state.anioini+'&fecha_fin='+this.state.aniofin)//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
        fetch('http://localhost/Taller_Backend/ApiController/demandaSocial?fecha_inicio='+this.state.anioini+'&fecha_fin='+this.state.aniofin)//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{
            //result = JSON.parse(result);

            //console.log(result);
            let cadena="";
            let leyenda = "";
            let cadenaFooter = "";
            var totalD=0;
            var totalA = [];
            var bandera = false;
            var totalTotal = 0;
            var cadenaAnios = '';

            for(var i=parseInt(this.state.anioini);i<=parseInt(this.state.aniofin);i++){
                cadenaAnios += '<th><b>'+i+'</b></th>';
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
               cadena = cadena + "<td>"+totalD+"</td>";
               totalTotal= totalTotal + totalD;
            }
            //cadena = cadena + "<tfoot><tr><td><b>Total General</b></td>";
            cadenaFooter = cadenaFooter + "<tr><td><b>Total General</b></td>";
            for(var i in totalA){
                //cadena = cadena+"<td><b>"+totalA[i]+"</b></td>";
                cadenaFooter = cadenaFooter + "<td><b>"+totalA[i]+"</b></td>";
            }
            //cadena = cadena + "<td><b>"+totalTotal+"</b></td></tfoot>";
            cadenaFooter = cadenaFooter +  "<td><b>"+totalTotal+"</b></td>";
            
            leyenda += "<b>- DISI: </b>" + "DOCTORADO EN INGENIERIA DE SISTEMAS E INFOMARTICA</br>";
            leyenda += "<b>- GTIC: </b>" + "GESTION DE TECNOLOGIA DE INFORMACION Y COMUNICACIONES</br>";
            leyenda += "<b>- ISW: </b>" + "INGENIERIA DE SOFTWARE</br>";
            leyenda += "<b>- GIC: </b>" + "GESTION DE LA INFORMACION Y DEL CONOCIMIENTO</br>";
            leyenda += "<b>- GTI: </b>" + "GOBIERNO DE TECNOLOGIAS DE INFORMACION</br>";
            leyenda += "<b>- GPTI: </b>" + "GERENCIA DE PROYECTOS DE TECNOLOGIA DE INFORMACION</br>";
            leyenda += "<b>- ASTI: </b>" + "AUDITORIA Y SEGURIDAD DE TECNOLOGIA DE INFORMACION</br>";
            leyenda += "<b>- GPGE: </b>" + "GESTION PUBLICA Y GOBIERNO ELECTRONICO</br>";
            leyenda += "<b>- DGTI: </b>" + "DIRECCION Y GESTION EN TECNOLOGIA DE INFORMACION</br>";
            leyenda += "<b>- SATD: </b>" + "SISTEMA DE APOYO A LA TOMA DE DECISIONES</br>";

            this.setState({
                miHtml: cadena,
                cadenaAnios:cadenaAnios,
                tablaFooter: cadenaFooter,
                miLeyenda: leyenda,
                esVisible:true
            });
            const input = document.getElementById('tabla');
            
            html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                this.setState({
                    imagen : imgData,
                    cargoImagen:true
                });
                
                
            });
            
            
        })

        /*fetch('http://localhost/Taller_Backend/ApiController/leyendaDemanda') //hace el llamado a la leyenda de demanda social
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{
            //result = JSON.parse(result);

            //console.log(result);
            let leyenda="";
            let banderita;
            for(var i in result) {
                
                leyenda +="- <b>";
                banderita = true;
                for(var j in result[i]){
                    leyenda += result[i][j] + "</b>";
                    if(banderita)
                        leyenda += ": ";
                    banderita = false;
                }
                leyenda += ".<br>"
            }
            
            leyenda += "";
            this.setState({
                miLeyenda: leyenda
            });
            
        })*/

    }



    render() {
        if(this.props.anioFin!=this.state.aniofin || this.props.anioIni!=this.state.anioini){
            this.setState({
                aniofin: this.props.anioFin,
                anioini: this.props.anioIni
            },() => {
                this.miFuncion();
                const input = document.getElementById('tabla');
                html2canvas(input)
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');

                    this.setState({
                        imagen : imgData,
                        cargoImagen:true
                    });
                    
                });
                // const input2 = document.getElementById('graficax');
                // html2canvas(input2)
                //     .then((canvas2) => {
                //         const imgData2 = canvas2.toDataURL('image/png');

                //         this.setState({
                //             imagen2 : imgData2,
                //             cargoImagen2:true
                //         });
                        
                // });
            });
            //this.miFuncion();
        }

        const aI = this.props.anioIni;
        const aF = this.props.anioFin;
        
        return (
            
            <div id="contenido">  
            <Tabs align="center" >
                <Tab label="Tabla">
                    <div className="panel row align-items-center" style={{paddingLeft:70}}>
                        <div className="panel-heading mt-3 mb-3">
                            <h5 className="titulo">LEYENDA:</h5>
                            <h6>{Parser(this.state.miLeyenda)}</h6>
                            <hr></hr>
                            {aI == aF ? (<h4 className="titulo">Tabla de Datos - Demanda Social del año {this.props.anioIni}</h4>) : 
                            (<h4 className="titulo">Tabla de Datos - Demanda Social del {this.props.anioIni} al {this.props.anioFin}</h4>)}
                        </div>                    
                        <table className="table table-bordered table-striped col-md-11 mr-md-auto greenTable" >
                            <thead>
                                <tr>
                                    <th><b>Etiquetas</b></th>
                                    {Parser(this.state.cadenaAnios)} 
                                    <th><b>Total General</b></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Parser(this.state.miHtml)}                                  
                            </tbody>
                            <tfoot>
                                {Parser(this.state.tablaFooter)}                                  
                            </tfoot>
                        </table>
                    </div>
                </Tab>
                <Tab label="Grafico" >
                <div className="panel row align-items-center">
                    <div className="panel-heading mt-3 mb-3" >
                        <h2 style={{marginLeft:60}} className="titulo">Gráfica de Demanda Social</h2>
                    </div>
                    <div className="panel-body col-md-11 mr-md-auto ml-md-auto ">
                        <CanvasJSChart options = {(this.state.isChartLoaded) ? this.state.data : (null)} />
                    </div>           
                </div>
                </Tab>
                <Tab label="Visualizar PDF" >
                <div className="panel row align-items-center" >
                    <div className="panel-heading mt-3 mb-3">
                        <h4 style={{marginLeft:60}} className="titulo">Visualizar PDF</h4>
                    </div>
                    <div className="panel-body col-md-11 mr-md-auto ml-md-auto">
                        {/* <CanvasJSChart options = {opciones} /> */}
                        {/* <CanvasJSChart options = {(this.state.isChartLoaded) ? this.state.data : (null)} /> */}
                        {/* <PDFViewer backend={WebviewerBackend} src='/myPDF.pdf'></PDFViewer> */}
                        {this.state.cargoImagen&&this.state.cargoImagen2?<Pdf imagen={this.state.imagen} imagen2={this.state.imagen2}></Pdf>:null}
                        
                    </div>           
                </div>
                </Tab>

            </Tabs>








            <div style={this.state.esVisible?null:{display:'none'}}>
                
                <div className="panel row align-items-center" id="tabla" style={{paddingLeft:70}}>
                <img src='logoPdf.png' style={{width:1100,height:150}}/>
                        <div className="panel-heading mt-3 mb-3">
                            <h5 className="titulo">LEYENDA: {Parser(this.state.miLeyenda)} </h5>
                            <hr></hr>
                            {aI == aF ? (<h4 className="titulo">Tabla de Datos - Demanda Social del año {this.props.anioIni}</h4>) : 
                            (<h4 className="titulo">Tabla de Datos - Demanda Social del {this.props.anioIni} al {this.props.anioFin}</h4>)}
                        </div>                     
                        <table className="table table-bordered table-striped col-md-11 mr-md-auto greenTable" >
                            <thead>
                                <tr>
                                    <th><b>Etiquetas</b></th>
                                    {Parser(this.state.cadenaAnios)} 
                                    <th><b>Total General</b></th>
                                </tr>
                            </thead>
                            <tbody>
                                {Parser(this.state.miHtml)}                                  
                            </tbody>
                            <tfoot>
                                {Parser(this.state.tablaFooter)}                                  
                            </tfoot>
                        </table>
                </div>

                <div className="panel row align-items-center"  id="graficax">
                    <div className="panel-heading mt-3 mb-3">
                        <h4 style={{marginLeft:60}} className="titulo">Visualizar PDF</h4>
                    </div>
                    <div className="panel-body col-md-11 mr-md-auto ml-md-auto">
                        <CanvasJSChart options = {(this.state.isChartLoaded) ? this.state.data : (null)} />
                    </div>           
                </div>
            </div>
            {/*<p>DISI: Doctorado en Ingeniería de Sistemas e Informática </p>*/}
        </div>
        );
    }
}
export default DemandaSocial;
