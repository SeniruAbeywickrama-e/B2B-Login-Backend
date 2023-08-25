const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user');
const {logEvent} = require('../logger');

/*Sign up for company*/
const signup = async (req, res) => {
    try {
        // Extract user data from request body
        const {userType, email, password, companyName, contactNumber, displayName } = req.body;

        // Perform validation checks
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        if (!isValidPassword(password)) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        if (!isValidCompanyName(companyName)) {
            return res.status(400).json({ message: 'Invalid company name' });
        }
        if (!isValidContactNumber(contactNumber)) {
            return res.status(400).json({ message: 'Invalid contact number' });
        }
        if (!isValidDisplayName(displayName)) {
            return res.status(400).json({ message: 'Invalid display name' });
        }

        try {
            const newUser = {
                userType: userType,
                email: email,
                password: password,
                name: companyName,
                contact: contactNumber,
                displayName: displayName,
            };
            // Add data to company table
            await UserModel.create(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }

        // Log the successful signup
        logEvent(`User successfully signed up: ${email}`);

        // Respond with success message
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

const signOut = async (req, res) => {
    res.clearCookie('tokenComp');
    logEvent(`User successfully signed out`);
    return res.status(200).json({message: "Company Login Success", status: 200})
}


/* Function for login */
const login = async (req, res) => {
    try {

        const {email, password} = req.body;

        if(password && email){
            const options = {
                where: {
                    email: email,
                    password: password
                }
            };

            const user = await UserModel.findOne(options);

            if (user) {
                // const password_valid = await bcrypt.compare(req.body.values.password[0],user.password);
                const my_token = jwt.sign({email}, "our-secret-key-company",{expiresIn: "1d"});
                console.log("Token Created - " + my_token)
                res.cookie("tokenComp",my_token);
                if(user.userType === 1) {
                    logEvent("Successfully logIn as a Company");
                    return res.status(200).json({message: "Company Login Success", status: 200})
                }
                else {
                    logEvent("Successfully logIn as a Investor");
                    return res.status(200).json({message: "Investor Login Success", status: 201})
                }
            } else {
                logEvent("No user exists");
                return res.status(404).json({message: 'No user exists', status: 404})
            }
        }else {
            return res.status(500).json({message: 'User Name or Password is Empty', status: 500})
        }

    } catch (error) {
        console.error('Error creating table:', error);
        return res.status(500).json({message: 'NotFound', status: 500})
    }
}

const verify = (req, res) => {
    try {
        const token = req.headers.token ? req.headers.token : 'empty';
        console.log(req.headers.token)
        if (token === 'empty') {
            return res.status(200).json({message: 'UnAuthorized Request Detected!',status: 401});
        }

        const isValid = new Promise((resolve, reject) => {
            jwt.verify(token, "our-secret-key-company", function (error, decoded) {
                if (error) {
                    reject(false);
                    return res.status(500).json({message: "Unauthorized error !", status: 500})
                }
                if (decoded) {
                    resolve(true);
                    return res.status(200).json({message: "success", status: 200})

                }
            })
        });

        // if(isValid){
        //     return res.status(200).json({message: "success", status: 200})
        // }else {
        //     return res.status(500).json({message: "Unauthorized error !", status: 500})
        // }
    }catch (err){
        return err.status(500).json({message: "Unauthorized error !", status: 500})
    }
};

// Validation functions
function isValidEmail(email) {
    // Use a regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    return password.length >= 6;
}

function isValidCompanyName(companyName) {
    return companyName.length > 3;
}

function isValidContactNumber(contactNumber) {
    // Use a regular expression to validate that the string contains only numbers
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(contactNumber);
}

function isValidDisplayName(displayName) {
    return displayName.length > 3;
}

module.exports = {
    login,verify,signup,signOut
}
