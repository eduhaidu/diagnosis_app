import Header from "../components/Header";
import Button from "../components/Button";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Sidebar from "../components/Sidebar";

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const tryAI = "Try the Diagnosis AI! The quality of the results may not be as expected without an account.";
    const navigateTo=useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            setIsLoggedIn(true);
        }
    })
    const handleProfileClick = () => {
        setIsDropdownVisible(!isDropdownVisible);
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userDetails');
        setIsLoggedIn(false);
        navigateTo('/login');
    }
    if(isLoggedIn){
        return (
            <div className="home">
                <Sidebar />
                <div className="account_buttons topcorner">
                    <AccountCircleIcon onClick={handleProfileClick} />
                    {isDropdownVisible && <div className="dropdown">
                        <Button className="button" onClick={() => {window.location.href = "/dashboard"}}>Dashboard</Button>
                        <Button className="button" onClick={handleLogout}>Logout</Button>
                    </div>}
                </div>
                <style>
                    {`
                    .topcorner {
                        position: absolute;
                        top: 0;
                        right: 0;
                    }
                    .dropdown {
                        position: absolute;
                        top: 50px;
                        right: 0;
                        background-color: #242424;
                        border: 1px solid #484848;
                    }
                    .dropdown button {
                        display: block;
                        width: 100%;
                        padding: 10px;
                        border: none;
                        background: none;
                        text-align: left;
                    }
                    .dropdown button:hover {
                        cursor.pointer;
                        background-color: #141414;
                    }
                    `}
                </style>
                <Header />
                <div className="home_content">
                    <input type="text" placeholder="Type here to chat" />
                </div>
            </div>
        );
    }
    return (
        <div className="home">
            <div className="account_buttons topcorner">
                <Button className="button" onClick={() => {window.location.href = "/login"}}>Log in</Button> 
            </div>
            <style type="text/css">
                {`
                .topcorner {
                    position: absolute;
                    top: 0;
                    right: 0;
                }
                `}
            </style>
            <Header />
            <div className="home_content">
                <p>{tryAI}</p>
                <input type="text" placeholder="Type here to chat" />
            </div>
        </div>    
    );
}

export default Home;