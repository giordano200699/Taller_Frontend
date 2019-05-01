//imports de los componentes que se emplean en el modulo estadistico
import React, { Component } from 'react';
import './App.css';
import Chart from './componentes/chart.js'
import Fecha from './componentes/fecha.js'
import BtnExport from './componentes/btn-export';
import Tabla from './componentes/tabla';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import ToolTipPosition from "./componentes/ToolTipPositions";
import SelectGrafica from "./componentes/selectForGrafica";
import SelectYear from "./componentes/selectYear";
import SelectMonth from "./componentes/selectMonth";

class App extends Component {

    constructor(){//constructor inicial
        super();
        this.state = {
            isUsed:false, //usado para saber si las aplicacion es usada
            showPopover: false, //usado para mostrar o no el popup
            verdades : {}, //usado para  ver que conceptos estan sieno usados
            chartData : {}, //usado para dar datos al FusionChart (cuadro)
            isChartLoaded: false, //usado para mostrat el FusionChart
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
            listaConceptosEncontrados : "" //usado para saber que conceptos se encontraron en la consulta
        };
        //TODOS SON LOS BIND DE LAS FUNCIONES DE CHANGE...
        this.handleChangeFechaInicio = this.handleChangeFechaInicio.bind(this);
        this.handleChangeFechaFin = this.handleChangeFechaFin.bind(this);
        this.handleChangeGrafico = this.handleChangeGrafico.bind(this);
        this.handleChangeGrad = this.handleChangeGrad.bind(this);
        this.handleChangeAnio = this.handleChangeAnio.bind(this);
        this.handleChangeAnioIni = this.handleChangeAnioIni.bind(this);
        this.handleChangeAnioFin = this.handleChangeAnioFin.bind(this);
        this.handleChangeMesIni = this.handleChangeMesIni.bind(this);
        this.handleChangeMesFin = this.handleChangeMesFin.bind(this);
        this.handleChangeOpcion = this.handleChangeOpcion.bind(this);
        this.handleChangeColores = this.handleChangeColores.bind(this);
        this.handleChangeInfoType = this.handleChangeInfoType.bind(this);
        this.handleChangePrefijo = this.handleChangePrefijo.bind(this);
        this.handleChangeListaConceptos = this.handleChangeListaConceptos.bind(this);
        this.handleChangeIndexTab = this.handleChangeIndexTab.bind(this);
        this.updateVerdades = this.updateVerdades.bind(this);
        this.cambiarVerdades = this.cambiarVerdades.bind(this);
        this.revisarConceptos = this.revisarConceptos.bind(this);
        this.conceptosChanged = this.conceptosChanged.bind(this);
        this.ningunoChanged = this.ningunoChanged.bind(this);
        this.todosChanged = this.todosChanged.bind(this);
    }

    conceptosChanged = (newConceptos) => { // actualiza el atributo de la funcion
        this.setState({
            conceptos: newConceptos
        });
    }

    ningunoChanged = () => { // cambiar todos los checkboxes a desmarcados
        this.setState({
            conceptos: [],
            todos : true
        });
    }

    todosChanged = () => { //marcar todos los checkboxes
        this.setState({
            conceptos : this.state.todosConceptos,
            todos : false
        });
    }

    cambiarVerdades(vs){ // cambiar verdades usada dentro del updateVerdades
        this.setState({
            verdades: vs
        });
    }

    updateVerdades(n) { // cambiar verdades
        return event =>{
            let verdadesCopy = JSON.parse(JSON.stringify(this.state.verdades));
            verdadesCopy[n].value = !(verdadesCopy[n].value);
            this.cambiarVerdades(verdadesCopy);
        }
    }

    handleChangeIndexTab(index){
        this.setState({
            indextab : index
        });
    }

