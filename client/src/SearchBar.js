import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component {

    state = {
        filterText: ''
    }

    constructor(props) {
        super(props);

        this.state.filterText = this.props.text;
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleFilterChange = async (e) => {
        e.preventDefault()
        await this.setState({filterText : e.target.value})
    }

    handleClick = async (e) => {
        e.preventDefault()
        let text = this.state.filterText
        this.props.onFilterTextInput(text)
        await this.setState({filter_text: ''})
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
                <button onClick={this.handleClick} className={"submit-search"}>Search</button>
                <button id={"clear-search"} onClick={this.props.handleClearSearch}>Clear</button>
            </div>
        );
    }
}

export default SearchBar;
