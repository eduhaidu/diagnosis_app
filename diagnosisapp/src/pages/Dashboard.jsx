import React, { useEffect, useState } from "react";
function Dashboard(){
    const [user, setUser] = useState({});

    useEffect(()=>{
        const userData = localStorage.getItem('user');
        if(userData){
            setUser(JSON.parse(userData));
        }
    }, []);
    if(!user){
        return <div>Loading...</div>
    }
    return (
        <div>
            <h1>Welcome {user.email}</h1>
            <h2>Your Account Type is {user.accountType}</h2>
        </div>
    )
}
export default Dashboard