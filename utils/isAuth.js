const jwt = require('jsonwebtoken');

exports.isAuth = async (req,res,next) => {
    try{
        var token = req.headers.authorization.split(' ');
        const decoded = await jwt.verify(token[1] , process.env.AUTH);

        if(!decoded){
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