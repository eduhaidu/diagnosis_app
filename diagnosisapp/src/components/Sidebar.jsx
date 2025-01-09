import React from 'react';
import "../styles/Sidebar.css";
import { Sidebar_Data } from './Sidebar_Data';

function Sidebar() {
    return (
        <div className="sidebar">
       <ul className="sidebar_list">{Sidebar_Data.map((val,key)=>{
            return (
                <li key={key} className="row" id={window.location.pathname==val.link?"active":""} onClick={()=>{window.location.pathname=val.link}}>
                    <div id="icon">{val.icon}</div>{""}
                    <div id="title">{val.title}</div>
                </li>
            )
        })}</ul>
    </div>
    )
}

export default Sidebar;