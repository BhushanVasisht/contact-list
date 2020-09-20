import React, {Component} from 'react';
import './App.css';
import SearchBar from "./SearchBar";
import ContactsTable from './ContactsTable';
import axios from "axios";
import NavBar from "./NavBar";

class App extends Component {

    state = {
        data : null,
        headers : null,
        base_url: 'http://localhost:3000/'
    }

    constructor(props) {
        super(props);
        this.onFilterTextInput = this.onFilterTextInput.bind(this);

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

    handleAdd = () => {

    }

    render(){
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
                    <ContactsTable /*data = {this.state.data}headers={this.state.headers}*/ />
                </div>
            </div>
        );
  }
}

export default App;
