import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {

    state = {
        filterText: ''
    }

    constructor(props) {
        super(props);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFilterChange(e) {
        this.setState({filterText : e.target.value})
    }

    handleSubmit(e) {
        console.log(this.state.filterText)
        this.props.onFilterTextInput(this.state.filterText)
    }

    render() {
        return (
            <div>
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search"
                    value={this.state.filterText}
                    onChange={this.handleFilterChange}
                />
                <button onClick={this.handleSubmit} className={"submit-search"}>Search</button>
            </div>
        );
    }
}

export default SearchBar;
