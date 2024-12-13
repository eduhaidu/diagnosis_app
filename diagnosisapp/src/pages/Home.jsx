import Header from "../components/Header";
import Button from "../components/Button";

function Home() {
    const tryAI = "Try the Diagnosis AI! The quality of the results may not be as expected without an account.";
    return (
        <div className="home">
            <div className="account_buttons topcorner">
                <Button className="button" onClick={() => {window.location.href = "/login"}}>Log in</Button> 
            </div>
            <style type="text/css">
                {`
                .topcorner {
                    position: absolute;
                    top: 0;
                    right: 0;
                }
                `}
            </style>
            <Header />
            <div className="home_content">
                <p>{tryAI}</p>
                <input type="text" placeholder="Type here to chat" />
            </div>
        </div>    
    );
}

export default Home;