    handleChangeFechaInicio(date){  //cambiar fecha inicio solo si no es mayor que fecha final
        if(parseInt(date.unix(),0) > parseInt(this.state.fechaFin,0)){
            //console.log("1");
            this.setState({
                fechaInicio : this.state.fechaFin
            });
        }else{
            //console.log("2");
            this.setState({
                fechaInicio : date.unix()
            });
        }
    }

    handleChangeFechaFin(date){//cambiar fecha final solo si no es menor que fecha inicial
        if(parseInt(date.unix(),0) < parseInt(this.state.fechaInicio,0)){
            //console.log("1");
            this.setState({
                fechaFin : this.state.fechaInicio
            });
        }else{
            //console.log("2");
            this.setState({
                fechaFin : date.unix()
            });
        }
    }

    handleChangeGrafico(event) { // cambiar grafico
        this.setState({
            grafico: event.target.value
        });
    }

    handleChangeGrad(event) { // cambiar gradiente
        this.setState({
            grad: event.target.value
        });
    }

    handleChangeAnio(event) {  // cambiar año para los meses inicial y final
        this.setState({
            anio: event.target.value
        });
    }

    handleChangeMesIni(event) { // cambiar mes inicial si es uqe no es mayor a mes final
        //console.log("VALOR = " +event.target.value);
        if(parseInt(event.target.value,0) < parseInt(this.state.mesfin,0)){
            //console.log("1");
            this.setState({
                mesini: event.target.value
            });
        }else{
            //console.log("2");
            this.setState({
                mesini: this.state.mesfin
            });
        }
    }

    handleChangeMesFin(event) { // cambiar mes final si este no es menor a mes inicial
        //console.log("VALOR = " +event.target.value);
        if(parseInt(event.target.value,0) > parseInt(this.state.mesini,0)){
            //console.log("3");
            this.setState({
                mesfin: event.target.value
            });
        }else{
            //console.log("4");
            this.setState({
                mesfin: this.state.mesini
            });
        }
    }

    handleChangeAnioIni(event) { // cambiar año inicial solo si no es mayor a año final
        //console.log(event.target.value);
        if(parseInt(event.target.value,0) > parseInt(this.state.aniofin,0)){
            this.setState({
                anioini: this.state.aniofin
            });
        }else{
            this.setState({
                anioini: event.target.value
            });
        }
    }

    handleChangeAnioFin(event) {  // cambiar año final solo si este no es menor a año inicial
        //console.log(event.target.value);
        if(parseInt(event.target.value,0) < parseInt(this.state.anioini,0)){
            this.setState({
                aniofin: this.state.anioini
            });
        }else{
            this.setState({
                aniofin: event.target.value
            });
        }
    }

    handleChangeOpcion(event) { // cambiar opcion
        this.setState({
            opcion: event.target.value
        });
    }

    handleChangeColores(event) { // cambiar colores
        this.setState({
            colores: event.target.value
        });
    }

    handleChangeInfoType(event){ // cambiar tipo de informacion : importes o operaciones
        if(this.state.infoType === "operaciones"){
            this.setState({
                prefijo : "S/"
            })
        }else{
            this.setState({
                prefijo : ""
            })
        }
        this.setState({
            infoType : event.target.value
        });
    }

    handleChangePrefijo(event){ // cambiar prefijo : "S/." o ""
        this.setState({
            infoType : event.target.value
        });
    }

    handleChangeListaConceptos(event){ // cambiar listaConceptos
        this.setState({
            listaConceptos : event.target.value
        });
    }

