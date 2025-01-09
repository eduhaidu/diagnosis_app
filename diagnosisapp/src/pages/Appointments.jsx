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
    }, []);
    useEffect(()=>{
        const getAppointments = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8081/appointments', {headers: {Authorization: `Bearer ${token}`}});
                if(Array.isArray(response.data)){
                    setAppointments(response.data);
                } else {
                    console.error('Unexpected response: ', response.data);
                }
            }catch(err){
                console.log(err);
            }
        }
        if(userDetails.account_id && userDetails){
            getAppointments();
        }
    }, [userDetails]);

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
                        <th>Hospital</th>
                        <th>Doctor</th>
                        <th>Patient</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => {
                        return (
                            <tr key={index}>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.hospital_id}</td>
                                <td>{appointment.doctor_id}</td>
                                <td>{appointment.patient_id}</td>
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