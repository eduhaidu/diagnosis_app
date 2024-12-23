    const express = require('express');
    const mysql2 = require('mysql2');
    const cors = require('cors');

    const app = express();
    app.use(cors());

    const db = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'diagnosis'
    })

    app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    app.listen(5173, () => {
        console.log('Server is running on port 5173');
    })
