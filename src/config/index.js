import dotenv from "dotenv";
dotenv.config();

const DEV_PORT = 8080;

const DBS = {
  mongo: "mongo",
  Filesystem: "filesystem",
  memory: "memory"
}

const config = {
    persistences: DBS,
    FILESYSTEM_DB: {
    products: "productos",
    carts: "carritos",
  },
  MONGO_DB:{
    URL: process.env.MONGO_URL,
    DB_NAME: process.env.MONGO_DB_NAME,
  },
  server: {
    PORT: process.env.PORT || DEV_PORT,
    SELECTED_DB: process.env.SELECTED_DB || DBS.Filesystem,
    routes: {
      base: "/api",
      products: "/api/productos",
      carts: "/api/carrito",
      login: "/api/login",
      register: "/api/register",
    },
  },
};

export { config };
