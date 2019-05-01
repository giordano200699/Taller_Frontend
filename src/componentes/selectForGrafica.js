import React, {Component} from 'react';

class SelectGrafica extends Component{

    constructor(props){
        super(props);
        this.state = {
            grafico : props.grafico,
            grad : props.grad,
            colores : props.colores
        };
    }

    render(){
        return(
            <div>
                <div className="form-group">
                    <label>Tipo de grafica:</label>
                    <select className="form-control" value={this.state.grafico} onChange={this.props.cambioGrafico}>
                        <option value="line">LINE</option>
                        <option value="area2d">AREA 2D</option>
                        <option value="column2d">BARRAS 2D</option>
                        <option value="column3d">BARRAS 3D</option>
                        <option value="pie2d">PIE 2D</option>
                        <option value="pie3d">PIE 3D</option>
                        <option value="doughnut2d">DONUT 2D</option>
                        <option value="doughnut2d">DONUT 3D</option>
                        <option value="pareto2d">PARETO 2D</option>
                        <option value="pareto3d">PARETO 3D</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Estilo de grafica:</label>
                    <select className="form-control" value={this.state.grad} onChange={this.props.cambioGrad}>
                        <option value="0">Solido</option>
                        <option value="1">Desvanecido</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Color de grafica:</label>
                    <select className="form-control" value={this.state.colores} onChange={this.props.cambioColores}>
                        <option value="">Colores 1</option>
                        <option value="FF5904,0372AB,FF0000,#1B5E20,#006064,#9b59b6,#008ee4,#B71C1C,#E65100,#004D40,#e44a00,#F57F17,#6baa01">Colores 2</option>
                        <option value="#000000">Blanco y negro</option>
                        <option value="#104865">StoneOcean theme</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default SelectGrafica;
