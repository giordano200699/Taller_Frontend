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
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
        fetch('http://tallerbackend.herokuapp.com/ApiController/listaConceptos?fecha_inicio='+this.state.anioini+'&fecha_fin='+this.state.aniofin)//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
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

        fetch('http://tallerbackend.herokuapp.com/ApiController/demandaSocial?fecha_inicio='+this.state.anioini+'&fecha_fin='+this.state.aniofin)//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{
            //result = JSON.parse(result);

            console.log(result);
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
                //leyenda += "<tr><td>"+ i;
                //sigla = i;
                
                /*if(sigla == 'ASTI') leyenda += ": AUDITORIA Y SEGURIDAD DE TECNOLOGIA DE INFORMACION</td>";
                switch(sigla){
                    case "ASTI": leyenda += ": AUDITORIA Y SEGURIDAD DE TECNOLOGIA DE INFORMACION</td>";
                        break;
                    case 'DISI': leyenda += ": </td>";
                        break;
                    case 'GIC': leyenda += ": </td>";
                        break;
                    case 'GPTI': leyenda += ": </td>";
                        break;
                    case 'GTI': leyenda += ": </td>";
                        break;
                    case 'GTIC': leyenda += ": </td>";
                        break;
                    case 'ISW': leyenda += ": Ingeniería de Software</td>";
                        break;
                }
                */

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
               //"</tr>";
            }
            cadena = cadena + "<tr><td><H6><b>Total General</b></H6></td>";
            for(var i in totalA){
                cadena = cadena+"<td><H6><b>"+totalA[i]+"</b></H6></td>";
            }
            cadena = cadena + "<td><H6><b>"+totalTotal+"</b></H6></td>";

            leyenda += "<h6><tr><td>ASTI: AUDITORIA Y SEGURIDAD DE TECNOLOGIA DE INFORMACION</td></h6>";
            leyenda += "<h6><tr><td>DISI: DOCTORADO EN INGENIERIA DE SISTEMAS E INFORMATICA</td></h6>";
            leyenda += "<h6><tr><td>GIC: GESTION DE LA INFORMACION Y DEL CONOCIMIENTO</td></h6>";
            leyenda += "<h6><tr><td>GPTI: GERENCIA DE PROYECTOS DE TECNOLOGIA DE INFORMACION</td></h6>";
            leyenda += "<h6><tr><td>GTI: GOBIERNO DE TECNOLOGIAS DE INFORMACION</td></h6>";
            leyenda += "<h6><tr><td>GTIC: GESTION DE TECNOLOGIA DE INFORMACION Y COMUNICACIONES</td></h6>";
            leyenda += "<h6><tr><td>ISW: INGENIERIA DE SOFTWARE</td></h6>";

            this.setState({
                miHtml: cadena,
                cadenaAnios:cadenaAnios,
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
        
        return (
            
            <div id="contenido">  
            <Tabs align="center" >
                <Tab label="Tabla">
                    <div className="panel row align-items-center" style={{paddingLeft:70}}>
                        <div className="panel-heading mt-3 mb-3">
                            <h5 style={{marginBottom:15}}>LEYENDA:</h5>
                            <h5 style={{marginBottom:15}}> {Parser(this.state.miLeyenda)} </h5>
                            <h4 className="panel-title">Tabla de Datos - Demanda Social del {this.props.anioIni} al {this.props.anioFin}</h4>
                        </div>                    
                        <table className="table table-bordered table-striped col-md-11 mr-md-auto" >
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
                <Tab label="Grafico" >
                <div className="panel row align-items-center">
                    <div className="panel-heading mt-3 mb-3" >
                        <h2 style={{marginLeft:60}} className="panel-title">Gráfica de Demanda Social</h2>
                    </div>
                    <div className="panel-body col-md-11 mr-md-auto ml-md-auto">
                        <CanvasJSChart options = {(this.state.isChartLoaded) ? this.state.data : (null)} />
                    </div>           
                </div>
                </Tab>
                <Tab label="Visualizar PDF" >
                <div className="panel row align-items-center" >
                    <div className="panel-heading mt-3 mb-3">
                        <h4 style={{marginLeft:60}} className="panel-title">Visualizar PDF</h4>
                    </div>
                    <div className="panel-body col-md-11 mr-md-auto ml-md-auto">
                        {/* <CanvasJSChart options = {(this.state.isChartLoaded) ? this.state.data : (null)} /> */}
                        {/* <PDFViewer backend={WebviewerBackend} src='/myPDF.pdf'></PDFViewer> */}
                        {this.state.cargoImagen&&this.state.cargoImagen2?<Pdf imagen={this.state.imagen} imagen2={this.state.imagen2}></Pdf>:null}
                        
                    </div>           
                </div>
                </Tab>

            </Tabs>
            <div style={this.state.esVisible?null:{display:'none'}}>
                <div className="panel row align-items-center" id="tabla" style={{paddingLeft:70}}>
                        <div className="panel-heading mt-3 mb-3">
                            <h5 style={{marginBottom:15}}>LEYENDA:</h5>
                            <h5 style={{marginBottom:15}}> {Parser(this.state.miLeyenda)} </h5>
                            <h4 className="panel-title">Tabla de Datos - Demanda Social del {this.props.anioIni} al {this.props.anioFin}</h4>
                        </div>                    
                        <table className="table table-bordered table-striped col-md-11 mr-md-auto" >
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

                <div className="panel row align-items-center"  id="graficax">
                    <div className="panel-heading mt-3 mb-3" >
                        <h2 style={{marginLeft:60}} className="panel-title">Gráfica de Demanda Social</h2>
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
