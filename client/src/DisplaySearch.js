import React, {Component} from 'react';
import './ContactsTable.css';

class DisplaySearch extends Component {
    state = {
        data : null,
        headers : ['Sl.No','Result']
    }

    constructor(props) {
        super(props);
        this.state.data = props.data
    }

    getRowsData = (type) => {
        if(type === 'h')
        {
            return (
                <tr>{this.state.headers.map( (hd,k) => {
                    return <th key={k}>{hd}</th>
                })}
                </tr>
            )
        }
        else {
            let count = 1;
            return <tbody>{this.state.data === undefined ? <tr></tr>: this.state.data.map((data, key) => {
                return (
                    <tr key={key}>
                        <td>{count++}</td>
                        <td>{data.name}</td>
                        <td>
                            <button value={data.contact_id} onClick={this.props.handleModifyContact}>Edit</button>
                        </td>
                        <td>
                            <button value={data.contact_id} onClick={this.props.handleDelete}>Delete</button>
                        </td>
                    </tr>
                )
            })}
            </tbody>
        }
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

export default DisplaySearch;
