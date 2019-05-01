import React, { Component } from 'react';
import Popup from "reactjs-popup";
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

class ToolTipPositions extends Component{

    crearGroupCheckers(){
        const objs = [];
        for(var i in this.props.conceptsData){
            objs.push(<label align="center" key={i*2}><Checkbox value={this.props.conceptsData[i]["label"]}/> {this.props.conceptsData[i]["label"]} </label>);
            objs.push(<br key={i*2 + 1}></br>);
        }
        return objs;
    }

    render(){
        return(
            <div className="form-group">
                <Popup trigger={<button className="btn btn-info btn-block"><b>Escoger conceptos</b></button>} position="right top" on="hover">
                    <div className="form-group">
                        {this.props.todos===true ?
                            (<button className="btn btn-info btn-block" onClick={this.props.todosChanged}><b>Marcar todos</b></button>)
                            :((<button className="btn btn-info btn-block" onClick={this.props.ningunoChanged}><b>Desmarcar todos</b></button>))
                        }
                        <br></br>
                        <CheckboxGroup
                            checkboxDepth={2} // This is needed to optimize the checkbox group
                            name="conceptos"
                            value={this.props.conceptos}
                            onChange={this.props.conceptosChanged}
                        >
                            {this.crearGroupCheckers()}
                        </CheckboxGroup>
                    </div>
                </Popup>
            </div>
        );
    }
}

export default ToolTipPositions;
