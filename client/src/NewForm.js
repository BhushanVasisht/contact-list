import React, { Component } from 'react';

class NewForm extends Component{

    render() {
        return(
            <div className={"contact-form"}>
                {console.log(this.props)}
                <h2 hidden={this.props.data === undefined}>Add New Contact</h2>
            </div>
        );
    }
}

export default NewForm;
