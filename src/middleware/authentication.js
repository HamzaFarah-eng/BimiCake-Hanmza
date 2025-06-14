import jwt from 'jsonwebtoken';
import { userModel } from '../../DB/models/user.model.js';

export const roles = {
    admin:"admin",
    user:"user",
}

export const auth = (accessRole=[])=>{
    return async (req,res,next)=>{
        const {authorization} = req.headers;
        if(!authorization){
            return res.status(400).json({message:"not authorized"});
        }
        let decode;
        try {
             decode = jwt.verify(authorization,process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({message:"not authorized"});
        }

        const user = await userModel.findById(decode.id).select('username email phone role status birthdate')
        if(!user){
            return res.status(401).json({message:"user not found"});
        }

        if(!accessRole.includes(user.role)){
            return res.status(403).json({message:"not authorized to access this resource"});
        }
        
        req.user = user;
        next();
    }
}