import jwt from 'jsonwebtoken';
import secret from '../service/config'
 module.exports = {
     verifyToken: (req, res, next) =>{
        const token = req.headers['x-access-token'];
        if(!token){
            return res.status(401).json({
                auth: false,
                token: 'No esta autorizado'
            });
        }
        const decoded = jwt.verify(token, secret.secret);
        req.userId = decoded.id;
        next();
     }
 }