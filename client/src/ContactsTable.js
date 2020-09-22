import React, {Component} from 'react';
import './ContactsTable.css';

class ContactsTable extends Component {
    state = {
        data : null,
        headers : null
    }

    constructor(props) {
        super(props);

        this.state.data = props.data
        this.state.headers = props.headers
    }

    getRowsData = (type) => {
        if(type === 'h')
            return (
                <tr>{this.state.headers.map((hd, key) => {
                    return (
                        <th key={key}>{hd}</th>
                    )
                })}
                </tr>
            )
        else
            return <tbody>{this.state.data.map((data, key) => {
                return (
                    <tr key={key}>
                        <td>{data.name}</td>
                        <td>{data.phone}</td>
                        <td>{data.email}</td>
                        <td><button value={key} onClick={this.props.handleModifyContact}>Edit</button></td>
                    </tr>
                )
            })}</tbody>

    }

    render(){
        return (
            <table className="contacts-display">
                <thead>{this.getRowsData('h')}</thead>
                {this.getRowsData('b')}
            </table>
        );
    }
}

export default ContactsTable;
