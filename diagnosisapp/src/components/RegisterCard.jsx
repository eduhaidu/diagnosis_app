import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validateRegister from "../RegisterValidation";
import "../styles/RegisterCard.css";

function RegisterCard(){
    const [values, setValues] = useState({
        email: '',
        password: '',
        accountType: 1
    });
    const [errors, setErrors] = useState({});
    const navigateTo = useNavigate();
    const handleInput = (e) =>{
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validateRegister(values);
        setErrors(err);
        if(errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/register', values)
            .then((response) => {
                navigateTo("/login");
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
    return (
        <div className="register_card">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="accountTypeHeader">Account Type</div>
                <div className="accountTypeSelect">
                    <select onChange={handleInput} name='accountType'>
                        <option value={1}>Patient</option>
                        <option value={2}>Doctor</option>
                        <option value={3}>Admin</option>
                    </select>
                </div>
                <div className="emailHeader">E-Mail Address</div>
                <div className="emailInput">
                <input type="text" placeholder="E-Mail" name='email' onChange = {handleInput} />
                <span>{errors.email}</span>
                </div>
                <div className="passwordHeader">Password</div>
                <div className="passwordInput">
                <input type="password" placeholder="Password" name='password' onChange={handleInput}/>
                <span>{errors.password}</span>
                </div>
                <button type="submit">Register</button>
            </form>
            </div>
    );
}

export default RegisterCard;