import mongoose from "mongoose";
import { config } from "../config/index.js"

const init = async () =>{
    try {
       if (config.server.SELECTED_DB !== config.persistences.mongo) return;
       await mongoose.connect(config.MONGO_DB.URL, {
        dbName:config.MONGO_DB.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
       });
       console.log ("- Se pudo establecer la conexion con mongo atlas ✔" );
    } catch (error) {
        console.error(error);
    }
};

const MongoDBService = {
    init,
};

export {MongoDBService}; // Objeto con funcion de conexion a mongo(MongoDBService.init) esto lo utilizo en el src/index.js cuando lo ejecuto 