import React, { useState } from 'react'
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";

function Header() {

    const [homeActive, setHomeActive] = useState(false);
    const [usersActive, setUsersActive] = useState(false);

    const handleHomeLink = () => {
        setHomeActive(true);
        setUsersActive(false);

    };

    const handleUsersLink = () => {
        setUsersActive(true);
        setHomeActive(false);
    };
    return (
        <Navbar bg="dark" variant="dark">
            <FaReact style={{ color: '#2089DA', fontSize: '60px' }} />
            <Nav className="mr-auto m-3">
                <Link style={{textDecoration:"none",color:"white",fontSize:"20px"}}  className={`navlink ${homeActive ? "text-warning" : ""}`} onClick={handleHomeLink} to="/" >
                    Home
        </Link>
        &nbsp;&nbsp;&nbsp;
                <Link style={{textDecoration:"none",color:"white",fontSize:"20px"}} className={`navlink ${usersActive ? "text-warning" : ""}`} onClick={handleUsersLink} to="/users-list">
                    Users
        </Link>
            </Nav>

            <Link className="btn btn-outline-info" to="/add-user">Add New User</Link>
        </Navbar>
    )
}

export default Header