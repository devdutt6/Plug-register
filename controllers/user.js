require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../modules/user');
const { SecurePassword } = require('../utils/SecurePassword');

exports.SignUp = async (req,res) => {
    try{
        const  { email,phone,name,password } = req.body;
        const result = new User();

        const salt = result.salt;
        result.e_password = SecurePassword(password , salt);
        result.email = email;
        result.phone = phone;
        result.name = name;

        let rev = await result.save();

        if(!rev){
            res.status(402).json({
                "isSuccess": false,
                "status": 402,
                "message": "The data was not saved try Again",
                "data": {}
            })
        }

        // sendVerify(email , name);

        res.status(200).json({
            "isSuccess": true,
            "status": 200,
            "message": "User SignedUp successfully",
            "data": rev
        })
    }
    catch(err){
        console.log(err , err.message , err.stack);
        res.status(500).json({
            "isSuccess": false,
            "status": 500,
            "message": "Internal Server Error",
            "data": {}
        })
    }
}

exports.SignIn = async (req,res) => {
    try{
        const  { email,phone,password } = req.body;

        if(!email){
            var result = await User.findOne({ phone: phone });
        }
        else{
            var result = await User.findOne({ email: email });
        }

        if(!result){
            res.status(402).json({
                "isSuccess": false,
                "status": 402,
                "message": "No such User exist",
                "data": {}
            })
        }

        var e_password = result.e_password;
        var isEmailVerified = result.isEmailVerified;
        var isNumberVerified = result.isNumberVerified;

        if( isEmailVerified === true || isNumberVerified === true ){
            var salt = result.salt;
            if(e_password === SecurePassword(password , salt)){
                var name = result.name;
                var payload = { email: email, name: name };
                var access_token = jwt.sign( payload , process.env.AUTH , { expiresIn: '8h' });
                res.status(200).json({
                    "isSuccess": true,
                    "status": 200,
                    "message": "User SignedIn successfully",
                    "data": result,
                    "access_token": access_token
                })
            }
            else{
                res.status(202).json({
                    "isSuccess": true,
                    "status": 202,
                    "message": "password does not match"
                })
            }
        }
        else{
            res.status(202).json({
                "isSuccess": true,
                "status": 202,
                "message": "verify Email or phonenumber First",
                "data": rev
            })
        }

    }
    catch(err){
        console.log(err , err.message , err.stack);
        res.status(500).json({
            "isSuccess": false,
            "status": 500,
            "message": "Internal Server Error",
            "data": {}
        })
    }
}