import React, {Component} from 'react';
import './ContactsTable.css';

class ContactsTable extends Component {
    state = {
        data: [
            {key: 1, name: 'Tom Jackson', phone: '555-444-333', email: 'tom@gmail.com'},
            {key: 2, name: 'Mike James', phone: '555-777-888', email: 'mikejames@gmail.com'},
            {key: 3, name: 'Janet Larson', phone: '555-222-111', email: 'janetlarson@gmail.com'},
            {key: 4, name: 'Clark Thompson', phone: '555-444-333', email: 'clark123@gmail.com'},
            {key: 5,name: 'Emma Page', phone: '555-444-333', email: 'emma1page@gmail.com'},
        ],
        headers: null
    }

    // constructor(props) {
    //     super(props);
    //     this.state.headers = props.headers;
    //     //this.state.data = props.data;
    // }

    getRowsData = (type) => {
        if(type === 'h')
            this.state.data.map( (elm, idx) => {
                return (
                    <tr>
                        <td>{this.state.data[0]['name']}</td>
                        <td>{this.state.data[0]['phone']}</td>
                    </tr>
                )
            })
        else
            return (<tr>
                <td>{this.state.data[3]['name']}</td>
                <td>{this.state.data[3]['phone']}</td>
            </tr>)
    }

    render(){
        return (
            <table className="contact-table">
                <thead>
                {this.getRowsData('h')}
                </thead>
                <tbody>
                {this.getRowsData('b')}
                </tbody>
            </table>
        );
    }
}

export default ContactsTable;
