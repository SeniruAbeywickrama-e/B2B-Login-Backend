const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const sequelize = require('./db');
const User = require('./model/user');

const {logEvent} = require('./logger');
const env = require("dotenv").config();

const app = express();
app.use(cors(
    {
        orgin: ["http://localhost:3000"],
        methods: ["POST","GET"],
        credentials: true
    }
))

app.use(express.json())
app.use(cookieParser())

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: "",
//     database: process.env.DB_NAME
// })

// db.connect((err) => {
//     if(err){
//         logEvent(err.message);
//         return;
//     }
//     console.log("Database Connected to B2B.")
//     createUserTable();
//     createUserTable();
// })
/* Create User table */
createUserTable();


async function createUserTable() {
    try {
        // const createUserTableQuery = `
        //       CREATE TABLE IF NOT EXISTS company (
        //         id INT AUTO_INCREMENT PRIMARY KEY,
        //         email VARCHAR(20),
        //         password VARCHAR(30),
        //         name VARCHAR(30),
        //         contact INT
        //       )
        // `;
        // await db.query(createUserTableQuery);

        console.log("Database Connected to B2B.")
        await sequelize.sync({ force: false }); // The { force: true } option will drop the table if it already exists and then recreate it.
        console.log('B2B Company Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

/* User Login */
app.post('/login', async (req, res) => {
    // db.query("SELECT * FROM company WHERE `email` = ? AND `password`= ? " , [req.body.values.email[0],req.body.values.password[0]], (err, data) => {
    //     if(err){
    //         logEvent("Error on login");
    //         return  res.json("Error");
    //     }
    //     if(data.length > 0){
    //         const user_email = data[0].email;
    //         const company_token = jwt.sign({user_email},process.env.SECRET_KEY,{expiresIn: "1d"});
    //         res.cookie("company-token", company_token);
    //         logEvent("Successfully LogIn to the Company registration");
    //         return res.json("Success");
    //     }else {
    //         logEvent("Fail to LogIn");
    //         return  res.json("Fail")
    //     }
    // })
    const options = {
        where: {
            email:  req.body.values.email[0],
            password: req.body.values.password[0]
        }
    };

    const user = await User.findOne(options);
    try {
        if(!user) {
            logEvent("Fail to LogIn");
            return  res.json("Fail")
        }else {
            // const password_valid = await bcrypt.compare(req.body.values.password[0],user.password);
            const user_email = req.body.values.email[0];
            const company_token = jwt.sign({user_email},process.env.SECRET_KEY,{expiresIn: "1d"});
            res.cookie("company-token", company_token);
            logEvent("Successfully LogIn to the Company registration");
            return  res.json(200)
        }
    }catch (error) {
        console.error('Error creating table:', error);
    }

})


app.listen(8080, () => {
    logEvent("Listening the port 8080...");
    console.log("Listening the port 8080...");
})
