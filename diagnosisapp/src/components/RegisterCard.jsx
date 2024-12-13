function RegisterCard(){
    return (
        <div className="register_card">
            <h1>Register</h1>
            <form>
                <div className="emailHeader">E-Mail Address</div>
                <div className="emailInput">
                <input type="text" placeholder="E-Mail" />
                </div>
                <div className="passwordHeader">Password</div>
                <div className="passwordInput">
                <input type="password" placeholder="Password" />
                </div>
                <div className="passwordHeader">Confirm Password</div>
                <div className="passwordInput">
                <input type="password" placeholder="Confirm Password" />
                </div>
                <button type="submit">Register</button>
            </form>
            </div>
    );
}

export default RegisterCard;