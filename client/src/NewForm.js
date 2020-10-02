import React, { Component } from 'react';
import './NewForm.css';

class NewForm extends Component{

    state = {
        data: undefined,
        form_data: {
            fname: '',
            mname: '',
            lname: '',
            address_list: [],
            phone_list: [],
            date_list: []
        }
    }

    constructor(props) {
        super(props);

        this.handleMoreComponents = this.handleMoreComponents.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.props !== undefined)
        {
            this.setState({data : this.props.props.location.state.item.data, form_data : this.props.props.location.state.item.data})
        }
    }

    handleMoreComponents = (e) => {
        console.log(e.target.value)
    }

    handleSubmit = (e) => {
        alert('Data Submitted')
    }

    render() {
        console.log(this.state.data)
        return(
            <div className={"contact-form"}>
                <h2 hidden={this.props.props !== undefined}>Add New Contact</h2>
                <form id={'contact-details'} onSubmit={this.handleSubmit}>
                    <table className={'form-table'}>
                        <tbody>
                            <tr>
                                <th><label>First Name</label></th><td><input required value={this.state.data === undefined || this.state.data.fname === undefined ? '' : this.state.data.fname} name="fname" type={'text'} /></td>
                            </tr>
                            <tr>
                                <th><label>Middle Name</label></th><td><input value={this.state.data === undefined || this.state.data.mname === undefined ? '' : this.state.data.mname} name="mname" type={'text'} /></td>
                            </tr>
                            <tr>
                                <th><label>Last Name</label></th><td><input required value={this.state.data === undefined || this.state.data.lname === undefined ? '' : this.state.data.lname} name="lname" type={'text'} /></td>
                            </tr>
                            <tr>
                                <th><label>Address List</label></th>
                                <td><button value={'address'} onClick={this.handleMoreComponents}>+AddMore</button></td>
                            </tr>
                            <tr>
                                <th> </th>
                                <td>
                                    <div>
                                        <table className={'internal-address-table'}>
                                            {
                                                this.state.data !== undefined ?
                                                    this.state.data.address_list.map((item, key) => {
                                                        return (
                                                            <tbody key={key}>
                                                                <tr>
                                                                    <th><label>Address Type</label></th>
                                                                    <td><input required value={item.address_type} name="address_type"
                                                                               type={'text'}/></td>
                                                                </tr>
                                                                <tr>
                                                                    <th><label>Street Address</label></th>
                                                                    <td><input required value={item.address} name="street" type={'text'}/></td>
                                                                </tr>
                                                                <tr>
                                                                    <th><label>City</label></th>
                                                                    <td><input required value={item.city} name="city" type={'text'}/></td>
                                                                </tr>
                                                                <tr>
                                                                    <th><label>State</label></th>
                                                                    <td><input required value={item.state} name="state" type={'text'}/></td>
                                                                </tr>
                                                                <tr>
                                                                    <th><label>Zip</label></th>
                                                                    <td><input value={item.zip} name="zip" type={'text'}/></td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    })
                                                    :

                                                    <tbody>
                                                        <tr>
                                                            <th><label>Address Type</label></th>
                                                            <td><input required name="address_type" type={'text'}/></td>
                                                        </tr>
                                                        <tr>
                                                            <th><label>Street Address</label></th>
                                                            <td><input required name="street" type={'text'}/></td>
                                                        </tr>
                                                        <tr>
                                                            <th><label>City</label></th>
                                                            <td><input required name="city" type={'text'}/></td>
                                                        </tr>
                                                        <tr>
                                                            <th><label>State</label></th>
                                                            <td><input required name="state" type={'text'}/></td>
                                                        </tr>
                                                        <tr>
                                                            <th><label>Zip</label></th>
                                                            <td><input name="zip" type={'text'}/></td>
                                                        </tr>
                                                    </tbody>
                                            }
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><label>Phone List</label></th>
                                <td><button value={'phone'}onClick={this.handleMoreComponents}>+AddMore</button></td>
                            </tr>
                            <tr>
                                <th> </th>
                                <td>
                                    <div>
                                        <table className={'internal-phone-table'}>
                                            {
                                                this.state.data !== undefined ?
                                                    this.state.data.phone_list.map((item, key) => {
                                                        return (
                                                            <tbody key={key}>
                                                                <tr>
                                                                    <th><label>Phone Type</label></th>
                                                                    <td><input required value={item.phone_type} name="phone_type"
                                                                               type={'text'}/></td>
                                                                </tr>
                                                                <tr>
                                                                    <th><label>Area Code</label></th>
                                                                    <td><input required value={item.area_code} name="area_code" type={'text'}/>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th><label>Number</label></th>
                                                                    <td><input required value={item.number} name="number" type={'text'}/>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    })
                                                    :

                                                    <tbody>
                                                        <tr>
                                                            <th><label>Phone Type</label></th>
                                                            <td><input required name="phone_type"
                                                                       type={'text'}/></td>
                                                        </tr>
                                                        <tr>
                                                            <th><label>Area Code</label></th>
                                                            <td><input required name="area_code" type={'text'}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th><label>Number</label></th>
                                                            <td><input required name="number" type={'text'}/>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                            }
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th><label>Date List</label></th>
                                <td><button value={'date'} onClick={this.handleMoreComponents}>+AddMore</button></td>
                            </tr>
                            <tr>
                                <th> </th>
                                <td>
                                    <div>
                                        <table className={'internal-date-table'}>
                                            {
                                                this.state.data !== undefined ?
                                                    this.state.data.date_list.map((item, key) => {
                                                        return (
                                                            <tbody key={key}>
                                                                <tr>
                                                                    <th><label>Date Type</label></th>
                                                                    <td><input value={item.date_type} name="date_type"
                                                                               type={'text'}/></td>
                                                                </tr>
                                                                <tr>
                                                                    <th><label>Calender Date</label></th>
                                                                    <td><input value={item.date} name="date" type={'date'}/>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        )
                                                    })
                                                    :

                                                    <tbody>
                                                        <tr>
                                                            <th><label>Date Type</label></th>
                                                            <td><input name="date_type" type={'text'}/></td>
                                                        </tr>
                                                        <tr>
                                                            <th><label>Calender Date</label></th>
                                                            <td><input name="date" type={'date'}/></td>
                                                        </tr>
                                                    </tbody>
                                            }
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <input type={'submit'} value={'Save Form'}/>
                </form>
            </div>
        );
    }
}

export default NewForm;
