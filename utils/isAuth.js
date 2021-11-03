const jwt = require('jsonwebtoken');

exports.isAuth = async (req,res,next) => {
    try{
        var token = req.headers.authorization.split(' ');
        try{
            var decoded = await jwt.verify(token[1] , process.env.AUTH);
        }
        catch(err){
            return res.status(402).json({
                "isSuccess": false,
                "status": 402,
                "message":"error in Authentication Signin Again",
                "data": {}
            });
        }
        req.email = decoded.email;
        req.fullName = decoded.fullName;
        req.phone = decoded.phone;
        next();
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

exports.isForgotAuth = async (req,res,next) => {
    try{
        var token = req.headers.authorization.split(' ');
        try{
            var decoded = await jwt.verify(token[1] , process.env.FORGOTAUTH);
        }
        catch(err){
            return res.status(402).json({
                "isSuccess": false,
                "status": 402,
                "message":"error in Authentication Try Again",
                "data": {}
            });
        }
        req.email = decoded.email;
        req.phone = decoded.phone;
        next();
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