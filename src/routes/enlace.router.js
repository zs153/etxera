import express from "express";
import { enlace, enlaces, crear, modificiar, borrar } from "../controllers/enlace.controller";

const apiEnlaceRouter = express.Router();

// usuarios
apiEnlaceRouter.post("/enlace", enlace);
apiEnlaceRouter.post("/enlaces", enlaces);
apiEnlaceRouter.post("/enlaces/insert", crear);
apiEnlaceRouter.post("/enlaces/update", modificiar);
apiEnlaceRouter.post("/enlaces/delete", borrar);

export default apiEnlaceRouter;