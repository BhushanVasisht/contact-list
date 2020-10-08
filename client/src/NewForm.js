import React, { Component } from 'react';
import './NewForm.css';
import axios from 'axios';

class NewForm extends Component{

    state = {
        data: [],
        base_url: 'http://localhost:3000/',
        contact_id: -1,
        fname: '',
        mname: '',
        lname: '',
        address_list: [],
        phone_list: [],
        date_list: []
    }

    constructor(props) {
        super(props);

        this.handleMoreComponents = this.handleMoreComponents.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdits = this.handleEdits.bind(this);
        this.deleteFields = this.deleteFields.bind(this);
    }

    componentDidMount() {
        if(this.props.id !== undefined)
        {
            axios({
                    method: 'get',
                    url: this.state.base_url + 'contact?contact_id=' + this.props.id
                }).then(r => {
                    let d = r.data.data
                    this.setState({data: d, contact_id: d.contact_id, fname:d.fname, mname: d.mname, lname: d.lname, address_list: d.address_list, phone_list: d.phone_list, date_list: d.date_list})
                })
        }
    }

    handleEdits = (e) => {
        e.preventDefault();

        if(e.target.className === 'fname')
        {
            this.setState({fname: e.target.value})
        }
        else if(e.target.className === 'mname')
        {
            this.setState({mname: e.target.value})
        }
        else if(e.target.className === 'lname')
        {
            this.setState({lname: e.target.value})
        }
        else if(e.target.className === 'address_type')
        {
            let atemp = this.state.address_list
            atemp[parseInt(e.target.id)].address_type = e.target.value

            this.setState({address_list: atemp })
        }
        else if(e.target.className === 'address')
        {
            let atemp = this.state.address_list
            atemp[parseInt(e.target.id)].address = e.target.value

            this.setState({address_list: atemp })
        }
        else if(e.target.className === 'city')
        {
            let atemp = this.state.address_list
            atemp[parseInt(e.target.id)].city = e.target.value

            this.setState({address_list: atemp })
        }
        else if(e.target.className === 'state')
        {
            let atemp = this.state.address_list
            atemp[parseInt(e.target.id)].state = e.target.value

            this.setState({address_list: atemp })
        }
        else if(e.target.className === 'zip')
        {
            let atemp = this.state.address_list
            atemp[parseInt(e.target.id)].zip = e.target.value

            this.setState({address_list: atemp })
        }
        else if(e.target.className === "phone_type")
        {
            let ptemp = this.state.phone_list
            ptemp[parseInt(e.target.id)].phone_type = e.target.value

            this.setState({phone_list: ptemp })
        }
        else if(e.target.className === "area_code")
        {
            let ptemp = this.state.phone_list
            ptemp[parseInt(e.target.id)].area_code = parseInt(e.target.value)

            this.setState({phone_list: ptemp })
        }
        else if(e.target.className === "number"){
            let ptemp = this.state.phone_list
            ptemp[parseInt(e.target.id)].number = e.target.value

            this.setState({phone_list: ptemp })
        }
        else if(e.target.className === "date_type")
        {
            let dtemp = this.state.date_list
            dtemp[parseInt(e.target.id)].date_type = e.target.value

            this.setState({date_list: dtemp })
        }
        else if(e.target.className === "date")
        {
            let dtemp = this.state.date_list
            dtemp[parseInt(e.target.id)].date = e.target.value

            this.setState({date_list: dtemp })
        }
    }

    handleMoreComponents = async (e) => {
        e.preventDefault();
        const target = e.target.id

        if(target === "address")
        {
            if(this.state.address_list.length === 0)
            {
                let atemp = []
                await atemp.push({
                    address_id: -1,
                    address_type: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: ''
                })

                this.setState({address_list: atemp})
            }
            else
            {
                let atemp = this.state.address_list
                await atemp.push({
                    address_id: -1,
                    address_type: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: ''
                })

                this.setState({address_list: atemp})
            }
        }
        else if(target === "phone")
        {
            if(this.state.phone_list.length === 0)
            {
                let ptemp = []
                await ptemp.push({
                    phone_id: -1,
                    phone_type: '',
                    area_code: '',
                    number: ''
                })

                this.setState({phone_list: ptemp})
            }
            else
            {
                let ptemp = this.state.phone_list
                await ptemp.push({
                    phone_id: -1,
                    phone_type: '',
                    area_code: '',
                    number: ''
                })

                this.setState({phone_list: ptemp})
            }
        }
        else if(target === "date")
        {
            if(this.state.date_list.length === 0)
            {
                let dtemp = []
                await dtemp.push({
                    date_id: -1,
                    date_type: '',
                    date: ''
                })

                this.setState({date_list: dtemp})
            }
            else
            {
                let dtemp = this.state.date_list
                await dtemp.push({
                    date_id: -1,
                    date_type: '',
                    date: ''
                })

                this.setState({date_list: dtemp})
            }
        }
    }

