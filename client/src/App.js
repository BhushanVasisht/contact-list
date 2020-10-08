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
        base_url: 'http://localhost:3000/',
        redirect: undefined,
        page: '/'
    }

    constructor(props) {
        super(props);
        this.onFilterTextInput = this.onFilterTextInput.bind(this);
        this.handleModifyContact = this.handleModifyContact.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
    }

    componentDidMount() {
        axios({
            method : 'get',
            url : this.state.base_url + 'all'
        }).then(res => {
            this.setState({data : res.data.data})
        })
    }

    onFilterTextInput = async (text) => {
        await axios({
            method: 'get',
            url: this.state.base_url + 'search?key=' + text
        }).then(r => this.setState({data: r.data.data},
            () => document.getElementById('clear-search').style.visibility = 'visible'
        ))
    }

    handleModifyContact = (e) => {
        e.preventDefault()
        this.setState({redirect : parseInt(e.target.value), page : '/modify'})
    }

    handleDelete = async (e) => {
        e.preventDefault()
        if(window.confirm("Are you sure??"))
        {
            await axios({
                method : 'put',
                url : this.state.base_url + 'delete?contact_id=' + parseInt(e.target.value)
            }).then(r => {
                axios({
                    method : 'get',
                    url : this.state.base_url + 'all'
                }).then(res => {
                    this.setState({data : res.data.data}, async ()=> {
                        await window.location.reload(false)
                        alert('Entry Deleted')
                    })
                })
            });
        }
    }

    handleClearSearch = (e) => {
        e.preventDefault()
        e.target.style.visibility = 'hidden'
        window.location.reload(false)
    }

    render(){
        if(this.state.redirect !== undefined)
        {
            return <Redirect
                to={{
                    pathname: this.state.page,
                    state: { item: {
                            id: this.state.redirect
                        }}
                }}
            />
        }
        else
        {
            if(this.state.data !== null)
            {
                return (
                    <div>
                        <div className="App-header">
                            <header>
                                <h2>Contacts List</h2>
                            </header>
                            <NavBar />
                        </div>
                        <SearchBar handleAdd = {this.handleAdd} onFilterTextInput={this.onFilterTextInput} handleClearSearch={this.handleClearSearch}/>
                        <ContactsTable data = {this.state.data} handleModifyContact={this.handleModifyContact} handleDelete={this.handleDelete}/>
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
                        <SearchBar handleAdd = {this.handleAdd} onFilterTextInput={this.onFilterTextInput} handleClearSearch={this.handleClearSearch}/>
                        <img className={'loading-gif'} src={'https://tinyurl.com/yyo3y8cn'} alt={'Loading data'} />
                    </div>
                );
            }
        }
  }
}

export default App;
