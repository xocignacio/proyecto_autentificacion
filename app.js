import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars'; 
import __dirname from './utils.js';                                ////  __dirname (normbro la ruta absoluta para las vistas en handlebars)
import viewsRouter from './routes/views.router.js';                //// rutas de las vistas
import sessionsRouter from './routes/session.router.js';           //// rutas de register con datos que saco de models users
import MongoStore from 'connect-mongo';
import session from 'express-session';

const app = express();
const server = app.listen(8080,()=>console.log("Server funcionando en el puerto 8080"));
const connection = mongoose.connect('mongodb+srv://xocignaciodb:mongoatlasdb@cluster0.qe9tcs1.mongodb.net/?retryWrites=true&w=majority');

/////////// Lineas para utilizar handlebars ////////////////////
app.engine('handlebars',handlebars.engine());    
app.set('views',__dirname+'/views');                 ////dirname es la ruta absoluta (utils)
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.static(__dirname+'/public'))

app.use(session({                      //// middleware de session que se guarde en mongo
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://xocignaciodb:mongoatlasdb@cluster0.qe9tcs1.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        ttl:100
    }),
    secret:"UnaPalabraSuperDificil",
    resave:false,
    saveUninitialized:false
}))

///// IMPORTANTISIMO consultas que ven los clientes ////////
app.use('/',viewsRouter);                       ///// En la ruta raiz, el cliente es el que ve las vistas de las rutas
app.use('/api/sessions',sessionsRouter)         ////