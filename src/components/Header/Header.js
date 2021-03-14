import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from "../../images/logo.jpg";
import './Header.css'

const Header = () => {

    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className = "header">
            {/* <h1>This Is My Header Section</h1> */}
            <img  src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage"> Manage Inventory</Link>
                <button onClick={() => setLoggedInUser({})}>Sign Out</button>
            </nav>
            <div className="inputField">
                <input className="inp" placeholder="Search Your Items Here" type="text"/>
            </div>
        </div>
    );
};

export default Header;