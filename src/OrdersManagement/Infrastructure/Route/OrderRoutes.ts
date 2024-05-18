import  express  from "express";
import { registerController, listAllController, changeTrackingController } from "../Dependencies";

const orderRouter = express.Router();

orderRouter.post("/",registerController.run.bind(registerController));
orderRouter.get("/",listAllController.run.bind(listAllController));
orderRouter.put("/:id",changeTrackingController.run.bind(changeTrackingController));

export default orderRouter;