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
        page: '/',
        rerender: false
    }

    constructor(props) {
        super(props);
        this.onFilterTextInput = this.onFilterTextInput.bind(this);
        this.handleModifyContact = this.handleModifyContact.bind(this);
    }

    componentDidMount() {
        axios({
            method : 'get',
            url : this.state.base_url + 'all'
        }).then(res => {
            this.setState({data : res.data.data, headers : res.data.headers})
        })
    }

    onFilterTextInput = (e) => {
        axios({
            method : 'get',
            url : this.state.base_url + 'contact?id=' + e
        }).then(res => {
            this.setState({data : res.data.data, headers : res.data.headers})
        });
    }

    handleModifyContact = (e) => {
        this.setState({redirect : parseInt(e.target.value), page : '/modify'})
    }

    handleDelete = (e) => {
        let cfrm = window.confirm("Press a button!")
        if(cfrm)
            this.setState({rerender : true})
    }

    render(){
        if(this.state.redirect !== undefined)
        {
            return <Redirect
                to={{
                    pathname: this.state.page,
                    state: { item: {
                            data : this.state.data[this.state.redirect],
                            headers : this.state.headers
                        }}
                }}
            />
        }
        else
        {
            if(this.state.data !== null && this.state.headers != null)
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
                        <ContactsTable data = {this.state.data} headers={this.state.headers} handleModifyContact={this.handleModifyContact}/>
                    </div>
                );
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
                        <p>Loading...</p>
                    </div>
                );
            }
        }
  }
}

export default App;
