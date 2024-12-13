function LoginCard(){
    const NoAccountText = "Don't have an account? ";
    const RegisterText = "Register";
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login form submitted");
    }
    return (
        <>
        <div className="login_card">
            <h1>Login</h1>
            <form>
                <div className="emailHeader">E-Mail Address</div>
                <div className="emailInput">
                <input type="text" placeholder="E-Mail" />
                </div>
                <div className="passwordHeader">Password</div>
                <div className="passwordInput">
                <input type="password" placeholder="Password" />
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