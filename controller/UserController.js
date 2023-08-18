const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user');
const {logEvent} = require('../logger');

/* Function for login */
const login = async (req, res) => {
    try {
        const user_email = req.body.values.email;
        const user_password = req.body.values.password;

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
                return res.status(200).json({message: 'No user exists', status: 404})
            } else {
                // const password_valid = await bcrypt.compare(req.body.values.password[0],user.password);
                const my_token = jwt.sign({user_email}, "our-secret-key-company",{expiresIn: "2h"});
                res.cookie("tokenComp",my_token);
                logEvent("Successfully LogIn to the Company registration");
                return res.status(200).json({message: "Success", status: 200})
            }
        }else {
            return res.status(500).json({message: 'User Name or Password is Empty', status: 500})
        }

    } catch (error) {
        console.error('Error creating table:', error);
        return res.status(500).json({message: 'NotFound', status: 500})
    }
}

module.exports = {
    login
}
