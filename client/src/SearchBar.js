import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {

    state = {
        filterText: ''
    }

    constructor(props) {
        super(props);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleFilterChange(e) {
        e.preventDefault()
        this.setState({filterText : e.target.value})
    }

    handleClick(e) {
        e.preventDefault()
        this.props.onFilterTextInput(this.state.filterText)
    }

    render() {
        return (
            <div>
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search"
                    onChange={this.handleFilterChange}
                />
                <button onClick={this.handleClick} className={"submit-search"}>Search</button>
                <button id={"clear-search"} onClick={this.props.handleClearSearch}>Clear</button>
            </div>
        );
    }
}

export default SearchBar;
