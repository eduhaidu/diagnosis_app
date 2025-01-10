import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
function Dashboard(){
    const [userDetails, setUserDetails] = useState({});

    useEffect(()=>{
        const userData = localStorage.getItem('userDetails');
        if(userData){
            setUserDetails(JSON.parse(userData));
        }
    }, []);
    if(!userDetails){
        return <div>Loading...</div>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:8081/updateUser', userDetails);
        }catch(err){
            console.log(err);
        }
    }

    const handleInput = (e) =>{
        setUserDetails(prev => ({...prev, [e.target.name]: [e.target.value]}));
    }

    const welcomeUser = userDetails.first_name ? userDetails.first_name : "User";
    return (
        <>
        <div>
            <Sidebar />
            <h1>Welcome, {welcomeUser}!</h1>
            <h2>Here you can view/edit your personal information</h2>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input type="text" name='first_name' value={userDetails.first_name} onChange={handleInput}/>
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name='last_name' value={userDetails.last_name} onChange={handleInput}/>
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" name='address' value={userDetails.address} onChange={handleInput}/>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input type="text" name='phone_number' value={userDetails.phonenumber} onChange={handleInput}/>
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
        </>
    )
}
export default Dashboard