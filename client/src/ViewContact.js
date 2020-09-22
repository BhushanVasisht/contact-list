import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import DetailedContactView from "./DetailedContactView";

class ViewContact extends Component{
    state = {
        redirect: '/',
        data: undefined,
        headers: undefined
    }

    constructor(props) {
        super(props);
        this.state.data = this.props.location.state.item.data
        this.state.headers = this.props.location.state.item.headers
    }

    render(){
        if(this.props === undefined || this.props.location === undefined || this.props.location.state === undefined || this.props.location.state.item === undefined)
        {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <div>
                <div className="App-header">
                    <header>
                        <h2>Contacts List</h2>
                    </header>
                    <NavBar />
                </div>
                <div>
                    <DetailedContactView data = {this.state.data} headers={this.state.headers} handleModifyContact={this.props.handleModifyContact}/>
                </div>
            </div>
        );
    }
}

export default ViewContact;
