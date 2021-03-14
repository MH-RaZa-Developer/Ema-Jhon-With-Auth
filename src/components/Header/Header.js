import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from "../../images/logo.png";
import './Header.css'

const Header = () => {

    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div className = "header">
            <img  src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage"> Manage Inventory</Link>
                {
                    LoggedInUser.name ? <button style={{fontSize: "20px", float:'left', margin: '10px', background:'blue', color: 'white', border:'none', padding:'5px'}} onClick={() => setLoggedInUser({})}>Sign Out</button> : ""
                }
            </nav>
            <div className="inputField">
                <input className="inp" placeholder="Search Your Items Here" type="text"/>
            </div>
        </div>
    );
};

export default Header;