    deleteFields = (e) => {
        e.preventDefault();

        let id = e.target.id
        if(id === "address")
        {
            let atemp = []

            for(let i = 0; i < this.state.address_list.length; ++i) {
                if (i !== parseInt(e.target.value))
                    atemp.push(this.state.address_list[i])
            }

            this.setState({address_list: atemp})
        }
        else if(id === "phone")
        {
            let ptemp = []

            for(let i = 0; i < this.state.phone_list.length; ++i) {
                if (i !== parseInt(e.target.value))
                    ptemp.push(this.state.phone_list[i])
            }

            this.setState({phone_list: ptemp})
        }
        else if(id === "date")
        {
            let dtemp = []

            for(let i = 0; i < this.state.date_list.length; ++i) {
                if (i !== parseInt(e.target.value))
                    dtemp.push(this.state.date_list[i])
            }

            this.setState({date_list: dtemp})
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        await axios({
            method: 'post',
            url: this.state.base_url + 'addNew',
            data: {
                contact_id: this.state.contact_id,
                fname: this.state.fname,
                mname: this.state.mname,
                lname: this.state.lname,
                address_list: this.state.address_list,
                phone_list: this.state.phone_list,
                date_list: this.state.date_list
            }
        }).then(r => alert("Data submitted"))
    }

    render() {
        return(
            <div className={"contact-form"}>
                <h2>Add New Contact</h2>
                <form>
                    <table className={'form-table'}>
                        <tbody>
                            <tr>
                                <th><label>First Name</label></th><td><input onChange={this.handleEdits} required value={this.state.fname === undefined ? '' : this.state.fname} className={"fname"} type={'text'} /></td>
                            </tr>
                            <tr>
                                <th><label>Middle Name</label></th><td><input onChange={this.handleEdits} value={this.state.mname === undefined ? '' : this.state.mname} className="mname" type={'text'} /></td>
                            </tr>
                            <tr>
                                <th><label>Last Name</label></th><td><input onChange={this.handleEdits} required value={this.state.lname === undefined ? '' : this.state.lname} className="lname" type={'text'} /></td>
                            </tr>
                            <tr>
                                <th><label>Address List</label></th>
                                <td><button id={'address'} onClick={this.handleMoreComponents}>+AddMore</button></td>
                            </tr>
                            <tr>{this.state.address_list !== undefined ?
                                <td>
                                    <table className={'internal-address-table'}>
                                        {
                                            this.state.address_list.map((item, key) => {
                                                return (
                                                    <tbody id={"new-address-body"} key={key}>
                                                    <tr>
                                                        <th><label>Address Type</label></th>
                                                        <td><input onChange={this.handleEdits} required value={item.address_type} className={'address_type'} id={key}
                                                                   type={'text'}/></td>
                                                    </tr>
                                                    <tr>
                                                        <th><label>Street Address</label></th>
                                                        <td><input onChange={this.handleEdits} required value={item.address} className={'address'} id={key} type={'text'}/></td>
                                                    </tr>
                                                    <tr>
                                                        <th><label>City</label></th>
                                                        <td><input onChange={this.handleEdits} required value={item.city} className={'city'} id={key} type={'text'}/></td>
                                                    </tr>
                                                    <tr>
                                                        <th><label>State</label></th>
                                                        <td><input onChange={this.handleEdits} required value={item.state} className={'state'} id={key} type={'text'}/></td>
                                                    </tr>
                                                    <tr>
                                                        <th><label>Zip</label></th>
                                                        <td><input onChange={this.handleEdits} value={item.zip} className={'zip'} id={key} type={'text'}/></td>
                                                    </tr>
                                                    <tr>
                                                        <td><button onChange={this.handleEdits} value={key} id={'address'} onClick={this.deleteFields}>Delete</button></td>
                                                    </tr>
                                                    </tbody>
                                                )
                                            })
                                        }
                                    </table>
                                </td>
                                :
                                <td/>
                            }
                            </tr>
                            <tr>
                                <th><label>Phone List</label></th>
                                <td><button id={'phone'} onClick={this.handleMoreComponents}>+AddMore</button></td>
                            </tr>
                            <tr>{this.state.phone_list !== undefined ?
                                <td>
                                    <table className={'internal-phone-table'}>
                                        {this.state.phone_list.map((item, key) => {
                                            return (
                                                <tbody key={key}>
                                                    <tr>
                                                        <th><label>Phone Type</label></th>
                                                        <td><input onChange={this.handleEdits} required value={item.phone_type} className={'phone_type'} id={key}
                                                                   type={'text'}/></td>
                                                    </tr>
                                                    <tr>
                                                        <th><label>Area Code</label></th>
                                                        <td><input onChange={this.handleEdits} required value={item.area_code} className={'area_code'} id={key} type={'text'}/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th><label>Number</label></th>
                                                        <td><input onChange={this.handleEdits} required value={item.number} className={'number'} id={key} type={'text'}/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><button value={key} id={'phone'} onClick={this.deleteFields}>Delete</button></td>
                                                    </tr>
                                                </tbody>
                                            )})
                                        }
                                    </table>
                                </td>
                                :
                                <td/>
                            }
                            </tr>

                            <tr>
                                <th><label>Date List</label></th>
                                <td><button id={'date'} onClick={this.handleMoreComponents}>+AddMore</button></td>
                            </tr>

                            <tr>
                                {this.state.date_list !== undefined ?
                                    <td>
                                        <table className={'internal-date-table'}>
                                            {this.state.date_list.map((item, key) => {
                                                return (
                                                    <tbody key={key}>
                                                    <tr>
                                                        <th><label>Date Type</label></th>
                                                        <td><input onChange={this.handleEdits} value={item.date_type} className="date_type" id={key}
                                                                   type={'text'}/></td>
                                                    </tr>
                                                    <tr>
                                                        <th><label>Calender Date</label></th>
                                                        <td><input onChange={this.handleEdits} value={item.date} className="date" id={key} type={'date'}/>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><button value={key} id={'date'} onClick={this.deleteFields}>Delete</button></td>
                                                    </tr>
                                                    </tbody>
                                                )
                                            })}
                                        </table>
                                    </td>
                                    :
                                    <td/>
                                }
                            </tr>
                        </tbody>
                    </table>
                    <input type={'submit'} onClick={this.handleSubmit} value={'Save'}/>
                </form>
            </div>
        );
    }
}

export default NewForm;
