const jwt = require("jsonwebtoken")
const {UnauthenticatedError} = require("../errors")

const auth = async (req,res,next)=>{ 
    try {
        const authHearder = req.cookies.token
        const payload = jwt.verify(authHearder,process.env.JWT_SECRET)
        req.user = {userId:payload.userId,name:payload.name,role:payload.role}
        next()
    } catch (error) {
        throw new UnauthenticatedError("you don't have acceess to this routes") 
    }
}

const adminAuth = async (req,res,next)=>{
        const authHeader = req.headers.authorization//.split(" ")[1] 

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthenticatedError("you don't have access to this routes")            
        }
        const token = authHeader.split(" ")[1]

        try {
            const payload = jwt.verify(token,process.env.JWT_SECRET)
            req.user = {userId:payload.userId,name:payload.name,role:payload.role}
            if (payload.role !== "admin") {
                throw new UnauthenticatedError("you don't have access to this routes")            
            }
            next()  
        } catch (error) {
            throw new UnauthenticatedError("you don't have access to this routes")           
        }
        //console.log(payload)   
}

module.exports = {auth,adminAuth}