import jwt from "jsonwebtoken";
const auth =async(req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth =token.length <500
        
        if (token &&isCustomAuth) {
            const decoded = await jwt.verify(token,process.env.JWT_SECRET);
            req.userId=decoded?.id
    
            }      
        req.user = decoded;
        next();
    }catch(err){
        res.status(401).json({message:err.message});
    }
}