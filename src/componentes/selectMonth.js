import React, {Component} from 'react';

class SelectMonth extends Component{

    constructor(props){
        super(props);
        this.state = {
            titulo : props.titulo
        };
    }

    render(){
        return(
            <div className="form-group">
                <label>{this.state.titulo}</label>
                <select className="form-control" value={this.props.mes} onChange={this.props.cambiar}>
                    <option value='1'>Enero</option>
                    <option value='2'>Febrero</option>
                    <option value='3'>Marzo</option>
                    <option value='4'>Abril</option>
                    <option value='5'>Mayo</option>
                    <option value='6'>Junio</option>
                    <option value='7'>Julio</option>
                    <option value='8'>Agosto</option>
                    <option value='9'>Septiembre</option>
                    <option value='10'>Octubre</option>
                    <option value='11'>Noviembre</option>
                    <option value='12'>Diciembre</option>
                </select>
            </div>
        )
    }
}

export default SelectMonth;
