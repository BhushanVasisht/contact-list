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
                    return <th key={key}>{hd}</th>
                })}
                </tr>
            )
        else
            return <tbody>{this.state.data.map((data, key) => {
                return (
                    <tr key={key}>
                        <td>{data.fname}</td>
                        <td>{data.mname}</td>
                        <td>{data.lname}</td>
                        <td>
                            <div>
                                <table>
                                    <tbody className={"variable-table"}>
                                    {data.address.map((item, k) => {
                                        return (
                                            <tr key={k}>
                                                <th>{item.address_type}</th>
                                                <td>{item.street}, {item.city}, {item.state}-{item.zip}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </td>
                        <td>
                            <table className={"variable-table"}>
                                {data.phone.map((item, k) => {
                                    return (
                                        <tbody key={k}>
                                            <tr>
                                                <th>{item.phone_type}</th><td>{item.area_code}-{item.number}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </td>
                        <td>
                            <div>
                                <table>
                                    <tbody className={"variable-table"}>
                                    {data.dates.map((item, k) => {
                                        return (
                                            <tr key={k}>
                                                <th>{item.date_type}</th>
                                                <td><input readOnly={true} type={'date'} value={item.date} /></td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </td>
                        <td><button value={key} onClick={this.props.handleModifyContact}>Edit</button></td>
                        <td><button value={key} onClick={this.props.handleDelete}>Delete</button></td>
                    </tr>
                )
            })}
        </tbody>
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
