import Button from "./Button"

function Header(){
    const patientButtonText = "Log in as patient";
    const doctorButtonText = "Log in as doctor";
    return (
        <>
        <header>
            <h1>Diagnosis App</h1>
        </header>
        <div>
            <Button class="PatientButton">{patientButtonText}</Button>
        </div>
        <div>
            <Button class="DoctorButton">{doctorButtonText}</Button>
        </div></>
    )
}

export default Header