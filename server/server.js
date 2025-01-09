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
                const token = jwt.sign({id: userDetails.id, first_name: userDetails.first_name, last_name: userDetails.last_name, address: userDetails.address, phonenumber: userDetails.phonenumber, account_id: userDetails.account_id}, 'secret', {expiresIn: '1h'});
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

app.listen(8081, ()=>{
    console.log('Server is running on port 8081');
})