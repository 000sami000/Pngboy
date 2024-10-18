const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        let decoded;
        if (token) {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.userID=decoded.id;
        }
        next()
    }catch(err){
        console.log("middleware--error :",err)
    }
};

module.exports=auth