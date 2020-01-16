import User from '../models/user';
import Clients from '../models/clients';
import bcrypt from 'bcryptjs';

module.exports = {
    login: async (req, res , next) => {//controlador para iniciar sesion
        const data = req.body;
        try {
            const user = await User.findOne({email: data.email});
            if(!user){
                res.status(404).json({
                    auth: false,
                    msg: 'Usuario no encontrado, verifique su email'
                })
            }
            if(!data.password){
                res.status(404).json({
                    auth: false,
                    msg: 'Porfavor ingrese una contraseña'
                })
            }
            const validate = await bcrypt.compare(data.password, user.password);
            if(validate === false){
                res.status(401).json({
                    auth: false,
                    msg: 'Su contraseña es invalida, verifique sus datos'
                })
            }
            const userData = await User.findOne({email: data.email}, {password: 0, _id: 0, date: 0});
            res.status(200).json({
                auth: true,
                userData
            })
        } catch (error) {
            console.log(error)
        }
    },
    signin: async (req, res ,next) => {//controlador para registrarse 
        const body = req.body;
        try{
            const user = await new User(body);
            user.password = await user.encryptPassword(user.password);
            await user.save(); 
            res.status(200).json({
                msg: 'Registro exitoso',
            });
        }catch(error){
            res.status(401).json({
                msg: 'Todos los campos son requeridos',
                error
            })
        }
    },
    viewPro: async (req,  res, next) =>{//Controlador para ver profesionales
        const users = await User.find();
        try {
            if(users){
                res.status(200).json({
                    users
                })
            }
        } catch (error) {
            res.status(500).json({
                msg: 'Estamos en mantenimiento'
            })
        }
    },
    elimPro: async (req, res, next) => {//eliminar profesional
        const data = req.params;
        try {
            const user = await User.findOne({email: data.email});
            if(!user){
                return res.status(400).json({
                    msg: 'Este Usuario no se encuentra en la base de datos'
                })
            }
            await User.remove({email: data.email});
            res.status(200).json({
                msg: 'Usuario Eliminado Exitosamente',
            })
        } catch (error) {
            res.status(500).json({
                msg: 'error, estamos en mantenimiento',
                error
            })
        }
    },
    editPro: async (req, res, next) => {//actualizar profesionales
        const data = req.params;
        const body = req.body;
        try {
            const user = await User.findOne({email: data.email});
            if(!user){
                return res.status(400).json({
                    msg: 'Cliente no encontrado'
                })
            }
            const userUpdate = await User.findByIdAndUpdate({_id: user._id}, body);
            res.status(200).json({
                msg: 'Cliente Actualizado Exitosamente'                
            })
        } catch (error) {
            res.status(500).json({
                msg: 'error, estamos en mantenimiento',
                error
            })
        }
    },
    signinC: async (req, res, next) =>{//controlador para registrar clientes
        const dataClients = req.body;
        try {
            const clients = await new Clients(dataClients);
            await clients.save();
            res.status(200).json({
                msg: 'Registro Exitoso',
            })
        } catch (error) {
            res.status(401).json({
                msg: 'Todos los campos son requeridos',
                error
            })

        }
    },
    viewClients: async (req, res, next) => {
        const clients = await Clients.find();
        try {
            if(clients){
                res.status(200).json({
                    clients
                })
            }
        } catch (error) {
            res.status(500).json({
                msg: 'error, estamos en mantenimiento',
                error
            })
        }
    },
    elimClientes: async (req, res, next) => {
        const data = req.params;
        try {
            const client = await Clients.findOne({email: data.email});
            if(!client){
                return res.status(400).json({
                    msg: 'Este cliente no se encuentra en la base de datos'
                })
            }
            await Clients.remove({email: data.email});
            res.status(200).json({
                msg: 'Cliente Eliminado Exitosamente',
            })
        } catch (error) {
            res.status(500).json({
                msg: 'error, estamos en mantenimiento',
                error
            })
        }
    },
    editClientes: async (req, res, next) => {
        const data = req.params;
        const body = req.body;
        try {
            const client = await Clients.findOne({email: data.email});
            if(!client){
                return res.status(400).json({
                    msg: 'Cliente no encontrado'
                })
            }
            const clientUpdate = await Clients.findByIdAndUpdate({_id: client._id}, body);
            res.status(200).json({
                msg: 'Cliente Actualizado Exitosamente'                
            })
        } catch (error) {
            res.status(500).json({
                msg: 'error, estamos en mantenimiento',
                error
            })
        }
    }
}