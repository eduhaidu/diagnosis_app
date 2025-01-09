const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'diagnosis'
});

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        console.log("No token");
        return res.status(401);
    }
    jwt.verify(token, JWT_SECRET, (err, user)=>{
        if(err){
            return res.status(403).json({error: "Access denied"});
        }
        req.user = user;
        next();
    });
}

app.post('/register', (req, res)=>{
    const sql = "INSERT INTO accounts (email, password, type) VALUES (?)";
    const values = [
        req.body.email,
        req.body.password,
        req.body.accountType
    ]
    db.query(sql, [values], (err, result)=>{
        if(err){
            return res.json(err);
        }
        return res.json(result);
    })
});

app.post('/login', (req, res)=>{
    const sql = "SELECT * FROM accounts WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, result)=>{
        if(err){
            return res.json(err);
        }
        if(result.length > 0){
            const user = result[0];
            console.log(user);
            const accountType = user.type;
            console.log(accountType);

            let detailsSql;
            switch(accountType){
                case 1:
                    detailsSql = "SELECT * FROM patients WHERE account_ID = ?";
                    break;
                case 2:
                    detailsSql = "SELECT * FROM doctors WHERE account_ID = ?";
                    break;
                case 3:
                    detailsSql = "SELECT * FROM admins WHERE account_ID = ?";
                    break;
                default:
                    return res.json("Invalid account type");
            }
            db.query(detailsSql, [user.id], (err, result)=>{
                if(err){
                    return res.json(err);
                }
                const userDetails = result[0];
                const token = jwt.sign({id: userDetails.id, first_name: userDetails.first_name, last_name: userDetails.last_name, address: userDetails.address, phonenumber: userDetails.phonenumber, account_id: userDetails.account_id, accountType: user.type}, JWT_SECRET, {expiresIn: '1h'});
                return res.json({message: "Login successful", token, userDetails})
            });
        }
        else{
            return res.json("Invalid email or password");
        }
    })
});

app.post('/updateUser', (req, res)=>{
    const sql = "UPDATE accounts SET first_name = ?, last_name = ?, address = ?, phonenumber = ? WHERE id = ?";
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.address,
        req.body.phonenumber,
        req.body.accountID
    ]
    db.query(sql, [values], (err, result)=>{
        if(err){
            return res.json(err);
        }
        return res.json(result);
    })
});

app.get('/appointments', verifyToken, (req, res)=>{
    const userID = req.user.id;
    const accountType = req.user.accountType;
    let sql;
    switch(accountType){
        case 1:
            sql = "SELECT a.date, a.time, h.name AS hospital_name, d.first_name AS doctor_first_name, d.last_name AS doctor_last_name FROM appointment a JOIN hospitals h ON a.hospital_ID = h.id JOIN doctors d ON a.doctor_ID = d.id WHERE a.patient_id = ?";
            break;
        case 2:
            sql = "SELECT a.date, a.time, h.name AS hospital_name, p.first_name AS patient_first_name, p.last_name AS patient_last_name FROM appointment a JOIN hospitals h ON a.hospital_ID = h.id JOIN patients p ON a.patient_ID = p.id WHERE a.doctor_id = ?";
            break;
        case 3:
            sql = "SELECT a.date, a.time, h.name AS hospital_name, d.first_name AS doctor_first_name, d.last_name AS doctor_last_name, p.first_name AS patient_first_name, p.last_name AS patient_last_name FROM appointment a JOIN hospitals h ON a.hospital_ID = h.id JOIN doctors d ON a.doctor_ID = d.id JOIN patients p ON a.patient_id = p.id";
            break;
        default:
            return res.json("Invalid account type");
    }
    db.query(sql, [userID], (err, result)=>{
        if(err){
            return res.json(err);
        }
        return res.json(result);
    });
});

app.post('/createAppointment', verifyToken, (req, res)=>{
    const sql = "INSERT INTO appointment (date, time, hospital_ID, doctor_ID, patient_ID) VALUES (?)";
    const values = [
        req.body.date,
        req.body.time,
        req.body.hospital,
        req.body.doctor,
        req.body.patient
    ]
    db.query(sql, [values], (err, result)=>{
        if(err){
            return res.json(err);
        }
        return res.json({message: "Appointment created successfully", newAppointment: req.body});
    })
});


app.listen(8081, ()=>{
    console.log('Server is running on port 8081');
})