import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import './App.css';
import SearchBar from "./SearchBar";
import ContactsTable from './ContactsTable';
import axios from "axios";
import NavBar from "./NavBar";

class App extends Component {

    state = {
        data : null,
        headers : null,
        base_url: 'http://localhost:3000/',
        redirect: undefined,
        page: '/'
    }

    constructor(props) {
        super(props);
        this.onFilterTextInput = this.onFilterTextInput.bind(this);
        this.handleModifyContact = this.handleModifyContact.bind(this);

        axios({
            method : 'get',
            url : this.state.base_url + 'all'
        }).then(res => {
            this.setState({data : res.data})
            this.setState({headers : res.data.data[0]})
        });
    }

    onFilterTextInput = (e) => {
        axios({
            method : 'get',
            url : this.state.base_url + 'contact?id=' + e
        }).then(res => {
            this.setState({data : res.data})
            this.setState({headers : res.data.data[0]})
        });
    }

    handleModifyContact = (e) => {
        this.setState({redirect : e.target.value, page : '/modify'})
    }

    render(){
        if(this.state.redirect !== undefined)
        {
            return <Redirect
                to={{
                    pathname: this.state.page,
                    state: { item: this.state.data.data[this.state.redirect] }
                }}
            />
        }
        else
        {
            return (
                <div>
                    <div className="App-header">
                        <header>
                            <h2>Contacts List</h2>
                        </header>
                        <NavBar />
                    </div>
                    <SearchBar handleAdd = {this.handleAdd} onFilterTextInput={this.onFilterTextInput}/>
                    <div>
                        <ContactsTable data = {this.state.data}headers={this.state.headers} handleModifyContact={this.handleModifyContact}/>
                    </div>
                </div>
            );
        }
  }
}

export default App;
