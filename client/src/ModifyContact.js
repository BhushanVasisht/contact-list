import React, {Component} from "react";
import NavBar from "./NavBar";
import './ModifyContact.css';
import NewForm from "./NewForm";

class ModifyContact extends Component {

    render(){
        return(
            <div>
                <div className="App-header">
                    <header>
                        <h2>Contacts List</h2>
                    </header>
                    <NavBar />
                </div>
                <NewForm id={this.props === undefined || this.props.location === undefined || this.props.location.state === undefined || this.props.location.state.item === undefined || this.props.location.state.item.id === undefined ? undefined : this.props.location.state.item.id} />
            </div>
        );
    }
}

export default ModifyContact;
