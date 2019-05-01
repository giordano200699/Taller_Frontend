import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Fecha extends Component{
    constructor(props){
        super(props);
        this.state = {
            dateFormat : props.formato,
            className : "form-control"
        };
    }

    render(){
        return (
            <DatePicker
                selected={moment.unix(this.props.startDate).utc()}
                onChange={this.props.handleChange}
                dateFormat={this.state.dateFormat}
                className={this.state.className}
            />
        )

    }
}

export default Fecha;
