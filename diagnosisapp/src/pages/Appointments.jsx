import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Appointments(){
    const [userDetails, setUserDetails] = useState({});
    const [appointments, setAppointments] = useState([]);

    useEffect(()=>{
        const userData = localStorage.getItem('userDetails');
        if(userData){
            setUserDetails(JSON.parse(userData));
        }
        const getAppointments = async () => {
            try{
                const response = await axios.get('http://localhost:8081/appointments');
                setAppointments(response.data);
            }catch(err){
                console.log(err);
            }
        }
        getAppointments();
    }, []);

    if(!userDetails){
        return <div>Loading...</div>
    }
    
    return(
        <>
        <div>
            <Sidebar />
            <h1>Appointments</h1>
            <h2>Here you can view your upcoming appointments</h2>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Doctor</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => {
                        return (
                            <tr key={index}>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.doctor}</td>
                                <td>{appointment.location}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default Appointments;