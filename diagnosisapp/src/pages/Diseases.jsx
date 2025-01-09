import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Diseases(){
    const [userDetails, setUserDetails] = useState({});
    const [diseases, setDiseases] = useState([]);

    useEffect(()=>{
        const userData = localStorage.getItem('userDetails');
        if(userData){
            setUserDetails(JSON.parse(userData));
        }
    }, []);

    useEffect(()=>{
        const getDiseases = async () => {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8081/diseases', {headers: {Authorization: `Bearer ${token}`}});
                if(Array.isArray(response.data)){
                    setDiseases(response.data);
                } else {
                    console.error('Unexpected response: ', response.data);
                }
            }catch(err){
                console.log(err);
            }
        }
        if(userDetails.account_id && userDetails){
            getDiseases();
            console.log(diseases);
        }
    }, [userDetails]);

    if(!userDetails){
        return <div>Loading...</div>
    }
    return(
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <h1>Diseases</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Disease</th>
                            <th>Treatment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diseases.map((disease, index) => (
                            <tr key={index}>
                                <td>{disease.description}</td>
                                <td>{disease.treatment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Diseases;