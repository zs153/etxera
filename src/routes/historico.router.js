import express from "express";
import {
  activar,
  historico,
  historicos,
} from "../controllers/historico.controller";

const apiHistoricoRouter = express.Router();

// Historicos
apiHistoricoRouter.post("/historico", historico);
apiHistoricoRouter.post("/historicos", historicos);
apiHistoricoRouter.post("/historicos/activar", activar);

export default apiHistoricoRouter;
