    require('dotenv').config();
    const express = require('express');
    const mysql2 = require('mysql2');
    const cors = require('cors');
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');

    const corsOptions = {
        origin: ["http://localhost:5173"],
    };

    const app = express();
    app.use(cors(corsOptions));
    app.use(express.json());

    const db = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'diagnosis'
    })

    const JWT_SECRET = process.env.JWT_SECRET;

    //Register
    app.post('/register', async (req, res) => {
        const { email, password, accountType } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query('INSERT INTO accounts (email, password, accountType) VALUES (?, ?, ?)', [email, hashedPassword, accountType], (err, result) => {
            if(err){
                return res.status(400).send('Error registering user');
            }
            res.status(201).send('User successfully registered');
        });
    });

    //Login
    app.post('/login', async (req, res)=>{
        const { email, password} = req.body;

        db.query('SELECT * FROM accounts WHERE email = ?', [email], async (err, result) => {
            if(err || result.length === 0){
                return res.status(401).send('Invalid email');
            }

            const user = result[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if(!isPasswordValid){
                return res.status(401).send('Invalid password');
            }

            const token = jwt.sign({id: user.id, email: user.email}, JWT_SECRET);
            res.json({token});
        })
    })

    const authenticateToken = (req, res, next) => {
        const token = req.headers['authorization'];

        if(!token){
            return res.status(401).send('Access denied');
        }

        jwt.verify(token, JWT_SECRET, (err, user) => {
            if(err){
                return res.status(403).send('Invalid token');
            }
            req.user = user;
            next();
        })
    }

    app.get('/protected', authenticateToken, (req, res) => {
        res.send('Hello World!');
    })

    app.listen(8081, () => {
        console.log('Server is running on port 8081');
    })
