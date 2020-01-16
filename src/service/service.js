//funciones globales
import jwt from 'jsonwebtoken';
import secret from '../service/config';
module.exports = {
    createToken: (user) => {
        const token = jwt.sign({id: user._id}, secret.secret, {
            expiresIn: 60 * 60 * 24
        })
        return token;
    },
    validationFields: (user) => {
        const UserData = [];
        UserData.push(user.name.replace(/ /g, ""));
        UserData.push(user.email.replace(/ /g, ""));
        UserData.push(user.password.replace(/ /g, ""));
        UserData.push(user.role.replace(/ /g, ""));
        if(UserData[0] === '' || UserData[1] === '' || UserData[2] === '' || UserData[3] === ''){
            return false
        }else{
            return UserData;
        }
    }
}