import React, {Component} from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';

class NavBar extends Component {

    render(){
        return(
            <div>
                <Link className={'home-page-link'} to={'/'}>Home</Link>
                <Link className={'add-new-page-link'} to={'/addNew'}>Add-New</Link>
            </div>
        );
    }
}

export default NavBar;
