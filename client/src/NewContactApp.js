import React, {Component} from 'react';
import NavBar from "./NavBar";


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
                    <p>Here i will add a form</p>
                </div>
            </div>
        );
    }
}

export default NewContactApp;
