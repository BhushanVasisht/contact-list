import React, {Component} from 'react';
import NavBar from "./NavBar";
import NewForm from "./NewForm";

class NewContactApp extends Component {

    render(){
        return (
            <div>
                <div className="App-header">
                    <header>
                        <h2>Contacts List</h2>
                    </header>
                    <NavBar />
                </div>
                <div>
                    <NewForm />
                </div>
            </div>
        );
    }
}

export default NewContactApp;
