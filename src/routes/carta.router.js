import express from "express";
import { carta, cartas, crear, modificiar, borrar } from "../controllers/carta.controller";

const apiCartaRouter = express.Router();

// usuarios
apiCartaRouter.post("/carta", carta);
apiCartaRouter.post("/cartas", cartas);
apiCartaRouter.post("/cartas/insert", crear);
apiCartaRouter.post("/cartas/update", modificiar);
apiCartaRouter.post("/cartas/delete", borrar);

export default apiCartaRouter;