function validateLogin(values){
    let error = {};
    const email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(values.email===""){
        error.email = "Email is required";
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Invalid email address";
    }
    else{
        error.email = "";
    }

    if(values.password===""){
        error.password = "Password is required";
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Password must contain at least 8 characters and at least one number";
    }
    else{
        error.password = "";
    }
    return error;
}

export default validateLogin;