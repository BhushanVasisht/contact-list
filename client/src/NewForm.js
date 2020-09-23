import React, { Component } from 'react';

class NewForm extends Component{

    state = {
        data: undefined
    }

    constructor(props) {
        super(props);

        if(props.props !== undefined)
            this.state.data = this.props.props.location.state.item.data
    }

    render() {
        return(
            <div className={"contact-form"}>
                <h2 hidden={this.props.props !== undefined}>Add New Contact</h2>
                <form>
                    <label>FirstName:</label><input type={'text'} />
                </form>
            </div>
        );
    }
}

export default NewForm;
