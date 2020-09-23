import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import './ModifyContact.css';
import NewForm from "./NewForm";

class ModifyContact extends Component {
    state = {
        redirect: '/'
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
                <NewForm props={this.props}/>
            </div>
        );
    }
}

export default ModifyContact;
