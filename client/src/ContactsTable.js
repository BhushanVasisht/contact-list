import React, {Component} from 'react';
import './ContactsTable.css';

class ContactsTable extends Component {
    state = {
        data : null,
        headers : ['No.','First Name', 'Middle Name', 'Last Name', 'Telephone Numbers', 'Addresses', 'Important Dates', 'Edit', 'Delete']
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
            return <tbody>{this.state.data.map((data, key) => {
                return (
                    <tr key={key}>
                        <td>{count++}</td>
                        <td>{data.fname}</td>
                        <td>{data.mname}</td>
                        <td>{data.lname}</td>
                        <td>
                            <table className={"variable-table"}>
                                {data.phone_list.map((item, k) => {
                                    return (
                                        <tbody key={k}>
                                        <tr>
                                            <th>{item.phone_type}</th>
                                            <td>{item.area_code}-{item.number}</td>
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
                                    {data.address_list.map((item, k) => {
                                        return (
                                            <tr key={k}>
                                                <th>{item.address_type}</th>
                                                <td>{item.address}, {item.city}, {item.state}{item.zip !== '' ? '-' + item.zip : ''}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </td>

                        <td>
                            <div>
                                <table>
                                    <tbody className={"variable-table"}>
                                    {data.date_list.map((item, k) => {
                                        return (
                                            <tr key={k}>
                                                <th>{item.date_type}</th>
                                                <td><input readOnly={true} type={'date'} value={item.date}/></td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </td>
                        <td>
                            <button value={key} onClick={this.props.handleModifyContact}>Edit</button>
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

export default ContactsTable;
