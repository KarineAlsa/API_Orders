import  express  from "express";
import { registerController, listAllController } from "../Dependencies";

const orderRouter = express.Router();

orderRouter.post("/",registerController.run.bind(registerController));
orderRouter.get("/",listAllController.run.bind(listAllController));
orderRouter.put("/:id",listAllController.run.bind(listAllController));

export default orderRouter;