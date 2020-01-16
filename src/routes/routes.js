const routes = require('express-promise-router')();
import { login, signin, signinC, viewClients, elimClientes, editClientes, viewPro, elimPro,  editPro} from '../controllers/authController';
import { viewProyects, createProyect, elimProyect, updateProyect } from '../controllers/proyectControllers';

/*Rutas Para Profesionales*/

//iniciar sesion
routes.post('/login', login);

//registrarse
routes.post('/signin', signin);

//ver profesionales
routes.get('/professionals', viewPro)

//eliminar profesionales
routes.delete('/professionals/:email', elimPro)

//actualizar profesionales
routes.put('/professionals/:email', editPro);

/*Rutas Para Profesionales*/

/*Rutas Para Clientes*/

//Registrar Cliente
routes.post('/signinclients',signinC);

//ver clientes
routes.get('/clients', viewClients);

// eliminar clientes
routes.delete('/clients/:email', elimClientes);

// editar clientes
routes.put('/clients/:email', editClientes);

/*Rutas Para Clientes*/


/*Rutas para Proyectos*/

//ver Proyectos
routes.get('/proyects', viewProyects);

//crear proyectos
routes.post('/proyects', createProyect);

//eliminar Proyectos
routes.delete('/proyects/:id', elimProyect);

//actualizar proyectos
routes.put('/proyects/:id', updateProyect);
/*Rutas para Proyectos*/
module.exports = routes;