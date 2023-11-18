import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, NavLink } from 'react-router-dom'
import './header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { useState, useRef, useEffect } from 'react';
import cookies from 'react-cookies';
// import { userLogout } from '~/store/action/userAction';
// import validator from 'validator';
// import { ChangePasswordUserService } from '~/service/userService';
// import { handelNotify } from '~/core/utils/req';
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../../pages/Home/home.scss';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { Image, NavDropdown } from 'react-bootstrap';
import { userLogout } from '../../../../store/actions/userAction';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const handleOnclickLogin = () => {
        navigate('/login');
    }
    const handleLogout = () => {
        cookies.remove("Token")
        cookies.remove("user")
        dispatch(userLogout());
    }
    const changeHome = () => {
        navigate('/');
    }
    const UserMenu = (
        <div class="profile-image online" >
            <Image
                src={user && 'http://localhost:3004/static/avatar/image/' + user.image}
                alt="UserName profile image"
                roundedCircle
                style={{ width: '40px' }}
            />
        </div>
    )

    return (
        <>
            <nav class="navbar">
                <div style={{ cursor: 'pointer' }} onClick={(e) => changeHome()} class="nav-left"><img class="logo" src={require("../../../../assets/home/images/logo.png")} alt="" />
                    {/* <ul class="navlogo">
                        <li><img src="../../../../assets/home/images/notification.png" /></li>
                        <li><img src="../../../../assets/home/images/inbox.png" /></li>
                        <li><img src="../../../../assets/home/images/video.png" /></li>
                    </ul> */}
                </div>
                <div class="nav-right">
                    <div class="search-box">
                        <img src={require("../../../../assets/home/images/search.png")} alt="" />
                        <input type="text" placeholder="Search" />
                    </div>
                    {user ?
                        (<NavDropdown id="dropdown-basic-button" title={UserMenu}>
                            <Dropdown.Item onClick={(e) => handleLogout()}>Logout</Dropdown.Item>
                        </NavDropdown>)
                        :
                        (<span style={{ cursor: 'pointer' }} onClick={handleOnclickLogin} className='col-7 col-xl-4 '>Login</span>)
                    }

                    {/* <div class="profile-image online" onclick="UserSettingToggle()">
                        <img src={user && 'http://localhost:3004/static/avatar/image/' + user.image} alt="" />
                    </div> */}
                </div>

            </nav>
        </>
    )

}

export default Header;