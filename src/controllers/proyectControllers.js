import Proyects from '../models/proyects';
import Clients from '../models/clients';
import User from '../models/user';
module.exports ={
    viewProyects: async (req, res, next) => {
        try {
            const proyects = await Proyects.find();
            const proyectsData = await Clients.populate(proyects, { path: "client" })
            const data = await User.populate(proyects, { path: "professionals" })
            res.status(200).json({
                data
            })
        } catch (error) {
            res.status(500).json({
                mgs: 'Estamos en mantenimiento'
            })
        }
    },
    createProyect: async (req, res, next) =>{
        const body = req.body;
        try {
            const proyect = new Proyects(body)
            await proyect.save();
            res.status(200).json({
                msg: 'Operación existosa',
                proyect
            })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    elimProyect: async (req, res, next) =>{
        const data = req.params;
        try {
            const proyect = await Proyects.findOne({_id: data.id});
            if(!proyect){
                res.status(404).json({
                    msg: 'No se encontro el proyecto'
                })
            }else{
                await Proyects.remove({_id: data.id});
                res.status(200).json({
                    msg: 'Proyecto Eliminado con exito'
                })
            }
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    updateProyect: async (req, res, next) =>{
        const data = req.params;
        const body = req.body;
        try {
            const proyect = await Proyects.findOne({_id: data.id});
            if(!proyect){
                res.status(404).json({
                    msg: 'No se encontro el proyecto'
                })
            }else{
                const proyectUp = await Proyects.findByIdAndUpdate({_id: data.id}, body)
                res.status(200).json({
                    msg: 'Proyecto Actializado con exito',
                    proyectUp
                })
            }
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    }
}