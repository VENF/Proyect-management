import express  from 'express';
import morgan  from 'morgan';
import cors  from 'cors';
import path  from 'path';
import { connectDB } from './db/db';
import Routes from './routes/routes';

const server = express();

//settings
server.set('port', process.env.PORT || 4000);
//data base
connectDB();
//middlewares
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: false}));
//routes
server.use('/api',Routes);
//middleware para vue router  history (estatic files)
const history = require('connect-history-api-fallback');
server.use(history());
server.use(express.static(path.join(__dirname, 'public')));
//server
server.listen(server.get('port'), () => {
    console.log('server listen on port ' + server.get('port'))
})