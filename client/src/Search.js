import React, {Component} from 'react';
import './DisplaySearch.css';
import SearchBar from "./SearchBar";
import DisplaySearch from "./DisplaySearch";
import axios from "axios";
import NavBar from "./NavBar";
import {Redirect} from "react-router-dom";

class Search extends Component {

    state = {
        data : null,
        search_state: false,
        search_text: '',
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
        await this.setState({search_text: '',search_state: false})

        await axios({
            method: 'get',
            url: this.state.base_url + 'search?key=' + text
        }).then(r => this.setState({search_text:text, data: r.data.data, search_state: true},
            () => {
            document.getElementById('clear-search').style.visibility = 'visible'
        }))
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
                window.location.reload(false)
            });
        }
    }

    handleClearSearch = async (e) => {
        e.preventDefault()
        e.target.style.visibility = 'hidden'
        await this.setState({search_text: '', search_state: false})
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
        else if(this.state.search_state)
        {
            if(this.state.data !== null && this.state.data !== undefined)
            {
                return (
                    <div>
                        <div className="App-header">
                            <header>
                                <h2>Contacts List</h2>
                            </header>
                            <NavBar />
                        </div>
                        <SearchBar text={this.state.search_text} handleAdd = {this.handleAdd} onFilterTextInput={this.onFilterTextInput} handleClearSearch={this.handleClearSearch}/>
                        <DisplaySearch data = {this.state.data} handleModifyContact={this.handleModifyContact} handleDelete={this.handleDelete}/>
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
                        <SearchBar text={this.state.search_text} handleAdd = {this.handleAdd} onFilterTextInput={this.onFilterTextInput} handleClearSearch={this.handleClearSearch}/>
                        <img className={'loading-gif'} src={'https://tinyurl.com/yyo3y8cn'} alt={'Loading data'} />
                    </div>
                );
            }
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
                </div>
            )
        }
    }
}

export default Search;
