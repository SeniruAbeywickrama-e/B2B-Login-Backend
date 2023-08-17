const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user');
const {logEvent} = require('../logger');


/* Function for login */
const login = async (req, res) => {
    try {
        const user_email = req.body.values.email[0];
        const user_password = req.body.values.password[0];

        console.log(user_email)

        if(user_password && user_email){
            const options = {
                where: {
                    email: user_email,
                    password: user_password
                }
            };

            const user = await UserModel.findOne(options);

            if (!user) {
                logEvent("No user exists");
                return res.status(500).json({message: 'No user exists', status: 500})
            } else {
                // const password_valid = await bcrypt.compare(req.body.values.password[0],user.password);
                const company_token = jwt.sign({user_email}, process.env.SECRET_KEY, {expiresIn: "1d"});
                res.cookie("company-token", company_token);
                logEvent("Successfully LogIn to the Company registration");
                return res.status(200).json({message: 'Success', status: 200})
            }
        }else {
            return res.status(500).json({message: 'User Name or Password is Empty', status: 500})
        }

    } catch (error) {
        console.error('Error creating table:', error);
        return res.status(404).json({message: 'NotFound', status: 404})
    }
}

module.exports = {
    login
}
