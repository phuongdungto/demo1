import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './sidebar.scss';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Sidebar() {
    const user = useSelector(state => state.user.user);
    return (
        <>
            <div className="sidebar">
                <div className="sidebarRow">
                    <img className="user__avatar"
                        src={user && 'http://localhost:3004/static/avatar/image/' + user.image}
                        alt="" />
                    <h4>{user && user.fullname}</h4>
                </div>

                <div className="sidebarRow">
                    <span className="material-icons"> emoji_flags </span>
                    <h4>Pages</h4>
                </div>

                <div className="sidebarRow">
                    <span className="material-icons"> people </span>
                    <h4>People</h4>
                </div>

                <div className="sidebarRow">
                    <span className="material-icons"> chat </span>
                    <h4>Messenger</h4>
                </div>

                <div className="sidebarRow">
                    <span className="material-icons"> storefront </span>
                    <h4>Marketplace</h4>
                </div>

                <div className="sidebarRow">
                    <span className="material-icons"> video_library </span>
                    <h4>Videos</h4>
                </div>

                <div className="sidebarRow">
                    <span className="material-icons"> expand_more </span>
                    <h4>More</h4>
                </div>
            </div>
        </>
    )
}

export default Sidebar;