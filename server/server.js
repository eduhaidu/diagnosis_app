const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'diagnosis'
});

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
    const values = [
        req.body.email,
        req.body.password
    ]
    db.query(sql, [req.body.email, req.body.password], (err, result)=>{
        if(err){
            return res.json(err);
        }
        if(result.length > 0){
            const user = result[0];
            const token = jwt.sign({id: user.id, email: user.email, accountType: user.accountType}, 'secret', {expiresIn: '1h'});
            delete user.password;
            return res.json({message: "Login successful", token, user});
        }
        else{
            return res.json("Invalid email or password");
        }
    })
});

app.listen(8081, ()=>{
    console.log('Server is running on port 8081');
})