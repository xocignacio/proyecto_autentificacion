import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars'; 
import __dirname from './utils.js';                                ////  __dirname (normbro la ruta absoluta para las vistas en handlebars)
import viewsRouter from './routes/views.router.js';                //// rutas de las vistas
import sessionsRouter from './routes/session.router.js';           //// rutas de register con datos que saco de models users
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './src/config/passport.config.js';
import minimist from 'minimist';
import { MongoDBService } from './src/MongoDBService/index.js';
import { config } from './src/config/index.js';

const app = express();

const server = app.listen(config.server.PORT, () => {
    console.log(`- Server running on port  => ${server.address().port} ✔ `);
  });
  server.on("error", (error) => {
    console.error(`Server error: ${error}`);
  });

MongoDBService.init();
  
  
/////////// Lineas para utilizar handlebars ///////////////////
app.engine('handlebars',handlebars.engine());    
app.set('views',__dirname+'/views');                 ////dirname es la ruta absoluta (utils)
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.static(__dirname+'/public'))

app.use(session({                      //// middleware de session que se guarde en mongo
  secret:"UnaPalabraSuperDificil",  
  store:MongoStore.create({
        mongoUrl:process.env.MONGO_URL,
        mongoOptions:{useNewUrlParser:true,useUnifiedTopology:true},
        ttl:3600
    }),    
    resave:false,
    saveUninitialized:false
}))



initializePassport();
app.use(passport.initialize());
app.use(passport.session());

///// IMPORTANTISIMO consultas que ven los clientes ////////
app.use('/',viewsRouter);                       ///// En la ruta raiz, el cliente es el que ve las vistas de las rutas
app.use('/api/sessions',sessionsRouter);        


const args = minimist(process.argv.slice(2),{alias:{m:"MODE",p:"PORT",d:"DEBUG"},default:{m:"prod",p:8080,d:false}});
const {MODE,PORT,DEBUG} = args;
let ObjetoProcess = {
    mode : MODE,
    port : PORT,
    debug: DEBUG,
    others: args._
}
console.log(ObjetoProcess );

