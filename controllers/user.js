require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Station } = require('../modules/station');
const { User } = require('../modules/user');
const { SecurePassword } = require('../utils/SecurePassword');

exports.SignUp = async (req,res) => {
    try{
        const  { email,phone,fullName,vehicleType,password } = req.body;
        // firstName,lastName,middleName
        const result = new User();

        const salt = result.salt;
        result.e_password = SecurePassword(password , salt);
        result.email = email;
        result.phone = phone;
        result.fullName = fullName;
        // result.firstName = firstName;
        // result.lastName = lastName;
        // result.middleName = middleName;
        result.vehicleType = vehicleType;

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

        const e_password = result.e_password;
        const isEmailVerified = result.isEmailVerified;
        const isNumberVerified = result.isNumberVerified;

        if( isEmailVerified === true || isNumberVerified === true ){
            var salt = result.salt;
            if(e_password === SecurePassword(password , salt)){
                const fullName = result.fullName;
                const phone = result.phone;

                const payload = { email: email, fullName: fullName, phone: phone };

                const access_token = jwt.sign( payload , process.env.AUTH , { expiresIn: '8h' });

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

exports.AddStation = async (req,res) => {
    try{
        const email = req.email;
        const fullName = req.fullName;
        const phone = req.phone;
        const { address ,latitude ,longitude ,connector ,kwpower ,isFast ,photo ,isParkingAvailable ,isParkingFree ,parkingCharge ,isAvailableAllTime ,startTime ,endTime } = req.body;

        const result = new Station();

        result.email = email;
        result.fullName = fullName;
        result.phone = phone;
        result.address = address;
        result.latitude = latitude;
        result.longitude = longitude;
        result.connector = connector;
        result.kwpower = kwpower;
        result.isFast = isFast;
        result.photo = photo;
        result.isParkingAvailable = isParkingAvailable;
        result.isParkingFree = isParkingFree;
        result.parkingCharge = parkingCharge;
        result.isAvailableAllTime = isAvailableAllTime;
        result.startTime = startTime;
        result.endTime = endTime;

        const rev = await result.save();

        if(!rev){
            res.status(402).json({
                "isSuccess": false,
                "status": 402,
                "message": "Failed to store Station",
                "data": {}
            })
        }


        res.status(200).json({
            "isSuccess": true,
            "status": 200,
            "message": "Station Registered",
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

exports.GetStations = async (req,res) => {
    try{
        const rev = await Station.find({});
        // console.log(rev)

        res.status(200).json({
            "isSuccess": true,
            "status": 200,
            "message": "Got all registered Charging Stations",
            "data": rev
        })
    }
    catch(err){
        res.status(500).json({
            "isSuccess": false,
            "status": 500,
            "message": "Internal Server Error",
            "data": {}
        })
    }
}

exports.ForgotPassword = async (req,res) => {
    try{
        const { email , phone } = req.body;
        if(!phone){
            var result = await User.findOne({ email: email}).lean();
        }
        else{
            var result = await User.findOne({ phone: phone}).lean();
        }

        if(!result){
            res.status(402).json({
                "isSuccess": false,
                "status": 402,
                "message": "No such User exist",
                "data": {}
            })
        }
        const phone1 = result.phone;
        const fullName = result.fullName;

        const payload = { email: email, phone: phone1 };
        const token = jwt.sign( payload ,process.env.FORGOTAUTH );

        // sendEmail( email ,fullName, token);

        res.status(200).json({
            "isSuccess": true,
            "status": 200,
            "message": "Email sent successfully",
            "data": {
                access_token: token,
                email :email
            }
        })
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            "isSuccess": false,
            "status": 500,
            "message": "Internal Server Error",
            "data": {}
        })
    }
}

exports.ResetPassword = async (req,res) => {
    try{
        const email = req.email;
        const { password } = req.body;

        const result = await User.findOne({email: email});
        const salt = result.salt;
        const e_password = SecurePassword(password , salt);
        result.e_password = e_password;

        const rev = await result.save();

        if(!rev){
            res.status(402).json({
                "isSuccess": false,
                "status": 402,
                "message": "Failed to change password",
                "data": {}
            })
        }

        res.status(200).json({
                "isSuccess": false,
                "status": 200,
                "message": "Password changed successfully",
                "data": rev
        })
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            "isSuccess": false,
            "status": 500,
            "message": "Internal Server Error",
            "data": {}
        })
    }
}

