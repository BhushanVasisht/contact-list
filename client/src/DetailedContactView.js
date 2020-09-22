import React, {Component} from 'react';

class DetailedContactView extends Component {
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
            return (
                <tr key={this.state.data.key}>
                    <td>{this.state.data.name}</td>
                    <td>{this.state.data.phone}</td>
                    <td>{this.state.data.email}</td>
                    <td>{this.state.data.address.map((item, k) => {
                        return (
                            <ul key={k}>
                                <li>
                                    <p>{item.type}: {item.add}</p>
                                </li>
                            </ul>
                        )
                    })}</td>
                    <td><button value={this.state.data.key} onClick={this.props.handleModifyContact}>Edit</button></td>
                    <td><button value={this.state.data.key} onClick={this.props.handleDelete}>Delete</button></td>
                </tr>
            )

    }

    render(){
        return (
            <table className="contacts-display">
                <thead>{this.getRowsData('h')}</thead>
                <tbody>{this.getRowsData('b')}</tbody>
            </table>
        );
    }
}

export default DetailedContactView;
