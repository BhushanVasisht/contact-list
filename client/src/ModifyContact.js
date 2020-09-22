import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import './ModifyContact.css';

class ModifyContact extends  Component {
    state = {
        redirect: '/',
        direct: undefined
    }

    constructor(props) {
        super(props);

        if (window.performance) {
            if (performance.navigation.type === 1) {
                this.state.direct = true
            } else {
                this.state.direct = false
            }
        }
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
                <p>Test</p>
            </div>
        );
    }
}

export default ModifyContact;
