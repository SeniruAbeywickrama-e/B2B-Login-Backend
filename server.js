const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./db');

const {logEvent} = require('./logger');
const {validationResult ,check} = require("express-validator");
const env = require("dotenv").config();

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST","GET"],
        credentials: true
    }
))

app.use(express.json())
app.use(cookieParser())

createUserTable();


async function createUserTable() {
    try {
        console.log("Database Connected to B2B.")
        await sequelize.sync({ force: false }); // The { force: true } option will drop the table if it already exists and then recreate it.
        console.log('B2B Company Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
    }
}

//login route
const userRoute = require('./routes/auth');

//
// /* User Login */
// app.post('/api/users/login', (req, res) => {
//     // db.query("SELECT * FROM company WHERE `email` = ? AND `password`= ? " , [req.body.values.email[0],req.body.values.password[0]], (err, data) => {
//     //     if(err){
//     //         logEvent("Error on login");
//     //         return  res.json("Error");
//     //     }
//     //     if(data.length > 0){
//     //         const user_email = data[0].email;
//     //         const company_token = jwt.sign({user_email},process.env.SECRET_KEY,{expiresIn: "1d"});
//     //         res.cookie("company-token", company_token);
//     //         logEvent("Successfully LogIn to the Company registration");
//     //         return res.json("Success");
//     //     }else {
//     //         logEvent("Fail to LogIn");
//     //         return  res.json("Fail")
//     //     }
//     // })
//
//     // const errors = validationResult(req);
//     //
//     // if(!errors.isEmpty()){
//     //     return res.status(400).json({errors: errors.array()});
//     // }
//     try{
//         const options = {
//             where: {
//                 email:  req.body.values.email,
//                 password: req.body.values.password
//             }
//         };
//
//         const user = User.findOne(options);
//         if(!user) {
//             logEvent("No user exists");
//             return  res.status(500).json({message: 'No user exists',status: 500})
//         }else {
//             // const password_valid = await bcrypt.compare(req.body.values.password[0],user.password);
//             const user_email = req.body.values.email;
//             const user_password = req.body.values.password;
//             const company_token = jwt.sign({user_email},"my-secret-key",{expiresIn: "1d"});
//             res.cookie("company-token", company_token)
//             logEvent("Successfully LogIn to the Company registration");
//             return  res.status(200).json({message: 'Success', status: 200})
//         }
//     }catch (error) {
//         console.error('Error creating table:', error);
//         return  res.status(404).json({message: 'NotFound', status: 404})
//     }
// })

app.use('/api/users', userRoute);

app.listen(8080, () => {
    logEvent("Listening the port 8080...");
    console.log("Listening the port 8080...");
})
