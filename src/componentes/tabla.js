import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class Tabla extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "tableData": props.tableData
        };
    }

    render(){
        return(
            <BootstrapTable data={this.state.tableData} pagination options={{ noDataText: 'No hay informacion para mostar' }}>
                <TableHeaderColumn width="150" dataField='concepto' isKey>Concepto</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='importe'>Importe</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='codigoalumno'>Codigo</TableHeaderColumn>
                <TableHeaderColumn width="300" dataField='nombrealumno'>Alumno</TableHeaderColumn>
                <TableHeaderColumn width="150" dataField='fecha'>Fecha</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default Tabla;
