import express from "express";
import {
  carga,
  cargas,
  crear,
  modificar,
  borrar,
} from "../controllers/carga.controller";

const apiCargaRouter = express.Router();

// cargas
apiCargaRouter.post("/carga", carga);
apiCargaRouter.post("/cargas", cargas);
apiCargaRouter.post("/cargas/insert", crear);
apiCargaRouter.post("/cargas/update", modificar);
apiCargaRouter.post("/cargas/delete", borrar);

export default apiCargaRouter;
