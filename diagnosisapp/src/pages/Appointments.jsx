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
            console.log(appointments);
        }
    }, [userDetails]);

    if(!userDetails){
        return <div>Loading...</div>
    }
    const first_name = userDetails.accountType === 1 ? "Doctor First Name" : "Patient First Name";
    const last_name = userDetails.accountType === 1 ? "Doctor Last Name" : "Patient Last Name";
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
                        <th>{first_name}</th>
                        <th>{last_name}</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => {
                        return (
                            <tr key={index}>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.hospital_name}</td>
                                <td>{appointment.patient_first_name}</td>
                                <td>{appointment.patient_last_name}</td>
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