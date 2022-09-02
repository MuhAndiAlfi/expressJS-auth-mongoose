const jwt = require('jsonwebtoken')

verifyToken = (req, res, next) => {
    let token = req.session.token
    // let role = req.session.role
    // console.log(role)

    if(!token){
        return res.status(403).json({message: "no token provided!"})
    }

    jwt.verify(token, "SECRET",  (error, decoded)=> {

        if(error){
            return res.status(401).json({message: Unauthorized})
        }

        req.userId = decoded.id
        console.log(decoded)
        next()
    })
}



module.exports = verifyToken