    retornarMes(mes){ // retorna el mes escogido sea inicial o final usado para el subtitulo de numero -> a nombre del mes
        var cadenames = "";
        if(mes === "1"){
            cadenames = "ENERO";
        }
        else if(mes === "2"){
            cadenames = "FEBRERO";
        }
        else if(mes === "3"){
            cadenames = "MARZO";
        }
        else if(mes === "4"){
            cadenames = "ABRIL";
        }
        else if(mes === "5"){
            cadenames = "MAYO";
        }
        else if(mes === "6"){
            cadenames = "JUNIO";
        }
        else if(mes === "7"){
            cadenames = "JULIO";
        }
        else if(mes === "8"){
            cadenames = "AGOSTO";
        }
        else if(mes === "9"){
            cadenames = "SEPTIEMBRE";
        }
        else if(mes === "10"){
            cadenames = "OCTUBRE";
        }
        else if(mes === "11"){
            cadenames = "NOVIEMBRE";
        }
        else if(mes === "12"){
            cadenames = "DICIEMBRE";
        }
        return cadenames;
    }

    componentDidMount(){ // usado en react para montar todo antes del render

        const search = window.location.search.substring(1);
        var urlChart = 'https://back-estadisticas.herokuapp.com/apiController/importe?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin+'&conceptos='+this.state.listaConceptos;//pone el dominio para obtener la informacion del ChartFusion
        var urlTable = 'https://back-estadisticas.herokuapp.com/ApiController/tablaFechas/?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin+'&conceptos='+this.state.listaConceptos;//pone el dominio para obtener la informacion de la tabla
        var urlConceptos = 'https://back-estadisticas.herokuapp.com/apiController/listaConceptos';//pone el dominio para obtener la lista de los conceptos

        this.getConceptsData(encodeURI(urlConceptos));//hace el llamado al dominio donde retornara respuesta de la funcion
        this.getChartData(encodeURI(urlChart));//hace el llamado al dominio donde retornara respuesta de la funcion
        if(search !== ""){
            this.setState({
                usuario: JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) }).nombre
            }, function(){
                this.getTableData(encodeURI(urlTable));//hace el llamado al dominio donde retornara respuesta de la funcion
            });
        }
    }

    generarGrafica(listaFinal,anioinienc,aniofinenc){ // cambiar genera la grafica segun 1.Opcion 2.colores 3.tipo de grafica 4.filtros variados de datos (conceptos, fechas, meses , etc)
        //return event => (
        //console.log(this.state.listaConceptosEncontrados);
        //console.log(this.state.listaConceptosEncontrados.substring(0, this.state.listaConceptosEncontrados.length - 2));
        var urlChart = '';//pone el dominio vacio al comienzo para obtener la informacion del ChartFusion
        var urlTable = '';//pone el dominio vacion al comienzo para obtener la informacion del ChartFusion
        this.setState({
            isTableLoaded: false,
            isUsed: true,
            listaConceptosEncontrados : "",
            subtitulo : ""
        });
        var urlConceptos = 'https://back-estadisticas.herokuapp.com/apiController/listaConceptos';//pone el dominio para obtener la informacion de los conceptos
        if(this.state.opcion === 'fecha'){
            urlTable = 'https://back-estadisticas.herokuapp.com/ApiController/tablaFechas/?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin+'&conceptos='+listaFinal;//pone el dominio para obtener la informacion de las tablas
            if(this.state.infoType === "operaciones"){
                urlChart = 'https://back-estadisticas.herokuapp.com/apiController/?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin+'&conceptos='+listaFinal;//pone el dominio para obtener la informacion del ChartFusion
                var fi = new Date(this.state.fechaInicio*1000);
                var ff = new Date(this.state.fechaFin*1000);
                this.setState({
                    isChartLoaded : false,
                    titulo: 'REPORTE ESTADISTICO POR NUMERO DE OPERACIONES'
                });
                this.getChartData(encodeURI(urlChart));//hace el llamado al dominio donde retornara respuesta de la funcion
                this.setState({
                    subtitulo : (("DEL "+
                    (fi.getUTCDate()<=9 ? ("0"+fi.getUTCDate()) : (fi.getUTCDate()))
                    +"/"+(fi.getUTCDate()<=8 ? ("0"+(fi.getUTCMonth()+1)) : (fi.getUTCMonth()+1))
                    +"/"+fi.getUTCFullYear()
                    +" AL "+
                    (ff.getUTCDate()<=9 ? ("0"+ff.getUTCDate()) : (ff.getUTCDate()))
                    +"/"+(ff.getUTCDate()<=8 ? ("0"+(ff.getUTCMonth()+1)) : (ff.getUTCMonth()+1))
                    +"/"+ff.getUTCFullYear()) +  "<br/> CONCEPTOS : " + this.state.listaConceptosEncontrados.substring(0, this.state.listaConceptosEncontrados.length - 2))
                });
            }
            else{
                urlChart = 'https://back-estadisticas.herokuapp.com/apiController/importe?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin+'&conceptos='+listaFinal;//pone el dominio para obtener la informacion del ChartFusion
                fi = new Date(this.state.fechaInicio*1000);
                ff = new Date(this.state.fechaFin*1000);
                this.setState({
                    isChartLoaded : false,
                    titulo: 'REPORTE ESTADISTICO POR NUMERO DE IMPORTES'
                });
                this.getChartData(encodeURI(urlChart));//hace el llamado al dominio donde retornara respuesta de la funcion
                this.setState({
                    subtitulo : (("DEL "+
                    (fi.getUTCDate()<=9 ? ("0"+fi.getUTCDate()) : (fi.getUTCDate()))
                    +"/"+(fi.getUTCDate()<=8 ? ("0"+(fi.getUTCMonth()+1)) : (fi.getUTCMonth()+1))
                    +"/"+fi.getUTCFullYear()
                    +" AL "+
                    (ff.getUTCDate()<=9 ? ("0"+ff.getUTCDate()) : (ff.getUTCDate()))
                    +"/"+(ff.getUTCDate()<=8 ? ("0"+(ff.getUTCMonth()+1)) : (ff.getUTCMonth()+1))
                    +"/"+ff.getUTCFullYear()) +  "<br/> CONCEPTOS : " + this.state.listaConceptosEncontrados.substring(0, this.state.listaConceptosEncontrados.length - 2))
                });
            }
        }
        else if(this.state.opcion === 'months'){
            urlTable = 'https://back-estadisticas.herokuapp.com/ApiController/tablaMonth/?year='+this.state.anio+'&mes_inicio='+this.state.mesini+'&mes_fin='+this.state.mesfin+'&conceptos='+listaFinal;//pone el dominio para obtener la informacion de la tabla
            if(this.state.infoType === "operaciones"){
                urlChart = 'https://back-estadisticas.herokuapp.com/apiController/cantidadPorPeriodoMes?year='+this.state.anio+'&mes_inicio='+this.state.mesini+'&mes_fin='+this.state.mesfin+'&conceptos='+listaFinal;//pone el dominio para obtener la informacion del ChartFusion
                this.setState({
                    isChartLoaded : false,
                    titulo: 'REPORTE ESTADISTICO POR NUMERO DE OPERACIONES'
                });
                this.getChartData(encodeURI(urlChart));//hace el llamado al dominio donde retornara respuesta de la funcion
                if(this.state.mesini === this.state.mesfin){
                    this.setState({
                        subtitulo : ( ( this.retornarMes(this.state.mesini) + " DEL " + this.state.anio ) /*+"<br/> CONCEPTOS : " + this.state.listaConceptosEncontrados.substring(0, this.state.listaConceptosEncontrados.length - 2)*/)
                    });
                }else{
                    this.setState({
                        subtitulo : ( ( this.retornarMes(this.state.mesini) + ' A ' + this.retornarMes(this.state.mesfin) + " DEL " + this.state.anio ) /*+"<br/> CONCEPTOS : " + this.state.listaConceptosEncontrados.substring(0, this.state.listaConceptosEncontrados.length - 2)*/)
                    });
                }
            }
            else{
                urlChart = 'https://back-estadisticas.herokuapp.com/apiController/totalPorPeriodoMes/?year='+this.state.anio+'&mes_inicio='+this.state.mesini+'&mes_fin='+this.state.mesfin+'&conceptos='+listaFinal;//pone el dominio para obtener la informacion del ChartFusion
                this.setState({
                    isChartLoaded : false,
                    titulo: 'REPORTE ESTADISTICO POR IMPORTES'
                });
                this.getChartData(encodeURI(urlChart));//hace el llamado al dominio donde retornara respuesta de la funcion
                if(this.state.mesini === this.state.mesfin){
                    this.setState({
                        subtitulo : ( ( this.retornarMes(this.state.mesini) + " DEL " + this.state.anio ) /*+"<br/> CONCEPTOS : " + this.state.listaConceptosEncontrados.substring(0, this.state.listaConceptosEncontrados.length - 2)*/)
                    });
                }else{
                    this.setState({
                        subtitulo : ( ( this.retornarMes(this.state.mesini) + ' A ' + this.retornarMes(this.state.mesfin) + " DEL " + this.state.anio ) /*+"<br/> CONCEPTOS : " + this.state.listaConceptosEncontrados.substring(0, this.state.listaConceptosEncontrados.length - 2)*/)
                    });
                }
            }
        }else{
            urlTable = 'https://back-estadisticas.herokuapp.com/ApiController/tablaYear/?year_inicio='+this.state.anioini+'&year_fin='+this.state.aniofin+'&conceptos='+listaFinal;//pone el dominio para obtener la informacion de la tabla
            if(this.state.infoType === "operaciones"){
                urlChart = 'https://back-estadisticas.herokuapp.com/apiController/cantidadPorPeriodoAnio?year_inicio='+this.state.anioini+'&year_fin='+this.state.aniofin+'&conceptos='+listaFinal;//pone el dominio para obtener la informacion del ChartFusion
                this.setState({
                    isChartLoaded : false,
                    titulo: 'REPORTE ESTADISTICO POR NUMERO DE OPERACIONES'
                });
                this.getChartData(encodeURI(urlChart));//hace el llamado al dominio donde retornara respuesta de la funcion
                if(this.state.anioini === this.state.aniofin){
                    this.setState({
                        subtitulo : (("EN EL AÑO " + this.state.anioini) /*+  "<br/> CONCEPTOS : " + this.state.listaConceptosEncontrados.substring(0, this.state.listaConceptosEncontrados.length - 2)*/)
                    });
                }else{
                    this.setState({
                        subtitulo : (("DEL AÑO " +
                        this.state.anioini
                        + " AL " +
                        this.state.aniofin ) /*+  "<br/> CONCEPTOS : " + this.state.listaConceptosEncontrados.substring(0, this.state.listaConceptosEncontrados.length - 2)*/)
                    });
                }
            }
            else{
                urlChart = 'https://back-estadisticas.herokuapp.com/apiController/montoPorPeriodoAnio/?year_inicio='+this.state.anioini+'&year_fin='+this.state.aniofin+'&conceptos='+listaFinal;//pone el dominio para obtener la informacion del ChartFusion
                this.setState({
                    isChartLoaded : false,
                    titulo: 'REPORTE ESTADISTICO POR IMPORTES'
                });
                this.getChartData(encodeURI(urlChart));//hace el llamado al dominio donde retornara respuesta de la funcion
                if(this.state.anioini === this.state.aniofin){
                    this.setState({
                        subtitulo : (("EN EL AÑO " + this.state.anioini) /*+  "<br/> CONCEPTOS : " + this.state.listaConceptosEncontrados.substring(0, this.state.listaConceptosEncontrados.length - 2)*/)
                    });
                }else{
                    this.setState({
                        subtitulo : (("DEL AÑO " +
                        this.state.anioini
                        + " AL " +
                        this.state.aniofin ) /*+  "<br/> CONCEPTOS : " + this.state.listaConceptosEncontrados.substring(0, this.state.listaConceptosEncontrados.length - 2)*/)
                    });
                }
            }
        }
        this.getTableData(encodeURI(urlTable));//hace el llamado al dominio donde retornara respuesta de la funcion
        this.getConceptsData(encodeURI(urlConceptos));//hace el llamado al dominio donde retornara respuesta de la funcion//);
    }

    getChartData(urlChart){ // obtiene la data del chartData haciendo fetch al URL que se mande (donde se contiene la funcion a usarse)
        fetch(urlChart)//hace el llamado al dominio que se le envió donde retornara respuesta de la funcion
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{
            result['datasets'][0]['backgroundColor'] = 'rgba(54, 162, 235, 0.6)';

            const chartData1=[];

            for(var i in result.labels)
            {
                this.setState({
                    listaConceptosEncontrados : (this.state.listaConceptosEncontrados + result['labels'][i]+", ")
                })
              chartData1.push({
                label: result['labels'][i],
                value: result['datasets'][0]['data'][i]
              });
            }

            this.setState({
                chartData : chartData1 ,
                isChartLoaded : true
            });
        })
    }

    revisarConceptos(){ // genera los conceptos escogidos en los checkboxes en un String
        var lista = "";
        for(var i in this.state.conceptos){
            lista = lista + this.state.conceptos[i] + "|";
        }
        lista = lista.substring(0,(lista.length - 1));
        return lista;

    }


    getConceptsData(urlConcepts){ // obtiene los conceptos de la misma forma que el chartData ahora para los conceptsData. pone isConceptsLoaded->true renderizando el componente otra vez
        fetch(urlConcepts)//hace el llamado al dominio enviado como parámetro donde retornara respuesta de la funcion
        .then((response)=>{
            return response.json();
        })
        .then((result)=>{

            var conceptsData1=[];
            var verdaux1=[];
            var conceptosaux=[];

            for(var i in result.conceptos)
            {
                conceptsData1.push({id : i,label: result['conceptos'][i]});
                verdaux1.push({id : i,value : this.state.todos});
                conceptosaux.push(result['conceptos'][i]);
            }
            this.setState({
                conceptsData : conceptsData1,
                verdades : verdaux1,
                isConceptsLoaded : true,
                todosConceptos : conceptosaux
            });

        })
    }

    getTableData(urlTable) {// obtiene los datos para la tabla de la misma forma que el chartData ahora para los tableData. pone isTableLoaded->true renderizando el componente otra vez
        fetch(urlTable)//hace el llamado al dominio enviado como parámetro donde retornara respuesta de la funcion
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                this.setState({
                    tableData: result,
                    isTableLoaded: true
                });
            })
    }

    onClickPreventDefault(e) {
        e.preventDefault();
    }


    submitDatesFunction(){ //
        var fi = new Date(this.state.fechaInicio*1000);
        var ff = new Date(this.state.fechaFin*1000);
        this.setState({
            isChartLoaded : false,
            isTableLoaded : false,
            titulo : ("IMPORTES POR CONCEPTO DEL "+
            (fi.getUTCDate()<=9 ? ("0"+fi.getUTCDate()) : (fi.getUTCDate()))
            +"/"+(fi.getUTCDate()<=8 ? ("0"+(fi.getUTCMonth()+1)) : (fi.getUTCMonth()+1))
            +"/"+fi.getUTCFullYear()
            +" AL "+
            (ff.getUTCDate()<=9 ? ("0"+ff.getUTCDate()) : (ff.getUTCDate()))
            +"/"+(ff.getUTCDate()<=8 ? ("0"+(ff.getUTCMonth()+1)) : (ff.getUTCMonth()+1))
            +"/"+ff.getUTCFullYear())
        });
        this.getChartData('https://back-estadisticas.herokuapp.com/apiController/importe/?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin);//hace el llamado al dominio donde retornara respuesta de la funcion
        this.getTableData('https://back-estadisticas.herokuapp.com/ApiController/tablaFechas/?inicio='+this.state.fechaInicio+'&fin='+this.state.fechaFin);//hace el llamado al dominio donde retornara respuesta de la funcion
    }

    submitYearFunction(){
        this.setState({
            isChartLoaded : false,
            isTableLoaded : false,
            titulo : ("IMPORTES DE LOS MESES DEL AÑO " + this.state.anio)
        });
        this.getChartData('https://back-estadisticas.herokuapp.com/apiController/devolverAnioImporte/?year='+this.state.anio);//hace el llamado al dominio donde retornara respuesta de la funcion
        this.getTableData('https://back-estadisticas.herokuapp.com/ApiController/tablaYear/?year='+this.state.anio);//hace el llamado al dominio donde retornara respuesta de la funcion
    }

    render() { // render  del modulo estadistico

        const op = this.state.opcion;
        const listaFinal = this.revisarConceptos();
        //console.log(this.state.listaConceptosEncontrados);
        return (
            <div style={{
                position: 'relative'
            }}>
            <div className="App">
                <section>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="panel col-md-2">
                                <Tabs align="center" defaultActiveKey={this.state.indextab} onSelect={(index, label) => console.log(label + ' selected')}>
                                    <Tab label="Datos">
                                        <div className="example-warper">
                                        <form className="opciones-formulario" onSubmit={this.onClickPreventDefault}>
                                            <div className="form-group">
                                                {this.state.isConceptsLoaded ?
                                                    (<ToolTipPosition
                                                        conceptsData={this.state.conceptsData}
                                                        verdades={this.state.verdades}
                                                        todos={this.state.todos}
                                                        updateVerdades={this.updateVerdades}
                                                        conceptos={this.state.conceptos}
                                                        conceptosChanged={this.conceptosChanged}
                                                        todosChanged={this.todosChanged}
                                                        ningunoChanged={this.ningunoChanged}
                                                    />)
                                                    :(<button className="btn btn-info btn-block" disabled>Escoger conceptos</button>)}
                                            </div>
                                            <div className="form-group">
                                                <label>Filtro:</label>
                                                <select className="form-control" value={this.state.opcion} onChange={this.handleChangeOpcion}>
                                                    <option value="fecha">FECHA A FECHA</option>
                                                    <option value="months">MES A MES</option>
                                                    <option value="years">AÑO A AÑO</option>
                                                </select>
                                            </div>
                                            <hr></hr>
                                            {op === 'fecha' ? (
                                                <div>
                                                    <div className="form-group">
                                                        <label>Fecha inicial:</label>
                                                        <Fecha startDate={this.state.fechaInicio} formato="DD/MM/YYYY" handleChange={this.handleChangeFechaInicio}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Fecha final:</label>
                                                        <Fecha startDate={this.state.fechaFin} formato="DD/MM/YYYY" handleChange={this.handleChangeFechaFin}/>
                                                    </div>
                                                </div>
                                            ):(null)}

                                            {op === 'months' ? (
                                                <div>
                                                    <div className="form-group">
                                                        <SelectYear titulo="Año a buscar:" anio={this.state.anio} cambiar={this.handleChangeAnio} />
                                                    </div>
                                                    <div className="form-group">
                                                        <SelectMonth titulo="Mes inicial:" mes={this.state.mesini} cambiar={this.handleChangeMesIni} />
                                                    </div>
                                                    <div className="form-group">
                                                        <SelectMonth titulo="Mes final:" mes={this.state.mesfin} cambiar={this.handleChangeMesFin} />
                                                    </div>
                                                </div>
                                            ) : (null)}

                                            {op === 'years' ? (
                                                <div>
                                                    <div className="form-group">
                                                        <SelectYear titulo="Año inicial:" anio={this.state.anioini} cambiar={this.handleChangeAnioIni} />
                                                    </div>
                                                    <div className="form-group">
                                                        <SelectYear titulo="Año final:" anio={this.state.aniofin} cambiar={this.handleChangeAnioFin} />
                                                    </div>
                                                </div>
                                            ) : (null)}
                                            <div className="form-group">
                                                <label>Tipo de datos:</label>
                                                <select className="form-control" value={this.state.infoType} onChange={this.handleChangeInfoType}>
                                                    <option value="importes">Importes</option>
                                                    <option value="operaciones">Numero de operaciones</option>
                                                </select>
                                            </div>
                                        </form>
                                        </div>
                                    </Tab>
                                    <Tab label="Grafica">
                                        <div className="example-warper">
                                            <form className="opciones-formulario" onSubmit={this.onClickPreventDefault}>
                                                <SelectGrafica grafico={this.state.grafico} grad={this.state.grad} colores={this.state.colores} cambioGrafico={this.handleChangeGrafico} cambioGrad={this.handleChangeGrad} cambioColores={this.handleChangeColores}/>
                                            </form>
                                        </div>
                                    </Tab>
                                </Tabs>

                                <br></br>
                                <form className="opciones-formulario" onSubmit={this.onClickPreventDefault}>
                                    <div className="form-group">
                                        {this.state.isConceptsLoaded === true ? (<button type="submit" onClick={this.generarGrafica.bind(this,listaFinal)} className="btn btn-success btn-block"><b>Generar grafica</b></button>):(<button className="btn btn-success btn-block" disabled ><b>Generar grafica</b></button>)}
                                    </div>
                                    <div className="form-group">
                                        {this.state.isTableLoaded ? (<BtnExport tableData={this.state.tableData} tableTitle={this.state.titulo} tableSubtitle={this.state.subtitulo} usuario={this.state.usuario}/>) : (<button className="btn btn-warning btn-block" disabled><b>Imprimir</b></button>)}
                                    </div>
                                </form>
                            </div>
                            <div className="tablero col-md-10" id="estadisticas">
                                <div className="form-group">
                                    <Tabs align="center" onSelect={(index, label) => console.log(label + ' selected')}>
                                        <Tab label="Grafica">
                                            {(this.state.isChartLoaded && this.state.isUsed) ?
                                                (<Chart
                                                    chartData={this.state.chartData}
                                                    grafico={this.state.grafico}
                                                    legendPosition="bottom"
                                                    titulo={this.state.titulo}
                                                    paleta={this.state.colores}
                                                    grad={this.state.grad}
                                                    prefijo={this.state.prefijo}
                                                    subtitulo={this.state.subtitulo}/>):(null)
                                            }
                                            {(!this.state.isChartLoaded && this.state.isUsed)?
                                                (<div className="App-logo"><br></br><br></br><br></br><br></br>
                                                                        <br></br><br></br><br></br><br></br>
                                                                        <br></br><br></br><br></br><br></br>
                                                                        <h4>Cargando grafica . . .</h4></div>):(null)
                                            }
                                            {(!this.state.isChartLoaded && !this.state.isUsed)?
                                                (null):(null)
                                            }
                                        </Tab>
                                        <Tab label="Tabla">
                                            {(this.state.isTableLoaded && this.state.isUsed) ?
                                                (<Tabla
                                                    tableData={this.state.tableData} />)
                                                :(null)
                                            }
                                            {(!this.state.isTableLoaded && this.state.isUsed)?
                                                (<div className="App-logo"><br></br><br></br><br></br><br></br>
                                                                            <br></br><br></br><br></br><br></br>
                                                                            <br></br><br></br><br></br><br></br>
                                                                            <h4>Cargando tabla . . .</h4></div>):(null)
                                            }
                                            {(!this.state.isTableLoaded && !this.state.isUsed)?
                                                (null):(null)
                                            }
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </div>
        );
    }
}

export default App;
