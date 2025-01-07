import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../LoginValidation";
import validateLogin from "../LoginValidation";
import "../styles/LoginCard.css";

function LoginCard(){
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigateTo = useNavigate();
    const NoAccountText = "Don't have an account? ";
    const RegisterText = "Register";
    const handleSubmit = (e) => {
        e.preventDefault();
        const err = validateLogin(values);
        setErrors(err);
        if(errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/login', values)
            .then(res=>{
                if(res.data === "Success"){
                    navigateTo("/dashboard");
                }
                else{
                    alert("Invalid email or password");
                }
            })
            .catch(err=>{
                console.log(err);
            });
        }
    }

    const handleInput = (e) =>{
        setValues(prev => ({...prev, [e.target.name]: [e.target.value]}));
    }
    return (
        <>
        <div className="login_card">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="emailHeader">E-Mail Address</div>
                <div className="emailInput">
                <input type="text" placeholder="E-Mail" name='email' onChange={handleInput} />
                <span className="error">{errors.email}</span>
                </div>
                <div className="passwordHeader">Password</div>
                <div className="passwordInput">
                <input type="password" placeholder="Password" name='password' onChange={handleInput}/>
                <span className="error">{errors.password}</span>
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="register">
                <p>{NoAccountText}</p>
                <a href="/register">{RegisterText}</a>
                </div>
        </div>
        </>
    );
}

export default LoginCard;